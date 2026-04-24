// src/app/join/page.tsx
// Visited as /join?ref=sofia-a3x9
// Sets a cookie and redirects to Clerk sign-up.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function JoinPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams.ref;

  if (ref) {
    // Set a 7-day cookie so sync-clerk can read it after sign-up
    cookies().set('atelier_ref', ref, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  // Redirect to Clerk sign-up (adjust path to match your Clerk config)
  redirect('/sign-up');
}