"use client";

import Link from "next/link";
import { ArrowLeft, Bot, Code, Computer, Sparkles } from "lucide-react";
import MetricsHeader from "./components/metrics-header";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    {
      id: "benchmark",
      href: "/lab/benchmark",
      icon: Computer,
      label: "Benchmark",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MetricsHeader />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
