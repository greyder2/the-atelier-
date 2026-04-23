import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { writeClient } from '@/../sanity/lib/write-client';

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 });

  const existing = await writeClient.fetch(
    `*[_type == "client" && email == $email][0]{ _id, clerkUserId }`,
    { email }
  );

  if (existing && !existing.clerkUserId) {
    await writeClient.patch(existing._id).set({ clerkUserId: userId }).commit();
  } else if (!existing) {
    await writeClient.create({
      _type: 'client',
      clerkUserId: userId,
      email,
      name: user?.fullName || email,
      clientType: 'individual',
      status: 'active',
    });
  }

  return NextResponse.json({ ok: true });
}