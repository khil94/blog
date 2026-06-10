"use clinet";

import { usePerformanceMetrics } from "../hooks/usePerformanceMetrics";

export default function MetricsHeader() {
  const { fps, memory } = usePerformanceMetrics();
  return (
    <header className="flex items-center justify-between border-b-2 border-foreground bg-background px-4 py-2">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold">Performance Metrics</span>
        <span className="text-sm font-bold">FPS: {fps}</span>
        <span className="text-sm font-bold">
          Memory: {memory.used}MB / {memory.total}MB
        </span>
      </div>
    </header>
  );
}
