import { auth, signIn, signOut } from "@court-base/auth";
import { Button } from "@court-base/ui/button";

import { routes } from "~/config/routes";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("google");
          }}
        >
          Sign in with Google
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut({ redirectTo: routes.login });
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
