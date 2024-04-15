import Link from "next/link";
import HeaderAuth from "./header-auth";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import SearchInput from "./common/search-input";
import { Suspense } from "react";
const dynamic = "force-dynamic";
export default function Header() {
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
            <Suspense>
              <SearchInput />
            </Suspense>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <HeaderAuth />
        </NavbarContent>
      </Navbar>
    </div>
  );
}
