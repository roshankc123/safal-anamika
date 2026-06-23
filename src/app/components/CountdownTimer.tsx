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
function FlipUnit({ value, label, small }: { value: number; label: string; small?: boolean }) {
  const display = String(value).padStart(2, "0");
  const boxH = small ? ITEM_H - 10 : ITEM_H;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          background: "rgba(184,135,28,0.09)",
          border: "1px solid rgba(184,135,28,0.28)",
          borderRadius: "8px",
          padding: small ? "4px 8px" : "6px 14px",
          minWidth: small ? "44px" : "62px",
          overflow: "hidden",
          position: "relative",
          height: boxH + 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -boxH, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: boxH, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: small ? "22px" : "34px",
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
        fontSize: small ? "8px" : "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "rgba(107,26,42,0.55)",
        marginTop: "5px",
      }}>
        {label}
      </span>
    </div>
  );
}

/* Smooth continuous roller for seconds using rAF */
function SmoothSecondsRoller({ targetDate, small }: { targetDate: Date; small?: boolean }) {
  const [yOffset, setYOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const totalSeconds = diff / 1000;
      const currentSecond = Math.floor(totalSeconds % 60);
      const fraction = totalSeconds % 1; // how much of this second remains (1→0)
      // Roller: index 0 = "59", index 59 = "00".
      // The strip is centered on its midpoint, so offset from the midpoint item.
      const index = 59 - currentSecond;
      const progress = 1 - fraction; // 0 at second start, → 1 at second end
      setYOffset((29.5 - index - progress) * ITEM_H);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetDate]);

  const boxH = ITEM_H; // always use full ITEM_H for strip alignment
  const containerH = small ? 42 : ITEM_H + 12;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          background: "rgba(184,135,28,0.09)",
          border: "1px solid rgba(184,135,28,0.28)",
          borderRadius: "8px",
          padding: small ? "4px 8px" : "6px 14px",
          minWidth: small ? "44px" : "62px",
          height: containerH,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top/bottom fade masks — use tight 15%/85% so they don't cover the center digit */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(250,248,242,0.85) 0%, transparent 20%, transparent 80%, rgba(250,248,242,0.85) 100%)",
        }} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: `translateY(calc(-50% + ${yOffset}px))`,
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
                fontSize: small ? "22px" : "34px",
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
        fontSize: small ? "8px" : "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "rgba(107,26,42,0.55)",
        marginTop: "5px",
      }}>
        Secs
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, small }: { targetDate: Date; small?: boolean }) {
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
      <div style={{ display: "flex", gap: small ? "6px" : "10px", justifyContent: "center", alignItems: "flex-start" }}>
        <FlipUnit value={timeLeft.days} label="Days" small={small} />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: small ? "18px" : "26px", lineHeight: small ? "38px" : "52px" }}>:</span>
        <FlipUnit value={timeLeft.hours} label="Hours" small={small} />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: small ? "18px" : "26px", lineHeight: small ? "38px" : "52px" }}>:</span>
        <FlipUnit value={timeLeft.minutes} label="Mins" small={small} />
        <span style={{ color: "rgba(184,135,28,0.5)", fontSize: small ? "18px" : "26px", lineHeight: small ? "38px" : "52px" }}>:</span>
        <SmoothSecondsRoller targetDate={targetDate} small={small} />
      </div>
    </div>
  );
}
