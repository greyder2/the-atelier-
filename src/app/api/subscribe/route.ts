import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The founder/admin should put their Resend API key in .env.local as RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_update_in_production');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Send internal alert to the Atelier team
    await resend.emails.send({
      from: 'The Atelier Leads <onboarding@resend.dev>', // Update with verified domain in production
      to: 'theenglishateliere@gmail.com',
      subject: 'New Lead: Starter Guide Download!',
      html: `
        <h2>New Lead from the Website</h2>
        <p>A new user has requested the Language & Career Starter Guide via the popup.</p>
        <p><strong>Email address:</strong> ${email}</p>
        <br/>
        <p><em>Consider adding them to your mailing list or sending a personal welcome!</em></p>
      `,
    });

    // 2. (Optional) Auto-responder to the user sending the guide
    // await resend.emails.send({
    //   from: 'The Atelier <hello@theenglishatelier.com>',
    //   to: email,
    //   subject: 'Here is your Language & Career Starter Guide!',
    //   html: '<p>Welcome to The Atelier. Here is the link to your guide: ...</p>'
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error processing subscription' }, { status: 500 });
  }
}
