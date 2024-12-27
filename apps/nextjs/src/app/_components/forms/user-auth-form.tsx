"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import GoogleSignInButton from "@court-base/ui/google-signin-button";

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignIn = async () => {
    const url = callbackUrl ?? "/?dashboard=true";

    await signIn("google", {
      callbackUrl: url,
    });
  };

  return (
    <>
      <GoogleSignInButton onClick={handleSignIn} />
    </>
  );
}
