"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 py-2">
      <div className="container mx-auto flex justify-center space-x-20">
        <Link
          href="/"
          className={`text-md font-bold selection:text-slate-950 ${
            pathname === "/"
              ? "text-lime-500 hover:text-slate-50"
              : "hover:text-lime-500"
          }`}>
          Race Schedule
        </Link>
        <Link
          href="/drivers"
          className={`text-md font-bold selection:text-slate-950 ${
            pathname === "/drivers"
              ? "text-lime-500 hover:text-slate-50"
              : "hover:text-lime-500"
          }`}>
          Driver Standings
        </Link>
        <Link
          href="/constructors"
          className={`text-md font-bold selection:text-slate-950 ${
            pathname === "/constructors"
              ? "text-lime-500 hover:text-slate-50"
              : "hover:text-lime-500"
          }`}>
          Constructor Standings
        </Link>
      </div>
    </nav>
  );
}
