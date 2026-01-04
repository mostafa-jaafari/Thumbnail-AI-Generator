import ContactSales from "@/components/ContactSales";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LastCTA from "@/components/LastCTA";
import PricingPlans from "@/components/PricingPlans";
import TestimonialMarquee from "@/components/Testimonials";
import TiltPreview from "@/components/TiltPreview";
import WhyChooseAs from "@/components/WhyChooseAs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-start gap-12"
    >
      <Header />
      <HeroSection />
      <TiltPreview />
      <WhyChooseAs />
      <div
        className="relative z-1 my-12 md:my-24 w-full lg:px-36 md:px-6 px-3 flex md:flex-row flex-col items-start gap-6 md:gap-12"
      >
        <div className="absolute left-1/3 h-0 w-120 h-120 rounded-full blur-3xl opacity-20 bg-pink-700"/>
        <div
          className="relative flex-shrink-0 rounded-2xl shadow-xl shadow-pink-700/10 border border-pink-700 min-w-[200px] max-w-[600px] w-full h-120"
        >
          <Image
            src="/features-showcase-1.png"
            alt=""
            fill
            loading="lazy"
            className="object-cover rounded-2xl"
          />
        </div>

        <div
          className="w-full"
        >
          <div
            className="relative w-full h-80 rounded-2xl shadow-xl shadow-pink-700/10 border border-pink-700"
          >
            <Image
              src="/features-showcase-2.png"
              alt="features-showcase-1.png"
              className="object-cover rounded-2xl"
              fill
              loading="lazy"
            />
          </div>

          <div
            className="space-y-2 mt-6"
          >
            <h1
              className="text-white text-xl font-bold"
            >
              Boost your views with AI-optimized designs
            </h1>
            <p
              className="text-sm"
            >
              Stop guessing and start ranking. Our AI creates designs proven to capture attention.
            </p>

            <Link
              href="/"
              className="text-pink-700 hover:text-pink-700/90 flex items-center gap-1.5"
            >
              Start generating free <ArrowRight size={20} className="-rotate-45"/>
            </Link>
          </div>
        </div>
      </div>
      <TestimonialMarquee />
      <PricingPlans />
      <ContactSales />
      <LastCTA />
      <Footer />
    </main>
  );
}
