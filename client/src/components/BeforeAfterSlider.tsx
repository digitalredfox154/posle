import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "ДО",
  afterLabel = "ПОСЛЕ",
  className = "",
  aspectRatio = "4/3",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    };
    const onMouseUp = () => setDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      updatePosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => setDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none rounded-xl ${className}`}
      style={{ aspectRatio, cursor: dragging ? "ew-resize" : "col-resize" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After image (full background) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${10000 / position}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
        style={{ left: `${position}%`, background: "rgba(255,255,255,0.7)" }}
      />

      {/* Handle — white circle with ↔ arrows */}
      <div
        className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 6H19M1 6L5 2M1 6L5 10M19 6L15 2M19 6L15 10" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Badge ДО — bottom left, dark semi-transparent */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <span
          className="text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: "rgba(30,28,24,0.65)",
            backdropFilter: "blur(4px)",
          }}
        >
          {beforeLabel}
        </span>
      </div>

      {/* Badge ПОСЛЕ — bottom right, gold */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
        <span
          className="text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: "rgba(160,130,70,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
