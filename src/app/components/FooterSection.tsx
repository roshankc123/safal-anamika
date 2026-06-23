import { useState } from "react";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Celebrations", href: "#details" },
  { label: "Couple", href: "#couple" },
  { label: "RSVP", href: "#rsvp" },
];

export function FooterSection() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #3D1020 0%, #1A0510 100%)",
        padding: "80px 24px 48px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Subtle warm glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, rgba(192,57,90,0.08), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Twinkling stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            borderRadius: "50%",
            backgroundColor: "rgba(212,175,55,0.6)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.6, 0.5] }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)",
          marginBottom: "60px",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* S ♥ A monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "24px", position: "relative", zIndex: 1 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "90px",
              color: "#D4AF37",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(212,175,55,0.3)",
            }}
          >
            S
          </span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "44px",
              color: "#E8B4C0",
              lineHeight: 1,
              filter: "drop-shadow(0 0 12px rgba(232,180,192,0.5))",
              display: "inline-block",
            }}
          >
            ♥
          </motion.span>
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "90px",
              color: "#D4AF37",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(212,175,55,0.3)",
            }}
          >
            A
          </span>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "20px",
          color: "rgba(250,245,239,0.65)",
          marginBottom: "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Together Forever
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "12px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.5)",
          marginBottom: "48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        1 · 2 · 3 July 2026 · Aanboo Khaireni, Nepal
      </motion.p>

      {/* Ornament */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ height: "1px", width: "80px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3))" }} />
        <span style={{ color: "rgba(212,175,55,0.35)", fontSize: "14px" }}>✦</span>
        <div style={{ height: "1px", width: "80px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3))" }} />
      </div>

      {/* Nav links */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            whileHover={{ color: "#D4AF37" }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(250,245,239,0.35)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      {/* Venue details */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px",
          color: "rgba(250,245,239,0.25)",
          lineHeight: 2,
          marginBottom: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p>Mehendi &amp; Wedding — Khaireni Party Palace, Aanboo Khaireni, Tanahun, Nepal</p>
        <p>Reception — Khaireni Party Palace, Aanboo Khaireni, Tanahun, Nepal</p>
      </motion.div>

      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(212,175,55,0.12), transparent)",
          marginBottom: "28px",
          position: "relative",
          zIndex: 1,
        }}
      />

      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "11px",
          color: "rgba(250,245,239,0.12)",
          letterSpacing: "1px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Made with ♥ for our special day
      </p>
    </footer>
  );
}
