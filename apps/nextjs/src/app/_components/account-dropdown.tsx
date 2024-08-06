"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@court-base/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@court-base/ui/dropdown-menu";
import type {User} from "@auth/core/types";
import { signOut } from "next-auth/react"

export default function AccountDropdown({
  user,
}: {
  user: User
}) {
  const nameLogo = user.name ? user.name.split(" ").map((n) => n[0]).join("") : "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Avatar className="mr-2">
            { user.image && <AvatarImage src={user.image} alt={nameLogo} /> }
            <AvatarFallback>{nameLogo}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() =>signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


