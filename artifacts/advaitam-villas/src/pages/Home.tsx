import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedFeatureList } from "@/components/ui/animated-feature-list";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  MapPin,
  Trees,
  Home as HomeIcon,
  Bath,
  CheckCircle2,
  ChevronRight,
  X,
  Download,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useCreateLead, useGetSiteSettings } from "@workspace/api-client-react";

export default function Home() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [hasCreatedLead, setHasCreatedLead] = useState(() => {
    return localStorage.getItem("advaitam_lead_created") === "true";
  });
  const { data: settings } = useGetSiteSettings();

  const initialAvailability = settings?.current_availability
    ? parseInt(settings.current_availability, 10)
    : 9;

  const [villaCount, setVillaCount] = useState(17);
  const countRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const createLead = useCreateLead();

  // Derived values from settings
  const whatsappNumber = settings?.whatsapp_phone || "919217567788";
  const contactEmail = settings?.contact_email || "info@advaitamvillas.com";
  const discountPricing = settings?.discount_pricing || "15";
  const discountExitIntent = settings?.discount_exit_intent || "15L";
  const offerPrice = (
    1.5 -
    parseInt(discountPricing || "15", 10) / 100
  ).toFixed(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      const leadCreated =
        localStorage.getItem("advaitam_lead_created") === "true";
      console.log("[Exit Intent] Mouse leave triggered:", {
        clientY: e.clientY,
        hasShownExitIntent,
        leadCreated,
      });
      if (e.clientY <= 0 && !hasShownExitIntent && !leadCreated) {
        console.log("[Exit Intent] Showing popup");
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      } else {
        console.log(
          "[Exit Intent] Not showing popup - lead created:",
          leadCreated,
          "or already shown:",
          hasShownExitIntent,
        );
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitIntent]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVillaCount(initialAvailability);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let count = 17;
        const interval = setInterval(() => {
          count--;
          setVillaCount(count);
          if (count === initialAvailability) clearInterval(interval);
        }, 150);
        observer.disconnect();
      }
    });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion, initialAvailability]);

  const handleBrochureSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    createLead.mutate(
      {
        data: { name, phone, email, source: "brochure" },
      },
      {
        onSuccess: () => {
          console.log("[Lead Created] Brochure form submitted successfully");
          setHasCreatedLead(true);
          localStorage.setItem("advaitam_lead_created", "true");
          console.log(
            "[Lead Created] localStorage set:",
            localStorage.getItem("advaitam_lead_created"),
          );
          setShowExitIntent(false);
          toast({
            title: "Thank you!",
            description: "We'll reach out to you shortly.",
          });
          (e.target as HTMLFormElement).reset();
        },
        onError: (error) => {
          console.log("[Lead Error] Failed to create lead:", error);
          toast({
            title: "Submission failed",
            description:
              error.message || "There was an error submitting your request.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleExitIntentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;

    createLead.mutate(
      {
        data: { name: "Exit Intent Visitor", phone, source: "exit-popup" },
      },
      {
        onSuccess: () => {
          setHasCreatedLead(true);
          localStorage.setItem("advaitam_lead_created", "true");
          setShowExitIntent(false);
          toast({
            title: "Thank you!",
            description: "We'll reach out to you shortly.",
          });
        },
        onError: (error) => {
          console.log("[Lead Error] Failed to create lead:", error);
          toast({
            title: "Submission failed",
            description:
              error.message || "There was an error submitting your request.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <main id="main-content">
        {/* Sticky Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"}`}
        >
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trees className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-wide">
                ADVAITAM
              </span>
            </div>
            <Button
              onClick={scrollToContact}
              className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Get Brochure
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="relative min-h-dvh flex items-center pt-20"
          aria-labelledby="hero-title"
        >
          <div className="hero-bg-animate absolute inset-0 z-0">
            <img
              src="/hero-bg.png"
              alt="Aerial view of luxury forest villa with private swimming pool surrounded by lush green trees in Jim Corbett"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm text-primary text-sm font-medium tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Limited Inventory • High ROI Potential
              </div>

              <h1
                id="hero-title"
                className="text-5xl md:text-7xl font-serif font-bold leading-tight"
              >
                Own a Private Forest Villa in{" "}
                <span className="text-gradient">Jim Corbett</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Only 17 Ultra-Luxury Villas with Private Pool, Rooftop Garden &
                Airbnb Income Potential — Just 5 Hours from Delhi NCR.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                >
                  Get Brochure <Download className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="text-lg h-14 px-8 border-primary/30 hover:bg-primary/10"
                >
                  Book Site Visit <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground pt-4 flex items-center gap-2">
                Starting ₹1.35 Cr{" "}
                <span className="text-xs px-2 py-0.5 bg-secondary rounded-sm">
                  Premium Gated Community
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Scarcity & Features */}
        <AnimatedSection
          direction="fade"
          className="py-24 bg-secondary/30 relative"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection
                direction="right"
                delay={0.2}
                className="space-y-8"
              >
                <h2 className="text-4xl font-serif font-bold">
                  The Definition of{" "}
                  <span className="text-primary italic">Exclusive</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Advaitam is not a resort. It is a private sanctuary. Designed
                  for those who seek the silence of the deep woods without
                  compromising on uncompromising luxury.
                </p>

                <AnimatedFeatureList
                  items={[
                    "Private Swimming Pool in Every Villa",
                    "Rooftop Garden Terrace",
                    "2070 Sq. Ft. Built-Up Area",
                    "Premium Finishes & Modular Kitchen",
                  ]}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6"
                  staggerDelay={0.08}
                />
              </AnimatedSection>

              <AnimatedSection
                direction="left"
                delay={0.2}
                className="relative"
              >
                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                  <img
                    src="/villa-exterior.png"
                    alt="Luxury villa exterior with private swimming pool and landscaped gardens at sunset"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                </div>
                <div
                  ref={countRef}
                  className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-xl shadow-2xl"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    Current Availability
                  </p>
                  <p className="text-5xl font-serif font-bold text-primary flex items-baseline gap-2">
                    <span aria-label={`${villaCount} villas available`}>
                      {villaCount}
                    </span>{" "}
                    <span className="text-lg font-sans text-foreground font-normal">
                      of 17 Left
                    </span>
                  </p>
                  <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(villaCount / 17) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Immersion / Interior */}
        <AnimatedSection direction="fade" className="py-32 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection
                direction="right"
                delay={0.3}
                className="order-2 lg:order-1 relative h-[600px] rounded-2xl overflow-hidden"
              >
                <img
                  src="/villa-interior.png"
                  alt="Spacious villa interior with floor-to-ceiling windows overlooking forest and mountains"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="800"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </AnimatedSection>

              <AnimatedSection
                direction="left"
                delay={0.2}
                className="order-1 lg:order-2 space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold">
                  Where the Forest <br />
                  Meets the Firelight
                </h2>
                <p className="text-xl text-muted-foreground">
                  Floor-to-ceiling glass erases the boundary between your living
                  room and the ancient woods. Every material—from rich timber to
                  raw stone—has been chosen to ground you in nature while
                  enveloping you in warmth.
                </p>

                <AnimatedSection
                  direction="up"
                  delay={0.4}
                  className="p-6 bg-secondary/50 rounded-xl border border-border/50 backdrop-blur-sm"
                >
                  <h3 className="font-serif text-2xl mb-4 text-primary">
                    Location Advantages
                  </h3>
                  <AnimatedFeatureList
                    items={[
                      "~5 Hours Drive from Delhi NCR",
                      "10 Minutes from Corbett Falls",
                      "30 Minutes from Kainchi Dham",
                    ]}
                    staggerDelay={0.1}
                  />
                  <p className="mt-6 text-sm font-medium italic text-muted-foreground">
                    "Close enough for convenience. Far enough for peace."
                  </p>
                </AnimatedSection>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Rooftop / Investment */}
        <AnimatedSection
          direction="fade"
          className="py-24 bg-card border-y border-border"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <AnimatedSection
                direction="right"
                delay={0.2}
                className="flex-1 space-y-6"
              >
                <h2 className="text-4xl font-serif font-bold">
                  A Legacy Investment
                </h2>
                <p className="text-lg text-muted-foreground">
                  Beyond a weekend escape, Advaitam is a high-yield asset. With
                  professional property management, your villa works for you
                  when you're not there.
                </p>
                <AnimatedFeatureList
                  items={[
                    "10–15% Expected Appreciation",
                    "High Demand for Luxury Airbnb Stays",
                    "Hassle-Free Professional Management",
                  ]}
                  staggerDelay={0.08}
                />
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Get Rental Income Projection
                </Button>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.2} className="flex-1">
                <img
                  src="/rooftop-terrace.png"
                  alt="Rooftop terrace garden with panoramic views of Jim Corbett forest and mountains"
                  className="w-full h-auto rounded-2xl shadow-xl"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing & Form */}
        <section id="contact" className="py-32 relative">
          <div className="absolute inset-0 bg-background pointer-events-none"></div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl">
            <AnimatedSection
              direction="fade"
              delay={0.15}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl"
            >
              <AnimatedSection
                direction="right"
                delay={0.2}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    Claim Your Sanctuary
                  </h2>
                  <p className="text-muted-foreground">
                    Only 17 Villas. Once Sold, Gone Forever.
                  </p>
                </div>

                <div className="space-y-4 bg-secondary/50 p-6 rounded-xl">
                  <div className="flex justify-between items-center text-muted-foreground line-through">
                    <span>Base Price</span>
                    <span>₹1.50 Cr</span>
                  </div>
                  <div className="flex justify-between items-center text-primary font-medium">
                    <span>Special Discount</span>
                    <span>- ₹{discountPricing} Lakhs</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Offer Price</span>
                    <span>₹{offerPrice} Cr</span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    *Applicable on Limited Villas Only
                  </p>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" /> +{whatsappNumber.slice(0, 2)}{" "}
                    {whatsappNumber.slice(2, 7)} {whatsappNumber.slice(7)}
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4" /> {contactEmail}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" /> Site: Jim Corbett,
                    Uttarakhand | Corp: Noida
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection
                direction="left"
                delay={0.25}
                className="bg-background p-8 rounded-2xl border border-border"
              >
                <h3 className="text-xl font-bold mb-6">
                  Download Full Brochure & Floor Plans
                </h3>
                <form onSubmit={handleBrochureSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      required
                      name="name"
                      placeholder="John Doe"
                      className="bg-card border-border h-12"
                      disabled={createLead.isPending}
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      required
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      className="bg-card border-border h-12"
                      disabled={createLead.isPending}
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-card border-border h-12"
                      disabled={createLead.isPending}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={createLead.isPending}
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {createLead.isPending
                      ? "Submitting..."
                      : "Download Brochure"}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-green-600 text-green-500 hover:bg-green-600/10 hover:text-green-400"
                    onClick={() =>
                      window.open(`https://wa.me/${whatsappNumber}`, "_blank")
                    }
                  >
                    <MessageCircle className="mr-2 w-5 h-5" /> Talk to Advisor
                    on WhatsApp
                  </Button>
                </form>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background py-12 border-t border-border text-center text-muted-foreground">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6 text-foreground">
              <Trees className="w-6 h-6 text-primary" />
              <span className="font-serif text-xl font-bold">ADVAITAM</span>
            </div>
            <p className="mb-4">Luxury Forest Villas in Jim Corbett.</p>
            <p className="text-sm opacity-50">
              © {new Date().getFullYear()} Advaitam Villas. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* Sticky WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform group ${prefersReducedMotion ? "" : "animate-bounce hover:animate-none"}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border p-8 relative animate-in zoom-in-95">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close offer popup"
            >
              <X className="w-6 h-6" />
            </button>
            <h3
              id="exit-intent-title"
              className="text-3xl font-serif font-bold mb-2"
            >
              Wait!
            </h3>
            <p className="text-xl mb-6">
              Want{" "}
              <span className="text-primary font-bold">
                ₹{discountExitIntent} Discount
              </span>{" "}
              Details?
            </p>
            <form onSubmit={handleExitIntentSubmit} className="space-y-4">
              <Input
                required
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="h-14 text-lg bg-background"
                disabled={createLead.isPending}
              />
              <Button
                type="submit"
                disabled={createLead.isPending}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {createLead.isPending ? "Submitting..." : "Unlock Offer"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
