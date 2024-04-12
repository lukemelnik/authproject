import Link from "next/link";
import HeaderAuth from "./header-auth";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default async function Header() {
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
          <HeaderAuth />
        </NavbarContent>
      </Navbar>
    </div>
  );
}
