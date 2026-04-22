import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--pale-cream)]">
      <div className="p-8 border-4 border-[var(--lime)] rounded-[24px] bg-white shadow-[12px_12px_0px_#111111]">
        <h2 className="font-pacifico text-center text-3xl mb-4">Join The Atelier</h2>
        <SignUp fallbackRedirectUrl="/dashboard" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
