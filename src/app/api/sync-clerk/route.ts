// Runs AFTER Clerk user create/sync process.
// Sets referralCode and referredBy after client document is created in Sanity.
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { writeClient } from '@/../sanity/lib/write-client';

// Generates a slug-safe code from the client's name + random suffix
// e.g. "sofia-a3x9"
function generateReferralCode(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)[0] // first name only
    .slice(0, 12);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slug}-${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const email = user.emailAddresses[0]?.emailAddress ?? '';
    const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || email;

    // Check if client already exists
    const existing = await writeClient.fetch(
      `*[_type == "client" && clerkUserId == $userId][0]{ _id, referralCode }`,
      { userId }
    );

    if (existing) {
      // If referralCode is missing (old record), patch it in
      if (!existing.referralCode) {
        await writeClient
          .patch(existing._id)
          .set({ referralCode: generateReferralCode(name) })
          .commit();
      }
      return NextResponse.json({ ok: true, clientId: existing._id });
    }

    // ── NEW CLIENT — read referral code from cookie/header if present ──
    // The /join page sets a cookie: ref=<referralCode>
    const refCode = req.cookies.get('atelier_ref')?.value ?? null;

    let referredByRef: { _type: 'reference'; _ref: string } | undefined;
    if (refCode) {
      const referrer = await writeClient.fetch(
        `*[_type == "client" && referralCode == $code][0]{ _id }`,
        { code: refCode }
      );
      if (referrer?._id) {
        referredByRef = { _type: 'reference', _ref: referrer._id };

        // Increment the referrer's pending referralCredits by 1
        await writeClient
          .patch(referrer._id)
          .inc({ referralCredits: 1 })
          .commit();
      }
    }

    // Create new client document
    const newClient = await writeClient.create({
      _type: 'client',
      clerkUserId: userId,
      name,
      email,
      clientType: 'individual',
      status: 'active',
      referralCode: generateReferralCode(name),
      referralCredits: 0,
      sessionTrackingEnabled: false,
      onboardingCompleted: false,
      ...(referredByRef ? { referredBy: referredByRef } : {}),
    });

    return NextResponse.json({ ok: true, clientId: newClient._id });
  } catch (err) {
    console.error('[sync-clerk error]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}