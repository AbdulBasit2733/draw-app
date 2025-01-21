"use client"
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
      </main>
      <Footer />
    </div>
  );
}
