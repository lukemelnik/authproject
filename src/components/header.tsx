import { signOut } from "@/actions";
import { signIn } from "@/actions/sign-in";
import { auth } from "@/auth";
import {
  Avatar,
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  let authContent: React.ReactNode;
  const session = await auth();

  if (session?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.user.image || ""} />
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
  return (
    <div>
      <Navbar className="shadow mb-6">
        <NavbarBrand>
          <Link href="/" className="font-bold">
            Discuss
          </Link>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <Input />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">{authContent}</NavbarContent>
      </Navbar>
    </div>
  );
}
