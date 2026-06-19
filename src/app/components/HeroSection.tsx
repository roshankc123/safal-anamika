import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CountdownTimer } from "./CountdownTimer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import brideImg from "../../imports/bride_1.png";
import groomImg from "../../imports/groom_1.png";

function useScrollOffset(speed: number) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handler = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);
  return offset;
}

const WEDDING_DATE = new Date("2026-07-07T00:00:00");

export function HeroSection() {
  const bgOffset = useScrollOffset(0.35);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #FFF8F2 0%, #FDE8D8 35%, #FDE6EE 70%, #FFF5F8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Parallax soft glow blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 55% 40% at 15% 60%, rgba(184,135,28,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 55% 40% at 85% 60%, rgba(184,135,28,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 70% 50% at 50% 95%, rgba(192,57,90,0.08) 0%, transparent 60%)
          `,
          transform: `translateY(${bgOffset}px)`,
        }}
      />

      {/* Rotating mandala ring */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          border: "1px solid rgba(184,135,28,0.15)",
          boxShadow: "0 0 0 28px rgba(184,135,28,0.04), 0 0 0 56px rgba(184,135,28,0.02)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Soft sparkles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: "50%",
            backgroundColor: "#B8871C",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.6, 0.5] }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Portrait frames row */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "60px 24px 0",
          gap: "16px",
        }}
      >
        {/* Bride portrait */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div
            style={{
              position: "relative",
              width: "260px",
              height: "380px",
              borderRadius: "140px 140px 0 0",
              overflow: "hidden",
              border: "2px solid rgba(184,135,28,0.45)",
              boxShadow: "0 0 40px rgba(184,135,28,0.15), 0 20px 50px rgba(192,57,90,0.12)",
              background: "#FAF5EF",
            }}
          >
            <ImageWithFallback
              src={brideImg}
              alt="The Bride"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, #FAF5EF, transparent)",
                pointerEvents: "none",
              }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "#8B4513",
              fontSize: "28px",
              marginTop: "12px",
            }}
          >
            The Bride
          </motion.p>
        </motion.div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "40px",
            zIndex: 30,
          }}
        >
          {/* Ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(to right, transparent, rgba(184,135,28,0.6))" }} />
            <span style={{ color: "rgba(184,135,28,0.7)", fontSize: "12px" }}>✦</span>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(to left, transparent, rgba(184,135,28,0.6))" }} />
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "rgba(107,26,42,0.6)",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            We invite you to celebrate
          </p>

          {/* Gaurav ♥ Trishna */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
            {["Gaurav", "♥", "Trishna"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.7 }}
                style={{
                  fontFamily: word === "♥" ? undefined : "'Great Vibes', cursive",
                  fontSize: word === "♥" ? "36px" : "72px",
                  lineHeight: 1.05,
                  color: word === "♥" ? "#C0395A" : "#6B1A2A",
                }}
              >
                {word === "♥" ? (
                  <motion.span
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "inline-block" }}
                  >
                    ♥
                  </motion.span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            style={{
              height: "1px",
              width: "260px",
              background: "linear-gradient(to right, transparent, #B8871C, transparent)",
              margin: "14px 0",
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "rgba(44,18,24,0.65)",
              fontSize: "18px",
              letterSpacing: "1px",
              textAlign: "center",
              marginBottom: "4px",
            }}
          >
            Together Forever
          </p>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: "rgba(184,135,28,0.8)",
              fontSize: "12px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            6 · 7 · 8 July 2026
          </p>

          <CountdownTimer targetDate={WEDDING_DATE} />

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ marginTop: "28px", color: "rgba(184,135,28,0.5)", fontSize: "22px" }}
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Groom portrait */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div
            style={{
              position: "relative",
              width: "260px",
              height: "380px",
              borderRadius: "140px 140px 0 0",
              overflow: "hidden",
              border: "2px solid rgba(184,135,28,0.45)",
              boxShadow: "0 0 40px rgba(184,135,28,0.15), 0 20px 50px rgba(192,57,90,0.12)",
              background: "#FAF5EF",
            }}
          >
            <ImageWithFallback
              src={groomImg}
              alt="The Groom"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, #FAF5EF, transparent)",
                pointerEvents: "none",
              }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "#8B4513",
              fontSize: "28px",
              marginTop: "12px",
            }}
          >
            The Groom
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
