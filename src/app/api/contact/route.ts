import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The founder/admin should put their Resend API key in .env.local as RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_update_in_production');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send an email notification to the admin/founder
    const data = await resend.emails.send({
      from: 'The Atelier Contact <onboarding@resend.dev>', // Update with verified domain in production
      to: 'mayan.admin@example.com', // Replace with the actual email of the founder
      subject: 'New Demo Request from The Atelier!',
      html: `
        <h2>New Lead from The Atelier</h2>
        <p>A new user has requested to schedule a free demo session!</p>
        <p><strong>Email address:</strong> ${email}</p>
        <br/>
        <p><em>Reach out to them to schedule!</em></p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
