"use client";

import type { User } from "@auth/core/types";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@court-base/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@court-base/ui/dropdown-menu";

export default function AccountDropdown({ user }: { user: User }) {
  const nameLogo = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center">
          <Avatar className="mr-2">
            {user.image && <AvatarImage src={user.image} alt={nameLogo} />}
            <AvatarFallback>{nameLogo}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-1 w-56">
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
