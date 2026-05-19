import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

const LAST_UPDATED = "May 2, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Introduction & Acceptance of Terms",
    content: [
      "Welcome to Frost & Bear Designs. By accessing our website, requesting a quote, or engaging our services, you agree to be bound by these Terms of Use in their entirety. If you do not agree with any part of these terms, you may not use our services.",
      'These Terms of Use constitute a binding legal agreement between you ("Client") and Frost & Bear Designs ("Studio", "we", "our", or "us"). We reserve the right to modify these terms at any time, and continued use of our services following any modification constitutes acceptance of the revised terms.',
    ],
  },
  {
    id: "services",
    title: "2. Services Description",
    content: [
      "Frost & Bear Designs provides the following professional custom design and development services:",
    ],
    list: [
      "ELS & Lighting Patterns — Custom emergency lighting system packs and single pattern configurations for roleplay communities.",
      "Custom Liveries — Vehicle skin design packs covering up to six vehicles of your choice, including Sheriff, Police, State Patrol, Highway Patrol, and Fire Department configurations.",
      "Graphics & Branding — Discord embeds, logos, profile pictures (PFPs), and banners designed to your specifications.",
      "Community Setup & Development — Full Discord server configuration and website creation services.",
      "Bot Development — Prebuilt bot configuration (SCNX or Bot Ghost) and fully coded custom Discord bots tailored to your community's needs.",
    ],
    footer:
      "All service deliverables, scope, and timelines will be confirmed in writing (via Discord or signed contract) before work commences.",
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    content: [
      "All prices are listed in USD and Robux where applicable. Current pricing is as follows:",
    ],
    list: [
      "ELS Packs: $20 USD or 100 Robux · Single ELS Pattern: $5 USD or 50 Robux",
      "Livery Pack (6 Vehicles): $30 USD or 800 Robux · Additional Vehicle: $10 USD or 100 Robux",
      "Discord Embeds: $10 USD · Logos: $5 USD · Profile Pictures: $7 USD · Banners: $20 USD",
      "Discord Server Configuration: $30 USD · Website Creation (Google Sites): $50 USD",
      "Prebuilt Bots (SCNX/Bot Ghost): $15 USD · Custom Discord Bots: Starting at $40 USD",
    ],
    footer:
      "USD payments must be made via the agreed payment method prior to or upon delivery. Robux payments must be confirmed and received before work begins — no exceptions. Prices are subject to change; the price confirmed at time of order is binding for that engagement.",
  },
  {
    id: "delivery",
    title: "4. Delivery & Revisions",
    content: [
      "Frost & Bear Designs will make reasonable efforts to deliver completed work within the agreed-upon timeframe communicated at the time of order. Timelines may vary based on project complexity and current workload.",
      'Each service engagement includes one (1) free revision round following initial delivery. A "revision" is defined as minor adjustments to the delivered work — changes of substantial scope (new concepts, major redesigns) may be quoted as a new or additional service.',
      "Revisions must be requested within seven (7) days of delivery. Revision requests submitted after this period may be declined or quoted separately.",
    ],
  },
  {
    id: "ip",
    title: "5. Intellectual Property",
    content: [
      "Upon receipt of full payment, the Client receives a non-exclusive, non-transferable license to use the delivered work for its intended purpose within their community or project.",
      "Frost & Bear Designs retains all underlying intellectual property rights, including the right to display delivered work in our portfolio, gallery, and promotional materials. We will credit the client community name unless the client requests otherwise in writing.",
      "All pre-existing assets, templates, tools, and methodologies used by Frost & Bear Designs in creating deliverables remain the exclusive property of Frost & Bear Designs.",
    ],
  },
  {
    id: "credit",
    title: "6. Credit & Attribution",
    content: [
      'When the Client publicly shares, distributes, or displays work created by Frost & Bear Designs, they must include clear and visible credit to "Frost & Bear Designs" as the creator. This applies to social media posts, community announcements, in-game use, and any other public-facing contexts.',
      "Free releases distributed by Frost & Bear Designs through our designated free channel or website must retain all embedded credit, watermarks, or attribution metadata. Redistribution of free releases without proper credit is strictly prohibited and may result in revocation of access to future free releases.",
    ],
  },
  {
    id: "cancellation",
    title: "7. Cancellation Policy",
    content: [
      "Cancellations requested before work has commenced may be eligible for a full refund, subject to review on a case-by-case basis.",
      "Once work has begun on a project, any deposits or upfront payments made are non-refundable. If a client wishes to cancel mid-project, no refund will be issued for work already completed or time already invested.",
      "Frost & Bear Designs reserves the right to cancel a service engagement at any time in cases of client misconduct, violation of these terms, or circumstances beyond our control. In such cases, a proportional refund for uncompleted work may be issued at our discretion.",
    ],
  },
  {
    id: "prohibited",
    title: "8. Prohibited Uses",
    content: ["By using our services, you agree that you will not:"],
    list: [
      "Resell, redistribute, or license work created by Frost & Bear Designs to third parties without prior written consent.",
      "Claim work created by Frost & Bear Designs as your own original creation without proper attribution.",
      "Use deliverables in any manner that violates applicable laws, platform rules (including Roblox Terms of Service), or community guidelines.",
      "Harass, threaten, or intimidate Frost & Bear Designs staff or representatives in connection with a service engagement.",
      "Use our services to produce content that promotes discrimination, hate, or harm toward any individual or group.",
    ],
    footer:
      "Violations of these prohibitions may result in immediate termination of your service engagement without refund, and we reserve the right to pursue any legal remedies available.",
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Frost & Bear Designs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or any deliverables provided.",
      "Our total liability for any claim arising in connection with a service engagement shall not exceed the amount paid by the Client for that specific engagement. We make no warranties, express or implied, regarding the fitness of deliverables for any specific purpose beyond the agreed scope.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to Terms",
    content: [
      'Frost & Bear Designs reserves the right to update or modify these Terms of Use at any time without prior notice. The "Last Updated" date at the top of this page reflects the date of the most recent revision.',
      "Your continued use of our services following any changes constitutes your acceptance of the updated terms. We encourage you to review these terms periodically to stay informed of any updates.",
    ],
  },
  {
    id: "contact",
    title: "11. Contact",
    content: [
      "For questions, concerns, or disputes regarding these Terms of Use, please contact Frost & Bear Designs through our official Discord server. We aim to respond to all inquiries within 48 hours.",
      "Discord is our primary and official support channel. Please do not attempt to contact us through unofficial channels, as responses cannot be guaranteed.",
    ],
    isContact: true,
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen" data-ocid="terms.page">
        {/* Hero header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest">
                Legal Document
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-3">
              Terms of Use
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              <span className="text-foreground font-medium">
                {LAST_UPDATED}
              </span>
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Please read these Terms of Use carefully before engaging the
              services of Frost &amp; Bear Designs. By using our services, you
              agree to the following terms and conditions.
            </p>
          </div>
        </div>

        {/* Table of contents */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
              Contents
            </p>
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2"
              data-ocid="terms.toc"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {s.title.split(" ").slice(0, 2).join(" ")}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 pb-3 border-b border-border">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2 my-4">
                      {section.list.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="flex gap-3 text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="text-muted-foreground leading-relaxed">
                      {section.footer}
                    </p>
                  )}
                  {section.isContact && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="border-primary/40 text-primary hover:bg-primary/10"
                        asChild
                        data-ocid="terms.discord_button"
                      >
                        <a
                          href="https://discord.gg/frostandbear"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Our Discord Server
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="bg-muted/40 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              asChild
              data-ocid="terms.back_home_button"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              asChild
              data-ocid="terms.privacy_link"
            >
              <Link to="/privacy">
                Privacy Policy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
