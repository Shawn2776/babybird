import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { LoginButton, LogoutButton } from "../buttons/auth/auth";

const Nav = (session) => {
  return (
    <header className="text-gray-100 bg-gray-600">
      <nav className="flex items-center justify-between w-full px-10 py-4">
        <Link href="/">Home</Link>
        <div className="flex gap-10">
          <LoginButton />
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
