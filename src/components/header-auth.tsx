"use client";

import { signOut } from "@/actions";
import { signIn } from "@/actions/sign-in";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

export default function HeaderAuth() {
  let authContent: React.ReactNode;
  const session = useSession();

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data?.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={signOut} className="p-4">
            <Button type="submit" color="primary" variant="flat">
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
