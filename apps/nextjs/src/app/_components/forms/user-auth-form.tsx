"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import GoogleSignInButton from "@court-base/ui/google-signin-button";

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <>
      <GoogleSignInButton onClick={async ()=> {
        await signIn("google", {
          callbackUrl: callbackUrl ?? "/x",
        });
      }}/>
    </>
  );
}
