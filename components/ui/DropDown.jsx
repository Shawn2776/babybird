import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function DropDownComp({ menuIcon, items }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="text-2xl text-white">
          {menuIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {items.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
