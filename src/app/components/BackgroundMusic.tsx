import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import audioSrc from "../../imports/La_Vie_en_rose_-_E_dith_Piaf.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    // Attempt autoplay; browsers may block it until user interaction
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {/* Floating music button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9990,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1.5px solid rgba(184,135,28,0.45)",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {/* Vinyl / note icon */}
        {playing ? (
          <motion.span
            key="playing"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: "22px", display: "inline-block" }}
          >
            🎵
          </motion.span>
        ) : (
          <motion.span
            key="paused"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: "20px" }}
          >
            🔇
          </motion.span>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              position: "fixed",
              bottom: "36px",
              right: "86px",
              zIndex: 9989,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(184,135,28,0.25)",
              borderRadius: "10px",
              padding: "6px 14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              whiteSpace: "nowrap",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "13px", color: "#6B1A2A", margin: 0 }}>
              La Vie en Rose · Édith Piaf
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
