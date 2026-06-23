import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

interface Song {
  title: string;
  artist: string;
  src: string;
}

interface BackgroundMusicProps {
  songs: Song[];
}

const START_VOLUME = 0.03;
const COMFORTABLE_VOLUME = 0.28;
const VOLUME_RAMP_MS = 6000;
const VOLUME_RAMP_STEP_MS = 120;

const btnBase: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6B5B3D",
  borderRadius: "6px",
  transition: "background 0.15s",
  padding: 0,
  lineHeight: 1,
};

export function BackgroundMusic({ songs }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRampRef = useRef<number | null>(null);
  const shouldPlayOnSourceChangeRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const isMobile = useIsMobile();

  if (songs.length === 0) return null;

  const currentSong = songs[currentIndex];

  const clearVolumeRamp = () => {
    if (volumeRampRef.current !== null) {
      window.clearInterval(volumeRampRef.current);
      volumeRampRef.current = null;
    }
  };

  const startVolumeRamp = (audio: HTMLAudioElement, from: number, to: number) => {
    clearVolumeRamp();

    const safeFrom = Math.max(0, Math.min(1, from));
    const safeTo = Math.max(0, Math.min(1, to));
    const steps = Math.max(1, Math.round(VOLUME_RAMP_MS / VOLUME_RAMP_STEP_MS));
    const stepSize = (safeTo - safeFrom) / steps;

    audio.volume = safeFrom;

    let step = 0;
    volumeRampRef.current = window.setInterval(() => {
      step += 1;
      const nextVolume = safeFrom + stepSize * step;
      audio.volume = Math.max(0, Math.min(1, nextVolume));

      if (step >= steps) {
        audio.volume = safeTo;
        clearVolumeRamp();
      }
    }, VOLUME_RAMP_STEP_MS);
  };

  useEffect(() => {
    if (currentIndex >= songs.length) {
      setCurrentIndex(0);
    }
  }, [songs.length, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    shouldPlayOnSourceChangeRef.current = true;
    startVolumeRamp(audio, START_VOLUME, COMFORTABLE_VOLUME);
    audio.play().then(() => setPlaying(true)).catch(() => { });

    return () => {
      clearVolumeRamp();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentSong.src;
    audio.load();

    const shouldPlay = playing || shouldPlayOnSourceChangeRef.current;
    shouldPlayOnSourceChangeRef.current = false;

    if (shouldPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [currentIndex, currentSong.src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      clearVolumeRamp();
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setPlaying(true);
          startVolumeRamp(audio, audio.volume || START_VOLUME, COMFORTABLE_VOLUME);
        })
        .catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  };

  const next = () => {
    setCurrentIndex(prev => (prev + 1) % songs.length);
  };

  const prev = () => {
    setCurrentIndex(prev => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    shouldPlayOnSourceChangeRef.current = true;
    setCurrentIndex(index);
    setShowPlaylist(false);

    const audio = audioRef.current;
    if (audio && audio.volume < COMFORTABLE_VOLUME) {
      startVolumeRamp(audio, audio.volume || START_VOLUME, COMFORTABLE_VOLUME);
    }

    setPlaying(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="auto"
        autoPlay
        playsInline
        loop
      />

      <div style={{
        position: "fixed",
        bottom: isMobile ? "12px" : "28px",
        right: isMobile ? "12px" : "28px",
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      }}>
        {/* Playlist panel */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(20px)",
                borderRadius: "16px",
                border: "1px solid rgba(184,135,28,0.2)",
                padding: "8px",
                minWidth: isMobile ? "180px" : "220px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                overflow: "hidden",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "12px",
                color: "#8B6B15",
                margin: "4px 0 6px 10px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}>
                ♪ Now Playing
              </p>
              {songs.map((song, index) => {
                const active = index === currentIndex;
                return (
                  <button
                    key={index}
                    onClick={() => selectSong(index)}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = ""; }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      border: "none",
                      borderRadius: "10px",
                      background: active ? "rgba(184,135,28,0.1)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "background 0.15s",
                    }}
                  >
                    <span style={{
                      fontSize: "10px",
                      color: active ? "#B8871C" : "#ccc",
                      flexShrink: 0,
                      width: "14px",
                      textAlign: "center",
                    }}>
                      {active ? "▶" : "○"}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        margin: 0,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "14px",
                        color: "#2D1810",
                        fontWeight: active ? 600 : 400,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {song.title}
                      </p>
                      <p style={{
                        margin: 0,
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "10px",
                        color: "#8B7355",
                      }}>
                        {song.artist}
                      </p>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini player bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: "28px",
            border: "1.5px solid rgba(184,135,28,0.3)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
            height: "48px",
            overflow: "hidden",
          }}
        >
          {/* Play / Pause circle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            style={{
              ...btnBase,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontSize: "16px",
              flexShrink: 0,
            }}
          >
            {playing ? <span style={{ lineHeight: 1 }}>⏸</span> : <span style={{ lineHeight: 1 }}>▶</span>}
          </motion.button>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; }}
            style={{
              ...btnBase,
              fontSize: "12px",
              width: "28px",
              height: "28px",
              flexShrink: 0,
              marginLeft: 2,
            }}
            aria-label={muted ? "Unmute" : "Mute"}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; }}
            style={{
              ...btnBase,
              fontSize: "12px",
              width: "28px",
              height: "28px",
              flexShrink: 0,
              marginLeft: 2,
            }}
          >
            ⏮
          </button>

          {/* Song info — click to open playlist */}
          <button
            onClick={() => setShowPlaylist(prev => !prev)}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; }}
            style={{
              ...btnBase,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0,
              padding: "0 10px",
              borderRadius: "8px",
              minWidth: 0,
              maxWidth: isMobile ? "80px" : "160px",
            }}
          >
            <p style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              color: "#2D1810",
              fontStyle: "italic",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}>
              {currentSong.title}
            </p>
            <p style={{
              margin: 0,
              fontFamily: "'Lato', sans-serif",
              fontSize: "9px",
              color: "#8B7355",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}>
              {currentSong.artist}
            </p>
          </button>

          {/* Next */}
          <button
            onClick={next}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; }}
            style={{
              ...btnBase,
              fontSize: "12px",
              width: "28px",
              height: "28px",
              flexShrink: 0,
              marginRight: 6,
            }}
          >
            ⏭
          </button>
        </motion.div>
      </div>
    </>
  );
}
