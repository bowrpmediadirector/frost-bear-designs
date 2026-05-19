import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Snowflake } from "lucide-react";
import { SiDiscord, SiInstagram, SiX } from "react-icons/si";

const year = new Date().getFullYear();
const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Snowflake className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold text-foreground tracking-wide">
                  FROST &amp; BEAR
                </span>
                <span className="font-display text-[10px] font-medium text-muted-foreground tracking-[0.15em] uppercase">
                  Designs
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Professional Custom Solutions for Your Community. Premium quality
              ELS, liveries, graphics, and more.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://discord.gg/frostandbear"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <SiDiscord className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/frostandbear"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/frostandbear"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-display font-semibold text-foreground tracking-widest uppercase">
              Services
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "ELS Packs", href: "/services" },
                { label: "Custom Liveries", href: "/services" },
                { label: "Graphics & Branding", href: "/services" },
                { label: "Bot Development", href: "/services" },
                { label: "Community Setup", href: "/services" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-display font-semibold text-foreground tracking-widest uppercase">
              Company
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Gallery", href: "/gallery" },
                { label: "Free Releases", href: "/free-releases" },
                { label: "Contract Creator", href: "/contract-creator" },
                { label: "Submit Inquiry", href: "/inquiry" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Frost &amp; Bear Designs. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
