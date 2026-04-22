import { NextResponse } from 'next/server';
import { writeClient } from '@/../sanity/lib/write-client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateGoogleCalendarUrl(title: string, dateStr: string, details: string) {
  const start = new Date(dateStr);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
  
  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
  
  const dates = `${formatDate(start)}/${formatDate(end)}`;
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&sf=true&output=xml`;
}

export async function POST(req: Request) {
  try {
    const { name, email, time, notes, programType, professorId, professorName } = await req.json();

    if (!name || !email || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create document in Sanity (Booking)
    const booking = await writeClient.create({
      _type: 'booking',
      studentName: name,
      studentEmail: email,
      requestedTime: time,
      programType: programType || 'General Inquiry',
      notes: notes || '',
      status: 'requested',
    });

    // 2. Generate Calendar Link
    const calLink = generateGoogleCalendarUrl(
      `The Atelier Session with ${professorName || 'Professor'}`,
      time,
      `Lesson for ${name}. Program: ${programType}. Notes: ${notes || 'None'}`
    );

    // 3. Send email notification to Admin
    await resend.emails.send({
      from: 'The Atelier Scheduling <onboarding@resend.dev>',
      to: 'mayan.admin@example.com', // Replace with founder's real email
      subject: `New Booking Request: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 4px solid #D4006A; border-radius: 12px; background-color: #FAF7F0;">
          <h2 style="color: #D4006A;">New Lesson Request!</h2>
          <p><strong>Student:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Professor:</strong> ${professorName || 'Not selected (Assign in Studio)'}</p>
          <p><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
          <p><strong>Program:</strong> ${programType || 'Not specified'}</p>
          <p><strong>Notes:</strong> ${notes || 'No notes provided'}</p>
          <hr style="border: 1px solid #D4006A;"/>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="${calLink}" style="background-color: #D4006A; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">
              📅 ADD TO GOOGLE CALENDAR
            </a>
          </div>
          
          <p style="font-size: 0.8rem; color: #666; margin-top: 20px;">
            <em>Check your Sanity Studio to manage this booking and assign a professor if needed.</em>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, bookingId: booking._id, calendarLink: calLink });
  } catch (error) {
    console.error('Scheduling error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
