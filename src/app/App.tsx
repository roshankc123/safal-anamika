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

export default function App() {
  useEffect(() => {
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
      <BackgroundMusic />
      <CustomCursor />
      <FloatingPetals />
      <main>
        <HeroSection />
        <OurStorySection />
        <WeddingDetailsSection />
        <MeetTheCoupleSection />
        <RSVPSection />
        <FooterSection />
      </main>
    </div>
  );
}
