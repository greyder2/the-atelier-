import { NextResponse } from 'next/server';
import { writeClient } from '@/../sanity/lib/write-client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { eventUri, inviteeUri, clientSanityId, clientName, clientEmail } = await req.json();

    // Calendly'den event detaylarını çek
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

    // Sanity'e booking yaz
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

    // Admin bildirimi
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
          <p style="font-size:0.8rem;color:#666;margin-top:16px">Sanity Studio'dan detayları görüntüleyebilirsin.</p>
        </div>
      `,
    });

    // Müşteriye onay
    if (clientEmail) {
      await resend.emails.send({
        from: 'The Atelier <onboarding@resend.dev>',
        to: clientEmail,
        subject: 'Your session is confirmed!',
        html: `
          <div style="font-family:sans-serif;padding:20px;border:4px solid #98FFD9;border-radius:12px;background:#FAF7F0">
            <h2 style="color:#D4006A">Session Confirmed ✓</h2>
            <p>Hi ${clientName}, your session on <strong>${new Date(scheduledAt).toLocaleString()}</strong> is confirmed.</p>
            <p>You'll receive a calendar invite shortly. See you at The Atelier!</p>
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