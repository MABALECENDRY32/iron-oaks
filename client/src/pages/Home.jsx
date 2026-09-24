import Hero from "../components/sections/Hero";
import ServicesPreview from "../components/sections/ServicesPreview";
import Barbers from "../components/sections/Barbers";
import Testimonials from "../components/sections/Testimonials";
import LocationHours from "../components/sections/LocationHours";
import CtaBand from "../components/sections/CtaBand";
import WelcomeOffer from "../components/sections/WelcomeOffer";

export default function Home() {
  return (
    <>
      <WelcomeOffer />
      <Hero />
      <ServicesPreview />
      <Barbers />
      <Testimonials />
      <LocationHours />
      <CtaBand />
    </>
  );
}