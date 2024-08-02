import React from "react";

import type { ButtonProps } from "./button";
import { Button } from "./button";

type GoogleLoginButtonProps = Omit<ButtonProps, "children">;

const GoogleLoginButton = React.forwardRef<
  HTMLButtonElement,
  GoogleLoginButtonProps
>((props, ref) => {
  return (
    <Button className="flex gap-2" ref={ref} {...props}>
      <img
        className="h-6 w-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </Button>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton";

export default GoogleLoginButton;
