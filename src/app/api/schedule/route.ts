import { NextResponse } from 'next/server';
import { writeClient } from '@/../sanity/lib/write-client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateGoogleCalendarUrl(title: string, dateStr: string, details: string) {
  const start = new Date(dateStr);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(details)}&sf=true&output=xml`;
}

export async function POST(req: Request) {
  try {
    const { name, email, time, notes, programType, professorId, professorName, clientSanityId } = await req.json();

    if (!name || !email || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bookingDoc: any = {
      _type: 'booking',
      studentName: name,
      studentEmail: email,
      requestedTime: time,
      programType: programType || 'General Inquiry',
      notes: notes || '',
      status: 'requested',
    };

    if (clientSanityId) {
      bookingDoc.client = { _type: 'reference', _ref: clientSanityId };
    }

    if (professorId) {
      bookingDoc.professor = { _type: 'reference', _ref: professorId };
    }

    const booking = await writeClient.create(bookingDoc);

    const calLink = generateGoogleCalendarUrl(
      `The Atelier Session with ${professorName || 'Professor'}`,
      time,
      `Lesson for ${name}. Program: ${programType}. Notes: ${notes || 'None'}`
    );

    await resend.emails.send({
      from: 'The Atelier Scheduling <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'theenglishateliere@gmail.com',
      subject: `New Booking Request: ${name}`,
      html: `
        <div style="font-family:sans-serif;padding:20px;border:4px solid #D4006A;border-radius:12px;background:#FAF7F0">
          <h2 style="color:#D4006A">New Lesson Request</h2>
          <p><strong>Student:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Professor:</strong> ${professorName || 'Not selected'}</p>
          <p><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
          <p><strong>Program:</strong> ${programType || 'Not specified'}</p>
          <p><strong>Notes:</strong> ${notes || 'None'}</p>
          <a href="${calLink}" style="background:#D4006A;color:white;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px">Add to Google Calendar</a>
        </div>
      `,
    });

    // Confirmation email to student
    await resend.emails.send({
      from: 'The Atelier <onboarding@resend.dev>',
      to: email,
      subject: 'Your session request has been received',
      html: `
        <div style="font-family:sans-serif;padding:20px;border:4px solid #98FFD9;border-radius:12px;background:#FAF7F0">
          <h2 style="color:#D4006A">We received your request!</h2>
          <p>Hi ${name}, your session request for <strong>${new Date(time).toLocaleString()}</strong> with <strong>${professorName || 'your professor'}</strong> is being reviewed.</p>
          <p>You'll receive a confirmation once it's approved.</p>
          <a href="${calLink}" style="background:#111;color:white;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px">Save to Google Calendar</a>
        </div>
      `,
    });

    return NextResponse.json({ success: true, bookingId: booking._id, calendarLink: calLink });
  } catch (error) {
    console.error('Scheduling error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}