import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/../sanity/lib/write-client';
import { Resend } from 'resend';
import { createClient } from '@sanity/client';

const resend = new Resend(process.env.RESEND_API_KEY);

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const { eventUri, inviteeUri, clientSanityId, clientName, clientEmail } = await req.json();

    let scheduledAt = new Date().toISOString();
    let eventName = 'Atelier Session';

    if (eventUri) {
      const token = process.env.CALENDLY_API_TOKEN;
      if (token) {
        const res = await fetch(eventUri, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          scheduledAt = data.resource?.start_time || scheduledAt;
          eventName = data.resource?.name || eventName;
        }
      }
    }

    // Client + assignedProfessor'ı çek
    let assignedProfessorId: string | null = null;
    if (clientSanityId) {
      const clientDoc = await writeClient.fetch(
        `*[_type == "client" && _id == $id][0]{ assignedProfessor->{ _id } }`,
        { id: clientSanityId }
      );
      assignedProfessorId = clientDoc?.assignedProfessor?._id || null;
    }

    // Booking yaz
    const bookingDoc: any = {
      _type: 'booking',
      studentName: clientName || 'Unknown',
      studentEmail: clientEmail || '',
      requestedTime: scheduledAt,
      programType: eventName,
      status: 'confirmed',
      notes: `Booked via Calendly. Event: ${eventUri || 'N/A'}`,
    };
    if (clientSanityId) {
      bookingDoc.client = { _type: 'reference', _ref: clientSanityId };
    }
    await writeClient.create(bookingDoc);

    // Lesson otomatik oluştur
    const lessonDoc: any = {
      _type: 'lesson',
      title: eventName,
      date: scheduledAt,
      status: 'upcoming',
      notes: '',
    };
    if (clientSanityId) {
      lessonDoc.client = { _type: 'reference', _ref: clientSanityId };
    }
    if (assignedProfessorId) {
      lessonDoc.professor = { _type: 'reference', _ref: assignedProfessorId };
    }
    await writeClient.create(lessonDoc);

    // Session credit deduction
    if (clientSanityId) {
      const clientData = await sanity.fetch(
        `*[_type == "client" && _id == $id][0]{
          _id, sessionTrackingEnabled, sessionCredits
        }`,
        { id: clientSanityId }
      );

      if (!clientData) {
        console.warn(`[Calendly] Client ${clientSanityId} not found for credit deduction.`);
      } else if (
        clientData.sessionTrackingEnabled &&
        typeof clientData.sessionCredits === 'number' &&
        clientData.sessionCredits > 0
      ) {
        await sanity.patch(clientSanityId).dec({ sessionCredits: 1 }).commit();
        console.log(
          `[Calendly] Deducted 1 credit from ${clientSanityId}. Remaining: ${clientData.sessionCredits - 1}`
        );
      }
    }

    // Admin email
    await resend.emails.send({
      from: 'The Atelier <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'theenglishateliere@gmail.com',
      subject: `New Booking: ${clientName}`,
      html: `
        <div style="font-family:sans-serif;padding:20px;border:4px solid #D4006A;border-radius:12px;background:#FAF7F0">
          <h2 style="color:#D4006A">New Calendly Booking</h2>
          <p><strong>Student:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          <p><strong>Time:</strong> ${new Date(scheduledAt).toLocaleString()}</p>
          <p><strong>Session:</strong> ${eventName}</p>
          <p><strong>Professor:</strong> ${assignedProfessorId ? 'Assigned automatically' : 'Not assigned — set in Studio'}</p>
          <p style="font-size:0.8rem;color:#666;margin-top:16px">Lesson otomatik oluşturuldu. Studio'dan kontrol edebilirsin.</p>
        </div>
      `,
    });

    // Müşteri email
    if (clientEmail) {
      await resend.emails.send({
        from: 'The Atelier <onboarding@resend.dev>',
        to: clientEmail,
        subject: 'Your session is confirmed!',
        html: `
          <div style="font-family:sans-serif;padding:20px;border:4px solid #98FFD9;border-radius:12px;background:#FAF7F0">
            <h2 style="color:#D4006A">Session Confirmed ✓</h2>
            <p>Hi ${clientName}, your session on <strong>${new Date(scheduledAt).toLocaleString()}</strong> is confirmed.</p>
            <p>You can view it in your <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" style="color:#D4006A;font-weight:bold">Client Portal</a>.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}