import { useEffect, useRef, useState } from "react";

export function usePerformanceMetrics() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState({ used: 0, total: 0 });
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef(0);

  useEffect(() => {
    const measure = (time: number) => {
      frameCountRef.current++;

      if (time > previousTimeRef.current + 1000) {
        setFps(
          Math.round(
            (frameCountRef.current * 1000) / (time - previousTimeRef.current),
          ),
        );
        frameCountRef.current = 0;
        previousTimeRef.current = time;

        if ((performance as any).memory) {
          const mem = (performance as any).memory;
          setMemory({
            used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
            total: Math.round(mem.totalJSHeapSize / 1024 / 1024),
          });
        }
      }
      requestRef.current = requestAnimationFrame(measure);
    };

    requestRef.current = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return { fps, memory };
}
