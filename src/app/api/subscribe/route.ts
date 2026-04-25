import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The founder/admin should put their Resend API key in .env.local as RESEND_API_KEY
if (!process.env.RESEND_API_KEY) {
  console.warn("WARNING: RESEND_API_KEY is missing. Email features will fail.");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Send internal alert to the Atelier team
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'The Atelier Leads <onboarding@resend.dev>', // Update with verified domain in production
      to: 'theenglishateliere@gmail.com',
      subject: 'New Lead: Assessment Application!',
      html: `
        <h2>New Assessment Application</h2>
        <p>A new user has requested a free assessment via the apply popup.</p>
        <p><strong>Email address:</strong> ${email}</p>
        <br/>
        <p><em>Consider adding them to your mailing list or sending a personal welcome!</em></p>
      `,
    });

    // 2. Auto-responder to the user
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'The Atelier <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to The Atelier — Next Steps',
      html: '<p>Welcome to The Atelier.</p><p>We have received your request for a complimentary assessment. Our team will reach out shortly to schedule your session.</p><p>Best,<br/>The Atelier Team</p>'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error processing subscription' }, { status: 500 });
  }
}
