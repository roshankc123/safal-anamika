import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const ITEM_H = 40;

/* Discrete flip for days / hours / minutes */
function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          background: "rgba(184,135,28,0.09)",
          border: "1px solid rgba(184,135,28,0.28)",
          borderRadius: "8px",
          padding: "6px 14px",
          minWidth: "62px",
          overflow: "hidden",
          position: "relative",
          height: ITEM_H + 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -ITEM_H, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: ITEM_H, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "34px",
              fontWeight: 600,
              color: "#8B6914",
              display: "block",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: "10px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "rgba(107,26,42,0.55)",
        marginTop: "6px",
      }}>
        {label}
      </span>
    </div>
  );
}

/* Smooth continuous roller for seconds using rAF */
function SmoothSecondsRoller({ targetDate }: { targetDate: Date }) {
  const [yOffset, setYOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const totalSeconds = diff / 1000;
      const currentSecond = Math.floor(totalSeconds % 60);
      const fraction = totalSeconds % 1; // how much of this second remains (1→0)
      // Roller: index 0 = "59", index 59 = "00"
      const index = 59 - currentSecond;
      const progress = 1 - fraction; // 0 at second start, → 1 at second end
      setYOffset(-(index + progress) * ITEM_H);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetDate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          background: "rgba(184,135,28,0.09)",
          border: "1px solid rgba(184,135,28,0.28)",
          borderRadius: "8px",
          padding: "6px 14px",
          minWidth: "62px",
          height: ITEM_H + 12,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top/bottom fade masks */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(250,248,242,0.9) 0%, transparent 30%, transparent 70%, rgba(250,248,242,0.9) 100%)",
        }} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: `translateY(calc(-50% + ${yOffset % (60 * ITEM_H)}px))`,
            willChange: "transform",
          }}
        >
          {/* Roller strip: 59 down to 00 */}
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              style={{
                height: ITEM_H,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "34px",
                fontWeight: 600,
                color: "#8B6914",
                lineHeight: 1,
              }}
            >
              {String(59 - i).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
      <span style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: "10px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "rgba(107,26,42,0.55)",
        marginTop: "6px",
      }}>
        Secs
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(tick);
  }, [targetDate]);

  const isOver = Object.values(timeLeft).every((v) => v === 0);

  if (isOver) {
    return (
      <div style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: "32px",
        color: "#C0395A",
        textAlign: "center",
        marginTop: "16px",
      }}>
        Today is the Day! ♥
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <p style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: "10px",
        letterSpacing: "4px",
        textTransform: "uppercase",
        color: "rgba(44,18,24,0.45)",
        textAlign: "center",
        marginBottom: "12px",
      }}>
        Wedding day in
      </p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "flex-start" }}>
        <FlipUnit value={timeLeft.days} label="Days" />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: "26px", lineHeight: "52px" }}>:</span>
        <FlipUnit value={timeLeft.hours} label="Hours" />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: "26px", lineHeight: "52px" }}>:</span>
        <FlipUnit value={timeLeft.minutes} label="Mins" />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: "26px", lineHeight: "52px" }}>:</span>
        <SmoothSecondsRoller targetDate={targetDate} />
      </div>
    </div>
  );
}
