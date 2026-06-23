import { useRef } from "react";
import { motion, useInView } from "motion/react";

const MILESTONES = [
  {
    icon: "✨",
    title: "First Meeting",
    subtitle: "Where it all began",
    description:
      "Two souls crossed paths in the most unexpected way. A moment that changed everything — a smile that sparked a lifetime.",
    accent: "#C0395A",
    iconBg: "linear-gradient(135deg, #FF6B8A, #C0395A)",
    iconShadow: "rgba(192,57,90,0.45)",
  },
  {
    icon: "🌸",
    title: "Love Blossomed",
    subtitle: "Getting to know each other",
    description:
      "Late nights, long conversations, and countless memories. Every moment spent together felt like a beautiful dream.",
    accent: "#B8871C",
    iconBg: "linear-gradient(135deg, #F5C842, #B8871C)",
    iconShadow: "rgba(184,135,28,0.45)",
  },
  {
    icon: "💍",
    title: "The Promise",
    subtitle: "A lifetime commitment",
    description:
      "With every heartbeat, a promise was made — to cherish, to love, and to walk together through every season of life.",
    accent: "#7B3FA0",
    iconBg: "linear-gradient(135deg, #C084FC, #7B3FA0)",
    iconShadow: "rgba(123,63,160,0.45)",
  },
  {
    icon: "🎊",
    title: "Our New Beginning",
    subtitle: "1 · 2 · 3 July 2026",
    description:
      "Three days of celebration, joy, and togetherness. We can't wait to share our happiness with the people we love most.",
    accent: "#C0395A",
    iconBg: "linear-gradient(135deg, #FF8C69, #C0395A)",
    iconShadow: "rgba(192,57,90,0.45)",
  },
];

function MilestoneCard({ item, index }: { item: (typeof MILESTONES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        alignItems: "start",
        marginBottom: "56px",
        position: "relative",
      }}
    >
      {/* Left slot */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "32px" }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#fff",
              border: `1.5px solid ${item.accent}33`,
              borderRadius: "16px",
              padding: "28px 32px",
              maxWidth: "380px",
              boxShadow: `0 4px 24px rgba(0,0,0,0.07), 0 0 0 1px ${item.accent}15`,
            }}
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Center icon — strictly centered in the 80px column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: item.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow: `0 4px 18px ${item.iconShadow}, 0 0 0 4px rgba(255,255,255,0.9)`,
            flexShrink: 0,
            zIndex: 10,
            position: "relative",
          }}
        >
          <motion.span
            animate={inView ? { rotate: [0, 15, -10, 8, -5, 0] } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
            style={{ display: "inline-block", lineHeight: 1 }}
          >
            {item.icon}
          </motion.span>
        </motion.div>
      </div>

      {/* Right slot */}
      <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "32px" }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#fff",
              border: `1.5px solid ${item.accent}33`,
              borderRadius: "16px",
              padding: "28px 32px",
              maxWidth: "380px",
              boxShadow: `0 4px 24px rgba(0,0,0,0.07), 0 0 0 1px ${item.accent}15`,
            }}
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CardContent({ item }: { item: (typeof MILESTONES)[0] }) {
  return (
    <>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "12px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: item.accent,
          marginBottom: "6px",
        }}
      >
        {item.subtitle}
      </p>
      <h3
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "36px",
          color: "#2C1218",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "15px",
          lineHeight: 1.8,
          color: "rgba(44,18,24,0.65)",
        }}
      >
        {item.description}
      </p>
    </>
  );
}

export function OurStorySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="story"
      style={{
        background: "linear-gradient(180deg, #FFF8F2 0%, #FDF5EE 50%, #FFF8F2 100%)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 50%, rgba(192,57,90,0.04) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "rgba(184,135,28,0.7)",
            marginBottom: "10px",
          }}
        >
          How we found each other
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "72px",
            color: "#6B1A2A",
            lineHeight: 1,
          }}
        >
          Our Story
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            height: "1px",
            width: "180px",
            margin: "16px auto 0",
            background: "linear-gradient(to right, transparent, #B8871C, transparent)",
          }}
        />
      </div>

      {/* Timeline wrapper — the vertical line is a background on this container */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Centered vertical line — sits inside the 80px center column */}
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 0.5px)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(184,135,28,0.35) 8%, rgba(184,135,28,0.35) 92%, transparent)",
          }}
        />

        {MILESTONES.map((item, i) => (
          <MilestoneCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
