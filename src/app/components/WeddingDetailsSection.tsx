import { useRef } from "react";
import { motion, useInView } from "motion/react";

const EVENTS = [
  {
    emoji: "🌿",
    name: "Mehendi",
    date: "6th July 2026",
    dayOfWeek: "Monday",
    time: "",
    venue: "Hotel Pauwa",
    location: "Janakinagar, Tillottama, Rupandehi",
    accent: "#2E7D32",
    bg: "#F1F8F1",
    glow: "rgba(46,125,50,0.1)",
    description: "An evening of henna, colour and laughter as we paint our hands with love.",
  },
  {
    emoji: "🪔",
    name: "Wedding",
    date: "7th July 2026",
    dayOfWeek: "Tuesday",
    time: "",
    venue: "Hotel Pauwa",
    location: "Janakinagar, Tillottama, Rupandehi",
    accent: "#C0395A",
    bg: "#FFF0F4",
    glow: "rgba(192,57,90,0.1)",
    description: "The sacred ceremony where two souls unite, witnessed by family and blessings.",
    featured: true,
  },
  {
    emoji: "🥂",
    name: "Reception",
    date: "8th July 2026",
    dayOfWeek: "Wednesday",
    time: "5:00 PM onwards",
    venue: "Butwal Chamber of Commerce & Industry Hall",
    location: "Rupandehi",
    accent: "#8B6914",
    bg: "#FDF8EC",
    glow: "rgba(184,135,28,0.1)",
    description: "An elegant evening of celebration, music and memories with our loved ones.",
  },
];

function EventCard({ event, index }: { event: (typeof EVENTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        flex: "1 1 280px",
        maxWidth: "360px",
        background: event.bg,
        border: `1.5px solid ${event.accent}33`,
        borderRadius: "20px",
        padding: "36px 28px",
        boxShadow: event.featured
          ? `0 8px 40px ${event.glow}, 0 0 0 1px ${event.accent}22`
          : `0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px ${event.accent}15`,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >

      {/* Corner tint */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100px",
          height: "100px",
          borderRadius: "0 0 100% 0",
          background: `radial-gradient(circle at top left, ${event.glow}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ fontSize: "40px", marginBottom: "16px" }}>{event.emoji}</div>

      <h3
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "48px",
          color: event.accent,
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        {event.name}
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "17px",
            color: "#2C1218",
            letterSpacing: "0.5px",
          }}
        >
          {event.date}
        </p>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: event.accent,
            opacity: 0.85,
          }}
        >
          {event.dayOfWeek}{event.time ? ` · ${event.time}` : ""}
        </p>
      </div>

      <div
        style={{
          height: "1px",
          background: `linear-gradient(to right, ${event.accent}55, transparent)`,
          marginBottom: "20px",
        }}
      />

      <div style={{ marginBottom: "16px" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "15px",
            color: "#2C1218",
            marginBottom: "2px",
          }}
        >
          📍 {event.venue}
        </p>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "12px",
            color: "rgba(44,18,24,0.5)",
            lineHeight: 1.5,
          }}
        >
          {event.location}
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px",
          lineHeight: 1.75,
          color: "rgba(44,18,24,0.6)",
          fontStyle: "italic",
        }}
      >
        {event.description}
      </p>
    </motion.div>
  );
}

export function WeddingDetailsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="details"
      style={{
        background: "linear-gradient(180deg, #FFF5F8 0%, #FFF8F2 50%, #FFF5F8 100%)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle blush tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 45% 30% at 5% 50%, rgba(192,57,90,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 45% 30% at 95% 50%, rgba(184,135,28,0.05) 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "70px" }}>
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
          Mark your calendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "72px",
            color: "#6B1A2A",
            lineHeight: 1,
          }}
        >
          Celebrations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "16px",
            color: "rgba(44,18,24,0.5)",
            marginTop: "8px",
          }}
        >
          Three days of love, joy and togetherness
        </motion.p>
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

      {/* Event cards */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "28px",
          justifyContent: "center",
        }}
      >
        {EVENTS.map((event, i) => (
          <EventCard key={event.name} event={event} index={i} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "70px" }}>
        <span style={{ color: "rgba(184,135,28,0.35)", fontSize: "24px" }}>✦ ✦ ✦</span>
      </div>
    </section>
  );
}
