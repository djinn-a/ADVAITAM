import { MapPin, Navigation, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

interface LocationSectionProps {
  heading?: string;
  description?: string;
  lat?: number;
  lon?: number;
  googleMapsUrl?: string;
  imageUrl?: string;
}

export function LocationSection({
  heading = "Find Your Sanctuary",
  description = "Nestled in the heart of Jim Corbett National Park, Advaitam offers an exclusive retreat surrounded by ancient forests and pristine wilderness.",
  lat = 29.6426,
  lon = 78.9286,
  googleMapsUrl = "https://maps.google.com/?q=Jim+Corbett+National+Park",
}: LocationSectionProps) {
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.0!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908a0e7c!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1`;

  const handleGetDirections = () => {
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <AnimatedSection direction="up" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-background text-primary text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>Location</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map */}
          <AnimatedSection
            direction="left"
            delay={0.1}
            className="lg:col-span-3"
          >
            <div className="relative rounded-xl overflow-hidden border border-border shadow-lg bg-card aspect-video">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
                className="absolute inset-0"
              />
              {/* Overlay with CTA */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <Button
                  onClick={handleGetDirections}
                  className="bg-background/95 hover:bg-background text-foreground shadow-lg backdrop-blur-sm"
                  size="sm"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Info Cards */}
          <AnimatedSection
            direction="right"
            delay={0.2}
            className="lg:col-span-2 space-y-4"
          >
            <div className="p-5 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Travel Time</h3>
                  <p className="text-2xl font-bold">~5 Hours</p>
                  <p className="text-sm text-muted-foreground">
                    from Delhi NCR by road
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Coordinates</h3>
                  <p className="text-lg font-mono">
                    {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Jim Corbett, Uttarakhand
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Route className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Nearby</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Corbett Falls — 10 min</li>
                    <li>• Kainchi Dham — 30 min</li>
                    <li>• Ramnagar Town — 15 min</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
