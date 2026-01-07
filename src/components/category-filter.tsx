"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  postCounts: Record<string, number>;
  totalCount: number;
}

export function CategoryFilter({
  categories,
  postCounts,
  totalCount,
}: CategoryFilterProps) {
  const pathname = usePathname();
  const isAllActive = pathname === "/blog";

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 border-3 border-foreground font-bold uppercase text-sm transition-all ${
          isAllActive
            ? "bg-foreground text-background"
            : "hover:bg-foreground hover:text-background shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        }`}
      >
        All ({totalCount})
      </Link>
      {categories.map((category) => {
        const isActive = pathname === `/blog/${category}`;
        return (
          <Link
            key={category}
            href={`/blog/${category}`}
            className={`px-4 py-2 border-3 border-foreground font-bold uppercase text-sm transition-all ${
              isActive
                ? "bg-foreground text-background"
                : "hover:bg-foreground hover:text-background shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            }`}
          >
            {category} ({postCounts[category] || 0})
          </Link>
        );
      })}
    </div>
  );
}
