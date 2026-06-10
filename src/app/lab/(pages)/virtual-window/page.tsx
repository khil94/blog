"use client";

import React, {
  useState,
  useEffect,
  useRef,
  UIEvent,
  useCallback,
} from "react";

interface DataItem {
  id: number;
  title: string;
  createdAt: string;
}

export default function PracticalVirtualScroll() {
  const [items, setItems] = useState<DataItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const itemHeight = 50;
  const windowHeight = 500;
  const overscan = 5;
  const [scrollTop, setScrollTop] = useState(0);

  const fetchPageFromServer = useCallback(
    async (pageNumber: number) => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      // 네트워크 지연 시뮬레이션 (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));

      const pageSize = 50;
      const startId = (pageNumber - 1) * pageSize;

      // 최대 500개까지만 데이터가 있는 서버라고 가정
      if (startId >= 500) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const newItems: DataItem[] = Array.from({ length: pageSize }).map(
        (_, index) => ({
          id: startId + index + 1,
          title: `서버 연동 데이터 항목 #${startId + index + 1}`,
          createdAt: new Date().toLocaleTimeString(),
        }),
      );

      setItems((prev) => [...prev, ...newItems]);
      setIsLoading(false);
    },
    [isLoading, hasMore],
  );

  // 초기 1페이지 로드
  useEffect(() => {
    fetchPageFromServer(1);
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setScrollTop(scrollTop);

    if (
      scrollHeight - scrollTop - clientHeight < 200 &&
      !isLoading &&
      hasMore
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPageFromServer(nextPage);
    }
  };

  // 가상 윈도우 인덱스 산출 (현재 적재된 items 크기 기준)
  const totalCount = items.length;
  const totalHeight = totalCount * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight) + overscan,
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  console.log(startIndex, itemHeight);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center p-4 bg-zinc-900 border border-zinc-800 rounded-t-xl text-sm">
        <div>
          클라이언트 적재 데이터:{" "}
          <span className="text-lime-400 font-mono">{totalCount}개</span>
        </div>
        <div>
          실제 렌더링된 DOM 노드:{" "}
          <span className="text-lime-400 font-mono">
            {visibleItems.length}개
          </span>
        </div>
        <div>
          상태:{" "}
          {isLoading ? (
            <span className="text-amber-400 animate-pulse">로딩 중...</span>
          ) : (
            <span className="text-zinc-500">대기</span>
          )}
        </div>
      </div>

      <div
        onScroll={handleScroll}
        style={{
          height: `${windowHeight}px`,
          overflowY: "auto",
          position: "relative",
        }}
        className="border-x border-b border-zinc-800 bg-zinc-950 rounded-b-xl"
      >
        <div style={{ height: `${totalHeight}px`, position: "relative" }}>
          <div
            style={{
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${startIndex * itemHeight}px)`,
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                style={{ height: `${itemHeight}px` }}
                className="flex items-center justify-between px-6 border-b border-zinc-900 text-zinc-300 text-sm"
              >
                <span>{item.title}</span>
                <span className="text-zinc-600 font-mono text-xs">
                  {item.createdAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>test</div>
    </div>
  );
}
