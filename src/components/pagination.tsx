"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | "ellipsis")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`p-3 border-3 border-foreground font-bold transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${
          currentPage === 1
            ? "opacity-30 pointer-events-none"
            : "hover:bg-foreground hover:text-background"
        }`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={3} />
      </Link>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 font-mono font-bold"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`min-w-[44px] px-4 py-2 border-3 border-foreground font-mono font-bold text-center transition-all ${
                page === currentPage
                  ? "bg-foreground text-background"
                  : "hover:bg-foreground hover:text-background shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {String(page).padStart(2, "0")}
            </Link>
          )
        )}
      </div>

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`p-3 border-3 border-foreground font-bold transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${
          currentPage === totalPages
            ? "opacity-30 pointer-events-none"
            : "hover:bg-foreground hover:text-background"
        }`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={3} />
      </Link>
    </nav>
  );
}
