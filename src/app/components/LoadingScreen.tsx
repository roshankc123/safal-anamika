import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import bride2 from "../../imports/bride_2.png";
import groom2 from "../../imports/groom_2.png";

const CARD_BG = `
  linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%),
  linear-gradient(225deg, rgba(255,255,255,0.4) 0%, transparent 50%),
  repeating-linear-gradient(
    90deg,
    transparent,
    transparent 3px,
    rgba(180,140,60,0.018) 3px,
    rgba(180,140,60,0.018) 4px
  ),
  repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(180,140,60,0.018) 3px,
    rgba(180,140,60,0.018) 4px
  ),
  #FAF5EF
`;

const BORDER_GOLD = "rgba(184,135,28,0.45)";
const TEXT_DARK = "#2C1218";
const GOLD = "#B8871C";

function GoldDivider({ width = 120 }: { width?: number }) {
  return (
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} fill="none">
      <line x1="0" y1="8" x2={width * 0.38} y2="8" stroke={BORDER_GOLD} strokeWidth="0.8" />
      <circle cx={width * 0.42} cy="8" r="2" fill={BORDER_GOLD} />
      <circle cx={width / 2} cy="8" r="3.5" fill="none" stroke={BORDER_GOLD} strokeWidth="0.8" />
      <circle cx={width / 2} cy="8" r="1.5" fill={BORDER_GOLD} />
      <circle cx={width * 0.58} cy="8" r="2" fill={BORDER_GOLD} />
      <line x1={width * 0.62} y1="8" x2={width} y2="8" stroke={BORDER_GOLD} strokeWidth="0.8" />
    </svg>
  );
}

function CornerFloral({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M4 44 Q4 4 44 4" stroke={BORDER_GOLD} strokeWidth="0.8" fill="none" />
      <path d="M4 44 Q4 24 24 24" stroke={BORDER_GOLD} strokeWidth="0.6" fill="none" />
      <circle cx="14" cy="14" r="2.5" fill="none" stroke={BORDER_GOLD} strokeWidth="0.7" />
      <circle cx="8" cy="8" r="1.2" fill={BORDER_GOLD} opacity="0.6" />
      <circle cx="20" cy="20" r="1.2" fill={BORDER_GOLD} opacity="0.6" />
    </svg>
  );
}

function ArchPortrait({ src, alt, size = 130 }: { src: string; alt: string; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size * 1.22,
      borderRadius: `${size / 2}px ${size / 2}px 0 0`,
      overflow: "hidden",
      border: `1.5px solid ${BORDER_GOLD}`,
      boxShadow: `0 4px 20px rgba(184,135,28,0.18), inset 0 0 0 3px rgba(250,245,239,0.9)`,
      background: "#FAF5EF",
      flexShrink: 0,
    }}>
      <ImageWithFallback
        src={src} alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
      />
    </div>
  );
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t1);
  }, []);

  const panelBase: React.CSSProperties = {
    position: "absolute",
    top: 0,
    width: "50%",
    height: "100%",
    background: CARD_BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ position: "fixed", inset: 0, zIndex: 99999 }}
        >
          {/* Left panel — Bride */}
          <div style={{ ...panelBase, left: 0, boxShadow: "inset -6px 0 18px rgba(0,0,0,0.07)" }}>
            <div style={{ position: "absolute", inset: "16px", border: `1px solid ${BORDER_GOLD}`, borderRight: "none", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 20, left: 20 }}><CornerFloral /></div>
            <div style={{ position: "absolute", bottom: 20, left: 20, transform: "scaleY(-1)" }}><CornerFloral /></div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}
            >
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "rgba(184,135,28,0.65)" }}>
                The Bride
              </p>
              <ArchPortrait src={bride2} alt="Trishna" size={130} />
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "44px", color: TEXT_DARK, lineHeight: 1, marginTop: "4px" }}>
                Trishna
              </p>
              <GoldDivider width={110} />
            </motion.div>
          </div>

          {/* Right panel — Groom */}
          <div style={{ ...panelBase, right: 0, boxShadow: "inset 6px 0 18px rgba(0,0,0,0.07)" }}>
            <div style={{ position: "absolute", inset: "16px", border: `1px solid ${BORDER_GOLD}`, borderLeft: "none", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 20, right: 20 }}><CornerFloral flip /></div>
            <div style={{ position: "absolute", bottom: 20, right: 20, transform: "scaleY(-1)" }}><CornerFloral flip /></div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}
            >
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "5px", textTransform: "uppercase", color: "rgba(184,135,28,0.65)" }}>
                The Groom
              </p>
              <ArchPortrait src={groom2} alt="Gaurav" size={130} />
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "44px", color: TEXT_DARK, lineHeight: 1, marginTop: "4px" }}>
                Gaurav
              </p>
              <GoldDivider width={110} />
            </motion.div>
          </div>

          {/* Center seam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "160px",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ width: "1px", flex: 1, background: `linear-gradient(to bottom, transparent, ${BORDER_GOLD})`, marginBottom: "12px" }} />

            <div style={{
              background: "#FAF5EF",
              border: `1px solid ${BORDER_GOLD}`,
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 0 6px #FAF5EF, 0 0 0 7px ${BORDER_GOLD}55`,
              flexShrink: 0,
            }}>
              <motion.span
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "28px", lineHeight: 1, display: "block" }}
              >
                ♥
              </motion.span>
            </div>

            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "28px", color: GOLD, lineHeight: 1, whiteSpace: "nowrap", margin: "12px 0 6px" }}>
              G & T
            </p>
            <GoldDivider width={90} />
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(44,18,24,0.4)", marginTop: "8px", textAlign: "center", lineHeight: 1.8, whiteSpace: "nowrap" }}>
              6 · 7 · 8<br />July 2026
            </p>

            <div style={{ width: "1px", flex: 1, background: `linear-gradient(to top, transparent, ${BORDER_GOLD})`, marginTop: "12px" }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
