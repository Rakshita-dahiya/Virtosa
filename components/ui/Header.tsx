"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  // Hide header on dashboard
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-[#F5F1E8] border-b border-[#E7DFD2] z-50">

      {/* Logo */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-[#1C1C1C]"
        >
          Virtosa
        </Link>
      </div>

      {/* Center Navigation */}
       <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">

  {[
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Success", href: "#success" },
    { name: "How It Works", href: "#works" },
    { name: "Testimonials", href: "#testimonials" },
  ].map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="
        text-lg
        font-medium
        text-gray-600
        transition-all
        duration-200
        hover:text-black
        hover:font-bold
      "
    >
      {item.name}
    </a>
  ))}

</nav>
      {/* Right Side */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-4">

        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="px-5 py-2 border border-[#1C1C1C] rounded-lg hover:bg-black hover:text-white transition">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Sign Up
              </button>
            </SignUpButton>
          </>
        )}

      </div>

    </header>
  );
}