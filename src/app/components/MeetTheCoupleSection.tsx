import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import bride1 from "../../imports/bride_1.jpg";
import bride2 from "../../imports/bride_2.jpg";
import groom1 from "../../imports/groom_1.png";
import groom2 from "../../imports/groom_2.jpg";
import groom3 from "../../imports/groom_3.jpg";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

function Portrait({
  src,
  alt,
  delay,
  rotate,
  size = "medium",
}: {
  src: string;
  alt: string;
  delay: number;
  rotate: number;
  size?: "small" | "medium" | "large";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const dims = size === "large" ? 260 : size === "medium" ? 200 : 160;
  const radius = dims / 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: rotate - 5 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 20 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: dims,
        height: dims * 1.25,
        borderRadius: `${radius}px ${radius}px 0 0`,
        overflow: "hidden",
        border: "2px solid rgba(184,135,28,0.4)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(184,135,28,0.1)",
        flexShrink: 0,
        cursor: "pointer",
        background: "#FAF5EF",
      }}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          transition: "transform 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 65%, rgba(139,69,19,0.15) 100%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

export function MeetTheCoupleSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const comingSoonRef = useRef<HTMLDivElement>(null);
  const comingSoonInView = useInView(comingSoonRef, { once: true });
  const isMobile = useIsMobile();

  return (
    <section
      id="couple"
      style={{
        background: "linear-gradient(180deg, #FFF8F2 0%, #FDF5EF 100%)",
        padding: isMobile ? "60px 16px" : "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle blush radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,90,0.04) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "64px" }}>
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
          The happy couple
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: isMobile ? "42px" : "72px",
            color: "#6B1A2A",
            lineHeight: 1,
          }}
        >
          Meet the Couple
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            height: "1px",
            width: isMobile ? "120px" : "180px",
            margin: "16px auto 0",
            background: "linear-gradient(to right, transparent, #B8871C, transparent)",
          }}
        />
      </div>

      {/* Bride block */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 80px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: isMobile ? "36px" : "52px",
            color: "#C0395A",
            textAlign: "center",
            marginBottom: isMobile ? "24px" : "32px",
          }}
        >
          Anamika
        </motion.p>
        <div
          style={{
            display: "flex",
            gap: isMobile ? "20px" : "32px",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Portrait src={bride1} alt="Bride in orange saree" delay={0} rotate={-4} size={isMobile ? "medium" : "large"} />
          <Portrait src={bride2} alt="Bride portrait" delay={0.15} rotate={3} size="small" />
        </div>
      </div>

      {/* Heart divider */}
      <div style={{ textAlign: "center", margin: "0 0 80px" }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontSize: isMobile ? "36px" : "48px",
            display: "inline-block",
            filter: "drop-shadow(0 4px 12px rgba(192,57,90,0.25))",
          }}
        >
          ♥
        </motion.span>
      </div>

      {/* Groom block */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 80px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: isMobile ? "36px" : "52px",
            color: "#8B4513",
            textAlign: "center",
            marginBottom: isMobile ? "24px" : "32px",
          }}
        >
          Safal
        </motion.p>
        <div
          style={{
            display: "flex",
            gap: isMobile ? "16px" : "28px",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Portrait src={groom2} alt="Groom portrait" delay={0} rotate={-3} size={isMobile ? "small" : "medium"} />
          <Portrait src={groom1} alt="Groom full body" delay={0.12} rotate={1} size={isMobile ? "medium" : "large"} />
          <Portrait src={groom3} alt="Groom pose" delay={0.24} rotate={4} size={isMobile ? "small" : "medium"} />
        </div>
      </div>

      {/* Coming soon banner */}
      <motion.div
        ref={comingSoonRef}
        initial={{ opacity: 0, y: 40 }}
        animate={comingSoonInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          background: "#fff",
          border: "1.5px solid rgba(184,135,28,0.25)",
          borderRadius: "20px",
          padding: isMobile ? "28px 20px" : "40px 32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>📸</div>
        <h3
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: isMobile ? "32px" : "40px",
            color: "#6B1A2A",
            marginBottom: "10px",
          }}
        >
          Wedding Photos
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: isMobile ? "15px" : "16px",
            color: "rgba(44,18,24,0.6)",
            lineHeight: 1.8,
          }}
        >
          Photos from our special days will live here forever.
          <br />
          Check back after 8th July 2026 ♥
        </p>
      </motion.div>
    </section>
  );
}
