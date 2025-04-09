"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Logo } from "@/shared/ui/Logo";


export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string>("");

  const navLinks = [
    { label: "О нас", href: "#about" },
    { label: "Технологии", href: "#feature" },
    { label: "Прайс", href: "#pricing" },
    { label: "Отзывы", href: "#testimoni" },
  ];

  const handleClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex items-center justify-between py-3 sm:py-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Navigation Links */}
      <ul className="hidden lg:flex items-center space-x-6">
        {navLinks.map((link) => (
          <li key={link.href} className="group">
            <Link
              href={link.href}
              className={cn(
                "relative px-4 py-2 cursor-pointer transition-all duration-300 text-black-500 hover:text-red-500",
                activeLink === link.href ? "text-red-500 font-medium" : ""
              )}
              onClick={() => handleClick(link.href)}
            >
              {link.label}
              {/* Bottom Line Effect */}
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-red-500 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Authentication Section */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="text-black-600 hover:text-red-500 transition-all tracking-wide capitalize"
        >
          Sign In
        </Link>
        <Button variant="destructive" className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-red-500 text-black bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-red">Sign Up</Button>
      </div>
    </nav>
  );
}
