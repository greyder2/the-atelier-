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
    const { email, type, name, company, people, notes, level, goal } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let subject = 'New Demo Request from The Atelier!';
    let html = '';

    if (type === 'corporate-quotation') {
      subject = `Corporate Quotation Request — ${company}`;
      html = `
        <h2>New Corporate Quotation Request</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold;">Contact Name</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Company</td><td style="padding: 8px;">${company}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Team Size</td><td style="padding: 8px;">${people} people</td></tr>
          ${notes ? `<tr><td style="padding: 8px; font-weight: bold;">Notes</td><td style="padding: 8px;">${notes}</td></tr>` : ''}
        </table>
        <br/>
        <p><em>Follow up with a customized quotation!</em></p>
      `;
    } else if (type === 'consultation-application') {
      subject = `New Mentorship Application — ${name}`;
      html = `
        <h2>New Mentorship Application</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Current Level</td><td style="padding: 8px;">${level}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Professional Goal</td><td style="padding: 8px;">${goal}</td></tr>
        </table>
        <br/>
        <p><em>Review this high-intent profile!</em></p>
      `;
    } else {
      // Default: email subscription / demo request
      html = `
        <h2>New Lead from The Atelier</h2>
        <p>A new user has requested to schedule a free demo session!</p>
        <p><strong>Email address:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <br/>
        <p><em>Reach out to them to schedule!</em></p>
      `;
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'The Atelier Contact <onboarding@resend.dev>', // Update with verified domain in production
      to: 'theenglishateliere@gmail.com',
      subject,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
