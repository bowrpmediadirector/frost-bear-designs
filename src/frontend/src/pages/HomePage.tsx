import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_CATEGORY_LABELS } from "@/types";
import {
  Bot,
  Coins,
  Cpu,
  ExternalLink,
  FlameKindling,
  Gauge,
  Globe,
  Layers,
  MessageSquare,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { ElementType } from "react";

const DISCORD_URL = "https://discord.gg/frostandbear";

const categoryIcons: Record<string, ElementType> = {
  ELS: FlameKindling,
  Livery: Layers,
  Graphics: Palette,
  CommunitySetup: Server,
  BotDevelopment: Bot,
};

const categoryDescriptions: Record<string, string> = {
  ELS: "Premium ELS packs and single patterns for Sheriff, Police, State Patrol, and Fire Department vehicles.",
  Livery:
    "Custom vehicle liveries with full packs or individual additions, tailored to your community.",
  Graphics:
    "Professional embeds, logos, profile pictures, and banners for your brand identity.",
  CommunitySetup:
    "Complete Discord server configuration and Google Sites website creation.",
  BotDevelopment:
    "From prebuilt bots to fully coded custom Discord bots with personalized features.",
};

const popularPricing = [
  {
    name: "ELS Pack",
    description:
      "Full configurations for Sheriff, Police, State Patrol & Fire.",
    usd: "$20",
    robux: "100 Robux",
    icon: FlameKindling,
    badge: "Most Popular",
  },
  {
    name: "Livery Pack",
    description: "Six custom vehicles of your choice, fully designed.",
    usd: "$30",
    robux: "800 Robux",
    icon: Layers,
    badge: "Best Value",
  },
  {
    name: "Custom Discord Bot",
    description:
      "Fully coded and personalized bot with your requested features.",
    usd: "From $40",
    robux: "On request",
    icon: Bot,
    badge: "Premium",
  },
  {
    name: "Custom Livery",
    description: "Single vehicle livery designed to your exact specifications.",
    usd: "$10",
    robux: "100 Robux",
    icon: Cpu,
    badge: "Quick",
  },
];

const whyChooseUs = [
  {
    icon: Star,
    title: "Professional Quality",
    description:
      "Every deliverable meets studio-grade standards — no shortcuts, no compromises.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "We respect your time. Projects are delivered efficiently without sacrificing quality.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description:
      "Built by community members for communities — we understand what your players need.",
  },
  {
    icon: Gauge,
    title: "Competitive Pricing",
    description:
      "Transparent dual USD and Robux pricing so everyone in your community can participate.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden"
        data-ocid="home.hero.section"
      >
        {/* Frost hero background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/frost-hero-bg.dim_1920x800.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Decorative frost rings */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-primary/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full border border-primary/5" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-primary/15" />
          {/* Snowflake accent top-left */}
          <Sparkles className="absolute left-16 top-24 h-6 w-6 text-primary/25 animate-pulse" />
          <Sparkles className="absolute right-24 top-32 h-4 w-4 text-accent/30 animate-pulse [animation-delay:1.2s]" />
          <Sparkles className="absolute left-32 bottom-40 h-5 w-5 text-primary/20 animate-pulse [animation-delay:0.8s]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge
              variant="secondary"
              className="mb-6 border border-primary/30 bg-primary/10 text-primary"
            >
              <Sparkles className="mr-1.5 h-3 w-3" />
              Premium Custom Design Studio
            </Badge>
          </motion.div>

          <motion.h1
            className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Frost &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bear Designs
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Professional Custom Solutions for Your Community — from ELS packs
            and liveries to Discord bots and full community setups.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="h-12 min-w-[160px] bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-smooth hover:bg-primary/90 hover:shadow-primary/40"
              onClick={() => {
                window.location.hash = "/services";
              }}
              data-ocid="home.hero.view_services_button"
            >
              <Rocket className="mr-2 h-4 w-4" />
              View Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 min-w-[160px] border-border px-8 font-semibold transition-smooth hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              onClick={() => window.open(DISCORD_URL, "_blank")}
              data-ocid="home.hero.discord_button"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact on Discord
              <ExternalLink className="ml-2 h-3 w-3 opacity-60" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Services Overview */}
      <section
        className="py-24 bg-background"
        data-ocid="home.services.section"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 border border-border bg-muted text-muted-foreground"
            >
              What We Do
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              Five specialized service categories crafted for FiveM and Discord
              communities.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Object.entries(SERVICE_CATEGORY_LABELS).map(
              ([key, label], index) => {
                const Icon = categoryIcons[key] ?? Globe;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Card
                      className="group h-full cursor-pointer border-border bg-card transition-smooth hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10"
                      data-ocid={`home.services.item.${index + 1}`}
                    >
                      <CardContent className="flex flex-col gap-4 p-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-2 font-display font-semibold text-foreground">
                            {label}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {categoryDescriptions[key]}
                          </p>
                        </div>
                        <a
                          href="#/services"
                          className="mt-auto inline-flex items-center text-sm font-medium text-primary transition-smooth hover:text-primary/80"
                          data-ocid={`home.services.pricing_link.${index + 1}`}
                        >
                          View Pricing
                          <span className="ml-1 transition-smooth group-hover:translate-x-0.5">
                            →
                          </span>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Pricing Highlights */}
      <section className="py-24 bg-muted/30" data-ocid="home.pricing.section">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 border border-primary/25 bg-primary/10 text-primary"
            >
              <Coins className="mr-1.5 h-3 w-3" />
              Transparent Pricing
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Popular Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              All prices shown in USD and Robux — flexible payment for every
              community.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularPricing.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                >
                  <Card
                    className="relative h-full overflow-hidden border-border bg-card transition-smooth hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                    data-ocid={`home.pricing.item.${index + 1}`}
                  >
                    {/* Top accent bar */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-accent/60" />
                    <CardContent className="flex flex-col gap-5 p-6 pt-7">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="border border-border bg-muted text-xs text-muted-foreground"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="mb-1 font-display font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-auto space-y-1.5 rounded-lg border border-border bg-muted/40 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            USD
                          </span>
                          <span className="font-display font-bold text-primary">
                            {item.usd}
                          </span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Robux
                          </span>
                          <span className="font-display font-semibold text-accent">
                            {item.robux}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary transition-smooth hover:bg-primary/10"
              onClick={() => {
                window.location.hash = "/services";
              }}
              data-ocid="home.pricing.view_all_button"
            >
              View Full Pricing List →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background" data-ocid="home.why.section">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 border border-border bg-muted text-muted-foreground"
            >
              Why Us
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose Frost & Bear?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don't just deliver assets — we deliver results your community
              will be proud of.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-ocid={`home.why.item.${index + 1}`}
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30" data-ocid="home.cta.section">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative snowflake */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Ready to Elevate Your Community?
            </h2>
            <p className="mb-10 text-muted-foreground">
              Submit a service inquiry or join our Discord to get started. Our
              team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-12 min-w-[160px] bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-smooth hover:bg-primary/90"
                onClick={() => {
                  window.location.hash = "/inquiry";
                }}
                data-ocid="home.cta.inquiry_button"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Submit Inquiry
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 min-w-[160px] border-border px-8 font-semibold transition-smooth hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                onClick={() => window.open(DISCORD_URL, "_blank")}
                data-ocid="home.cta.discord_button"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Our Discord
                <ExternalLink className="ml-2 h-3 w-3 opacity-60" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
