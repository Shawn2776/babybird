import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import FriendFeed from "../talkComponents/FriendFeed";

export default function Navbar2({ feedOne, feedTwo }) {
  return (
    <Navbar shouldHideOnScroll className="bg-[#18191A] text-white">
      <NavbarBrand>
        <p className="font-bold text-inherit">uTalkTo</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive>{feedOne}</NavbarItem>
        <NavbarItem>{feedTwo}</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className="text-white" href="#">
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
