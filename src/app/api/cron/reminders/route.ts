import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';

const sanity = createClient({
  projectId: '1pu795c0',
  dataset: 'production',
  apiVersion: '2024-03-12',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // Vercel Cron güvenliği
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Yarın olan upcoming lesson'ları bul (24 saat penceresi)
    const now = new Date();
    const in23h = new Date(now.getTime() + 23 * 60 * 60 * 1000).toISOString();
    const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000).toISOString();

    const lessons = await sanity.fetch(
      `*[_type == "lesson" && status == "upcoming" && date >= $from && date <= $to]{
        _id,
        title,
        date,
        professor->{ name },
        client->{ name, email, clerkUserId }
      }`,
      { from: in23h, to: in25h }
    );

    if (lessons.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const results = await Promise.allSettled(
      lessons.map(async (lesson: any) => {
        const clientEmail = lesson.client?.email;
        const clientName = lesson.client?.name || 'Student';
        const professorName = lesson.professor?.name || 'your professor';
        const sessionDate = new Date(lesson.date).toLocaleString('en-US', {
          weekday: 'long', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit',
        });

        if (!clientEmail) return;

        await resend.emails.send({
          from: 'The Atelier <onboarding@resend.dev>',
          to: clientEmail,
          subject: `Reminder: Your session is tomorrow`,
          html: `
            <div style="font-family:sans-serif;padding:24px;border:4px solid #D4006A;border-radius:16px;background:#FAF7F0;max-width:480px">
              <h2 style="color:#D4006A;font-size:1.5rem;margin-bottom:8px">Session Reminder 📅</h2>
              <p style="color:#333;margin-bottom:16px">Hi ${clientName}, just a friendly reminder that your session is coming up!</p>
              <div style="background:white;border:2px solid #eee;border-radius:12px;padding:16px;margin-bottom:20px">
                <p style="margin:0 0 8px"><strong>Session:</strong> ${lesson.title}</p>
                <p style="margin:0 0 8px"><strong>Professor:</strong> ${professorName}</p>
                <p style="margin:0"><strong>Time:</strong> ${sessionDate}</p>
              </div>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" style="display:inline-block;background:#D4006A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold">
                View in Portal →
              </a>
              <p style="color:#888;font-size:0.75rem;margin-top:20px">The Atelier — Where Ambitious Minds Learn to Speak the World</p>
            </div>
          `,
        });
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled').length;
    return NextResponse.json({ ok: true, sent, total: lessons.length });

  } catch (error) {
    console.error('Reminder cron error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}