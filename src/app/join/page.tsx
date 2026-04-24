import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const cookieStore = await cookies();

  if (ref) {
    cookieStore.set('atelier_ref', ref, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  redirect('/sign-up');
}