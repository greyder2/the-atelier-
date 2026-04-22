import { NextResponse } from 'next/server';
import { writeClient } from '@/../sanity/lib/write-client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, time, notes, programType } = await req.json();

    if (!name || !email || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create document in Sanity
    const booking = await writeClient.create({
      _type: 'booking',
      studentName: name,
      studentEmail: email,
      requestedTime: time,
      programType: programType || 'General Inquiry',
      notes: notes || '',
      status: 'requested',
    });

    // 2. Send email notification to Admin
    await resend.emails.send({
      from: 'The Atelier Scheduling <onboarding@resend.dev>',
      to: 'mayan.admin@example.com', // Replace with founder's real email
      subject: `New Booking Request: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 4px solid #D4006A; border-radius: 12px;">
          <h2 style="color: #D4006A;">New Lesson Request!</h2>
          <p><strong>Student:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
          <p><strong>Program:</strong> ${programType || 'Not specified'}</p>
          <p><strong>Notes:</strong> ${notes || 'No notes provided'}</p>
          <hr/>
          <p><em>Check your Sanity Studio to manage this booking.</em></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, bookingId: booking._id });
  } catch (error) {
    console.error('Scheduling error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
