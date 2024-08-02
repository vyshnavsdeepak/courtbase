import React from "react";

import { Button } from "./button";

const GoogleLoginButton = () => {
  return (
    <Button className="flex gap-2">
      <img
        className="h-6 w-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
