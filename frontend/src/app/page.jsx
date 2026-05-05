import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Generations from "@/components/Generations";
import Benefits from "@/components/Benefits";
import Promise from "@/components/Promise";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import AppointmentForm from "@/components/AppointmentForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Generations />
      <Benefits />
      <Promise />
      <WhyChoose />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <AppointmentForm />
      <CTA />
      <Footer />
      <StickyCTA />
    </>
  );
}
