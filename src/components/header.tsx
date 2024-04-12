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
  divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  let authContent: React.ReactNode;
  const session = await auth();

  if (session?.user) {
    authContent = <Avatar src={session.user.image || ""} />;
  } else {
    authContent = (
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>
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
        <NavbarContent justify="end">
          <NavbarItem>{authContent}</NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
