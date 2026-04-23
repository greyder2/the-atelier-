import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { writeClient } from '@/../sanity/lib/write-client';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { goals } = await req.json();

  const existing = await writeClient.fetch(
    `*[_type == "client" && clerkUserId == $userId][0]{ _id }`,
    { userId }
  );

  if (!existing) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

  await writeClient.patch(existing._id).set({ learningGoals: goals }).commit();

  return NextResponse.json({ ok: true });
}