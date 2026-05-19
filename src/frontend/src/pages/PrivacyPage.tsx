import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";

const LAST_UPDATED = "May 2, 2026";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      'Frost & Bear Designs ("Studio", "we", "our", or "us") is committed to protecting the privacy of our clients and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with our website and services.',
      "By using our website or engaging our services, you agree to the collection and use of information as described in this Privacy Policy.",
    ],
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    content: [
      "When you submit an inquiry, request a quote, or engage with our services, we may collect the following categories of information:",
    ],
    list: [
      "Name or display name — to address you and personalize communications.",
      "Discord username and/or server information — our primary channel for service delivery and support.",
      "Service preferences and selections — the type of service requested, vehicle choices, livery styles, or other customization details.",
      "Inquiry details and project briefs — written descriptions of your project requirements.",
      "Payment confirmation details — confirmation that payment was received (we do not store payment card numbers or Robux account credentials).",
      "Communication history — messages exchanged through our inquiry form or Discord for service continuity.",
    ],
    footer:
      "We collect only the information necessary to fulfill your service request. We do not collect sensitive personal information such as government identification numbers, financial account credentials, or health data.",
  },
  {
    id: "usage",
    title: "3. How We Use Your Information",
    content: [
      "Information we collect is used solely for legitimate business purposes related to delivering and improving our services:",
    ],
    list: [
      "To process and fulfill service requests — your project details enable us to deliver accurate, tailored results.",
      "To communicate about your order — updates on project status, revision requests, and delivery notifications.",
      "To maintain service records — for reference in case of disputes or revision requests within the allowed window.",
      "To improve our services — anonymized, aggregated feedback and usage patterns help us understand what our clients value most.",
      "To showcase completed work in our portfolio or gallery — subject to the terms outlined in our Terms of Use regarding credit and attribution.",
    ],
    footer:
      "We do not use your information for automated profiling, targeted advertising, or any purpose beyond what is described in this Policy.",
  },
  {
    id: "storage",
    title: "4. Data Storage",
    content: [
      "Information submitted through this website is stored on the Internet Computer blockchain — a decentralized, tamper-resistant computing platform. This means your data benefits from the security and permanence guarantees of blockchain-based storage.",
      "Data stored on the Internet Computer is replicated across a distributed network of nodes, providing resilience against data loss. However, this also means that certain submitted data may persist indefinitely on-chain unless specifically deleted.",
      "We take reasonable technical measures to protect your information from unauthorized access, but no system is completely secure. By using our services, you acknowledge these inherent characteristics of on-chain storage.",
    ],
  },
  {
    id: "sharing",
    title: "5. Data Sharing",
    content: [
      "Frost & Bear Designs does not sell, rent, trade, or otherwise share your personal information with third-party companies for their marketing or commercial purposes.",
      "We may disclose information only in the following limited circumstances:",
    ],
    list: [
      "With your consent — if you explicitly authorize us to share specific information.",
      "Legal compliance — if required by applicable law, regulation, or valid legal process.",
      "Safety — to protect the rights, property, or safety of Frost & Bear Designs, our clients, or the public.",
    ],
    footer:
      "We do not currently use any third-party analytics services, advertising networks, or data brokers in connection with this website.",
  },
  {
    id: "rights",
    title: "6. Your Rights",
    content: [
      "Depending on your jurisdiction, you may have the following rights with respect to your personal information:",
    ],
    list: [
      "Access — You may request a summary of the personal information we hold about you.",
      "Correction — You may request that we correct inaccurate or incomplete information.",
      "Deletion — You may request that we delete your personal information. Note: due to the nature of blockchain storage, certain on-chain records may not be fully erasable.",
      "Portability — You may request a copy of your information in a commonly used, machine-readable format.",
      "Objection — You may object to specific uses of your information where we rely on legitimate interests as our legal basis.",
    ],
    footer:
      "To exercise any of these rights, please contact us through our official Discord server. We will respond to verified requests within a reasonable timeframe.",
  },
  {
    id: "cookies",
    title: "7. Cookies",
    content: [
      "This website uses minimal cookies and browser storage necessary only for basic website functionality — such as remembering your session state and ensuring secure authentication flows.",
      "We do not use tracking cookies, advertising cookies, or third-party analytics cookies. No cookie consent banner is shown because we do not use non-essential cookies.",
    ],
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The "Last Updated" date at the top of this page will be revised accordingly.',
      "We encourage you to review this Policy periodically. Your continued use of our website or services following any changes constitutes your acceptance of the updated Policy.",
    ],
  },
  {
    id: "contact",
    title: "9. Contact",
    content: [
      "If you have questions about this Privacy Policy, wish to exercise your data rights, or have concerns about how your information is handled, please contact us through our official Discord server.",
      "Discord is our primary and official channel for all privacy-related inquiries. We aim to acknowledge all requests within 48 hours.",
    ],
    isContact: true,
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="min-h-screen" data-ocid="privacy.page">
        {/* Hero header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest">
                Legal Document
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              <span className="text-foreground font-medium">
                {LAST_UPDATED}
              </span>
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Frost &amp; Bear Designs is committed to protecting your privacy.
              This policy explains what information we collect, how we use it,
              and how we keep it safe.
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
              data-ocid="privacy.toc"
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
                        data-ocid="privacy.discord_button"
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
              data-ocid="privacy.back_home_button"
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
              data-ocid="privacy.terms_link"
            >
              <Link to="/terms">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terms of Use
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
