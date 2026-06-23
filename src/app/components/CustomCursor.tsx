import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], input, textarea, select, label"));
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Main S♥A cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center select-none"
        style={{ gap: "3px" }}
        animate={{
          x: pos.x - 28,
          y: pos.y - 14,
          scale: clicking ? 1.5 : hovering ? 1.25 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.4 }}
      >
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#D4AF37",
            fontSize: "20px",
            lineHeight: 1,
            textShadow: "0 0 10px rgba(212,175,55,0.6)",
          }}
        >
          S
        </span>
        <motion.span
          style={{ fontSize: "16px", lineHeight: 1 }}
          animate={{
            color: hovering ? "#FFD700" : clicking ? "#FF4081" : "#C9956C",
            scale: clicking ? 1.3 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          ♥
        </motion.span>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#D4AF37",
            fontSize: "20px",
            lineHeight: 1,
            textShadow: "0 0 10px rgba(212,175,55,0.6)",
          }}
        >
          A
        </span>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ width: 6, height: 6, backgroundColor: "rgba(212,175,55,0.4)" }}
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      />
    </>
  );
}
