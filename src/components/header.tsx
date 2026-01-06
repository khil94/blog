"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { NAV_ITEMS, BLOG_NAV_ITEMS, SITE_CONFIG } from "@/constants";

interface HeaderProps {
  variant?: "landing" | "blog";
}

export function Header({ variant = "landing" }: HeaderProps) {
  const navItems = variant === "blog" ? BLOG_NAV_ITEMS : NAV_ITEMS;
  const showSearch = variant === "blog";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            {SITE_CONFIG.name}
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <Link href="/blog/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
