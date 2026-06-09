"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSubmit() {
    console.log(val);
    router.push(`/search?q=${encodeURIComponent(val)}`);
  }

  return (
    <div className="space-x-2 flex flex-row items-center pl-8">
      <span className="sr-only">Search</span>
      <form
        className="text-right"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          maxLength={10}
          ref={inputRef}
          value={val}
          // onBlur={() => setIsOpen(false)}
          onChange={(v) => setVal(v.target.value)}
          className={`rounded-full focus:caret-accent text-right transition-all duration-500
          ${isOpen ? "w-full sm:w-64 border px-4" : "w-0 border-0"}
        `}
        />
      </form>
      <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
        <Search />
      </Button>
    </div>
  );
}
