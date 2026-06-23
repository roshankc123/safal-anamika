import { useEffect } from "react";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { FloatingPetals } from "./components/FloatingPetals";
import { HeroSection } from "./components/HeroSection";
import { OurStorySection } from "./components/OurStorySection";
import { WeddingDetailsSection } from "./components/WeddingDetailsSection";
import { MeetTheCoupleSection } from "./components/MeetTheCoupleSection";
import { RSVPSection } from "./components/RSVPSection";
import { FooterSection } from "./components/FooterSection";
import { SectionDivider } from "./components/SectionDivider";
import { useIpCountry } from "./hooks/useIpCountry";
import laVieSong from "../imports/La_Vie_en_rose_-_E_dith_Piaf.mp3";
import cantHelpSong from "../imports/cant_help_falling_in_love_cut.mp3";
import timroAakhaSong from "../imports/timro_aakha_cut.mp3";

const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const TIMRO_AAKHA = { title: "Timro Aakha", artist: "Nepali", src: timroAakhaSong };
const LA_VIE = { title: "La Vie en Rose", artist: "Édith Piaf", src: laVieSong };
const CANT_HELP = { title: "Can't Help Falling in Love", artist: "Elvis Presley", src: cantHelpSong };

export default function App() {
  const { bucket, countryCode, loading } = useIpCountry();
  const songs = bucket === "nepal"
    ? [TIMRO_AAKHA, LA_VIE, CANT_HELP]
    : [LA_VIE, CANT_HELP, TIMRO_AAKHA];

  useEffect(() => {
    if (isTouchDevice) return;
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
      document.documentElement.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      <LoadingScreen />
      {!loading && <BackgroundMusic key={bucket} songs={songs} />}
      <CustomCursor />
      <FloatingPetals />
      <main>
        <HeroSection />
        <SectionDivider from="#FFF5F8" to="#FFF8F2" />
        <OurStorySection />
        <SectionDivider from="#FFF8F2" to="#FFF5F8" />
        <WeddingDetailsSection />
        <SectionDivider from="#FFF5F8" to="#FFF8F2" />
        <MeetTheCoupleSection />
        <SectionDivider from="#FDF5EF" to="#FFF8F2" />
        <RSVPSection
          locationBucket={bucket}
          countryCode={countryCode}
        />
        <SectionDivider from="#FDF5EE" to="#3D1020" />
        <FooterSection />
      </main>
    </div>
  );
}
