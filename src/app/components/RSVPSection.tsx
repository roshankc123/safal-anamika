import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

interface RSVPForm {
  name: string;
  phone: string;
  attendance: "yes" | "no";
  event: string;
  guests: string;
  message: string;
}

function fireConfetti() {
  const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 9999 };
  const colors = ["#B8871C", "#C0395A", "#E8B4C0", "#8B4513", "#FAF5EF"];
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.3, y: 0.6 }, colors });
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.7, y: 0.6 }, colors });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.5 }, colors });
  }, 300);
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export function RSVPSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RSVPForm>({ defaultValues: { attendance: "yes", guests: "1" } });

  const attendanceVal = watch("attendance");

  const onSubmit = async (data: RSVPForm) => {
    setSendError(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: data.name,
          phone: data.phone || "—",
          attendance: data.attendance,
          attendance_label: data.attendance === "yes" ? "✓ Attending" : "✗ Not Attending",
          event: data.event || "all",
          guests: data.guests || "1",
          message: data.message || "(no message)",
        },
        PUBLIC_KEY
      );
      setSubmitted(true);
      if (data.attendance === "yes") fireConfetti();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError("Something went wrong. Please try again or contact us directly.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: "1.5px solid rgba(184,135,28,0.28)",
    borderRadius: "10px",
    padding: "12px 16px",
    fontFamily: "'Lato', sans-serif",
    fontSize: "14px",
    color: "#2C1218",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(107,26,42,0.65)",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <section
      id="rsvp"
      style={{
        background: "linear-gradient(180deg, #FFF8F2 0%, #FDF5EE 100%)",
        padding: isMobile ? "60px 16px" : "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(192,57,90,0.04) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
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
          Will you join us?
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
          RSVP
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

      {/* Personal note from the couple */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        style={{
          maxWidth: "480px",
          margin: "0 auto " + (isMobile ? "28px" : "40px"),
          textAlign: "center",
          padding: "0 8px",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: isMobile ? "15px" : "17px",
            color: "rgba(44,18,24,0.7)",
            lineHeight: 1.8,
            margin: "0 0 12px",
          }}
        >
          "We've been counting the days, and our hearts are full knowing
          we'll be surrounded by the people we love most. Bring your
          appetite for daal bhat and your best dance moves — it's going
          to be a celebration to remember."
        </p>
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "22px",
            color: "#6B1A2A",
            margin: 0,
            lineHeight: 1,
          }}
        >
          — Safal &amp; Anamika
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          background: "#fff",
          border: "1.5px solid rgba(184,135,28,0.2)",
          borderRadius: "24px",
          padding: isMobile ? "28px 20px" : "48px 40px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100px",
            height: "100px",
            background: "radial-gradient(circle at top right, rgba(184,135,28,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "20px 0" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
                style={{ fontSize: isMobile ? "48px" : "64px", marginBottom: "16px" }}
              >
                {attendanceVal === "yes" ? "🎉" : "💌"}
              </motion.div>
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: isMobile ? "36px" : "48px",
                  color: "#6B1A2A",
                  marginBottom: "12px",
                }}
              >
                {attendanceVal === "yes" ? "See you there!" : "We'll miss you!"}
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: "rgba(44,18,24,0.6)",
                  lineHeight: 1.8,
                }}
              >
                {attendanceVal === "yes"
                  ? "Thank you for your RSVP. We can't wait to celebrate with you! ♥"
                  : "Thank you for letting us know. Your love and wishes mean the world to us."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: isMobile ? "16px" : "24px" }}
            >
              {/* Name */}
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full name"
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? "#C0395A" : "rgba(184,135,28,0.28)",
                  }}
                />
                {errors.name && (
                  <p style={{ color: "#C0395A", fontSize: "12px", marginTop: "4px" }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input {...register("phone")} placeholder="Your contact number" style={inputStyle} />
              </div>

              {/* Attendance */}
              <div>
                <label style={labelStyle}>Will you attend? *</label>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "8px" : "12px" }}>
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setValue("attendance", val)}
                      style={{
                        flex: 1,
                        padding: isMobile ? "14px 12px" : "12px",
                        borderRadius: "10px",
                        border: `1.5px solid ${attendanceVal === val ? "#B8871C" : "rgba(184,135,28,0.25)"}`,
                        background: attendanceVal === val ? "rgba(184,135,28,0.08)" : "#fff",
                        color: attendanceVal === val ? "#8B6914" : "rgba(44,18,24,0.45)",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: isMobile ? "12px" : "13px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {val === "yes" ? "✓ Yes, I'll be there!" : "✗ Regretfully, No"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event */}
              <div>
                <label style={labelStyle}>Which events will you attend?</label>
                <select
                  {...register("event")}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B6914' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                  }}
                >
                  <option value="all">All three days (1, 2 &amp; 3 July)</option>
                  <option value="mehendi">Mehendi only (1 July)</option>
                  <option value="wedding">Wedding only (2 July)</option>
                  <option value="reception">Reception only (3 July)</option>
                  <option value="wedding+reception">Wedding &amp; Reception (2 &amp; 3 July)</option>
                </select>
              </div>

              {/* Guests */}
              <div>
                <label style={labelStyle}>Number of guests (including yourself)</label>
                <input
                  {...register("guests")}
                  type="number"
                  min="1"
                  max="10"
                  placeholder="1"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>A message for us (optional)</label>
                <textarea
                  {...register("message")}
                  placeholder="Share your wishes or blessings..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: isSubmitting
                    ? "rgba(184,135,28,0.5)"
                    : "linear-gradient(135deg, #B8871C, #C0395A)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  cursor: isSubmitting ? "wait" : "pointer",
                  boxShadow: "0 4px 20px rgba(192,57,90,0.25)",
                  transition: "background 0.2s",
                }}
              >
                {isSubmitting ? "Sending..." : "Send RSVP ♥"}
              </motion.button>

              {/* Error message */}
              {sendError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "13px",
                    color: "#C0395A",
                    textAlign: "center",
                    marginTop: "-8px",
                    padding: "10px 16px",
                    background: "rgba(192,57,90,0.07)",
                    borderRadius: "8px",
                    border: "1px solid rgba(192,57,90,0.2)",
                  }}
                >
                  {sendError}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
