import { ServiceCategory } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "@/hooks/useServices";
import { SERVICE_CATEGORY_LABELS } from "@/types";
import type { Service } from "@/types";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Snowflake, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

type FilterKey = "all" | ServiceCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: ServiceCategory.ELS, label: "ELS & Lighting" },
  { key: ServiceCategory.Livery, label: "Custom Liveries" },
  { key: ServiceCategory.Graphics, label: "Graphics & Branding" },
  { key: ServiceCategory.CommunitySetup, label: "Community Setup" },
  { key: ServiceCategory.BotDevelopment, label: "Bot Development" },
];

// Fallback static data shown during loading / when backend returns empty
const STATIC_SERVICES: Service[] = [
  {
    id: 1n,
    name: "ELS Pack",
    category: ServiceCategory.ELS,
    priceUSD: 20,
    priceRobux: 100n,
    description:
      "Full ELS pack with multiple lighting patterns, optimized for Roblox roleplay servers.",
    inclusions: [
      "Sheriff configuration",
      "Police configuration",
      "State Patrol / Highway Patrol",
      "Fire Department configuration",
    ],
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Single ELS Pattern",
    category: ServiceCategory.ELS,
    priceUSD: 5,
    priceRobux: 50n,
    description:
      "One custom ELS lighting pattern for a single emergency vehicle.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Livery Pack (6 Vehicles)",
    category: ServiceCategory.Livery,
    priceUSD: 30,
    priceRobux: 800n,
    description:
      "Six high-fidelity custom liveries of your choosing for your community vehicles.",
    inclusions: [
      "6 vehicles of the client's choice",
      "Unused slots may be donated to other members with credit",
    ],
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Additional Vehicle",
    category: ServiceCategory.Livery,
    priceUSD: 10,
    priceRobux: 100n,
    description: "Add one extra vehicle livery to an existing pack order.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Discord Embed",
    category: ServiceCategory.Graphics,
    priceUSD: 10,
    priceRobux: 0n,
    description:
      "Professionally designed embed for announcements, rules, or welcome messages.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Logo Design",
    category: ServiceCategory.Graphics,
    priceUSD: 5,
    priceRobux: 0n,
    description:
      "Clean, modern logo tailored to your community or brand identity.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Profile Picture (PFP)",
    category: ServiceCategory.Graphics,
    priceUSD: 7,
    priceRobux: 0n,
    description:
      "Custom illustrated or designed profile picture for your brand or persona.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Banner Design",
    category: ServiceCategory.Graphics,
    priceUSD: 20,
    priceRobux: 0n,
    description:
      "Eye-catching banner for Discord, YouTube, Twitch, or social media profiles.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Discord Server Configuration",
    category: ServiceCategory.CommunitySetup,
    priceUSD: 30,
    priceRobux: 0n,
    description:
      "Full Discord server setup including roles, channels, permissions, and bot integration.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Website Creation (Google Sites)",
    category: ServiceCategory.CommunitySetup,
    priceUSD: 50,
    priceRobux: 0n,
    description:
      "Professional Google Sites website for your community, department, or organization.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Prebuilt Bot (SCNX / Bot Ghost)",
    category: ServiceCategory.BotDevelopment,
    priceUSD: 15,
    priceRobux: 0n,
    description:
      "Pre-configured Discord bot using SCNX or Bot Ghost platform for your server.",
    inclusions: [],
    isAvailable: true,
  },
  {
    id: 12n,
    name: "Custom Discord Bot",
    category: ServiceCategory.BotDevelopment,
    priceUSD: 40,
    priceRobux: 0n,
    description:
      "Fully coded, personalized Discord bot built from scratch to your specifications.",
    inclusions: [
      "Starting at $40 — final pricing based on requested features and complexity",
    ],
    isAvailable: true,
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const hasRobux = service.priceRobux > 0n;
  const isStartingAt =
    service.id === 12n ||
    service.name.toLowerCase().includes("custom discord bot");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
    >
      <Card className="flex flex-col h-full border-border/60 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-smooth group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-1">
                {SERVICE_CATEGORY_LABELS[service.category]}
              </p>
              <h3 className="text-base font-semibold font-display text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                {service.name}
              </h3>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-1.5">
              <span className="text-xl font-bold font-display text-foreground">
                {isStartingAt ? "From " : ""}
                <span className="text-primary">${service.priceUSD}</span>
              </span>
              {hasRobux && (
                <Badge
                  variant="outline"
                  className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10 font-mono whitespace-nowrap"
                  data-ocid="services.robux_badge"
                >
                  ⬡ {service.priceRobux.toString()} Robux
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-3 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
          {service.inclusions.length > 0 && (
            <ul className="space-y-1.5">
              {service.inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/70 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Link
            to="/inquiry"
            search={{ service: service.id.toString() }}
            className="w-full"
          >
            <Button
              className="w-full"
              variant="outline"
              data-ocid={`services.request_button.${index + 1}`}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Request Service
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => i).map((i) => (
        <Card key={i} className="flex flex-col h-48 border-border/40">
          <CardHeader className="pb-3">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-3 w-full mb-1.5" />
            <Skeleton className="h-3 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const { data: backendServices, isLoading } = useServices();

  const services = useMemo(() => {
    const list =
      backendServices && backendServices.length > 0
        ? backendServices
        : STATIC_SERVICES;
    if (activeFilter === "all") return list;
    return list.filter((s) => s.category === activeFilter);
  }, [backendServices, activeFilter]);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen" data-ocid="services.page">
        {/* Hero banner */}
        <section className="bg-card border-b border-border/50 py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                Service Catalog
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold font-display text-foreground mb-3"
            >
              Our Services &amp; <span className="text-primary">Pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl"
            >
              Premium custom solutions for Roblox communities. All prices shown
              in USD — Robux pricing available where applicable.
            </motion.p>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="bg-background border-b border-border/30 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <div className="max-w-6xl mx-auto px-6">
            <div
              className="flex gap-1 overflow-x-auto py-3 scrollbar-hide"
              data-ocid="services.filter_tabs"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  data-ocid={`services.filter.${f.key}`}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth whitespace-nowrap ${
                    activeFilter === f.key
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="flex-1 bg-background py-10 px-6">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <ServicesSkeleton />
            ) : services.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-24 text-center"
                data-ocid="services.empty_state"
              >
                <Snowflake className="w-12 h-12 text-primary/30 mb-4" />
                <p className="text-muted-foreground">
                  No services in this category yet.
                </p>
              </div>
            ) : (
              <div
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                data-ocid="services.list"
              >
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id.toString()}
                    service={service}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Info notes */}
        <section className="bg-muted/30 border-t border-border/30 py-8 px-6">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">ELS Packs</span>{" "}
                include configurations for Sheriff, Police, State Patrol/Highway
                Patrol, and Fire Department.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Livery Pack</span>{" "}
                unused vehicle slots may be donated to other members with proper
                credit in the designated free channel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
