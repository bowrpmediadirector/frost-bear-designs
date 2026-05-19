import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { FileText, Snowflake } from "lucide-react";

const SAMPLE_TERMS = [
  {
    heading: "1. Agreement",
    body: "This contract is entered into between Frost & Bear Designs (Provider) and [Client Name] (Client).",
  },
  {
    heading: "2. Services",
    body: "Services: [Service description — e.g., Custom Livery Pack (6 Vehicles)]",
  },
  {
    heading: "3. Payment",
    body: "Payment: [Price] due upon agreement. Robux payment must be confirmed before work begins. USD payments are processed via agreed-upon platform.",
  },
  {
    heading: "4. Delivery",
    body: "Provider will deliver completed work within [X] business days of confirmed payment. Timeline may vary based on scope and complexity.",
  },
  {
    heading: "5. Revisions",
    body: "One round of revisions is included at no additional cost. Additional revision requests beyond the included round may incur extra charges at the Provider's discretion.",
  },
  {
    heading: "6. Credit",
    body: "Client agrees to properly credit Frost & Bear Designs in any public use of the delivered work, including but not limited to in-game showcases, social media posts, and community announcements.",
  },
  {
    heading: "7. Cancellation",
    body: "Cancellation after work has begun forfeits any partial payment already made. Cancellations prior to commencement of work may be eligible for a full refund at Provider's discretion.",
  },
  {
    heading: "8. Ownership & Rights",
    body: "Upon full payment, the Client receives a non-exclusive license to use the delivered work. Frost & Bear Designs retains the right to display completed work in its portfolio.",
  },
];

export default function ContractSamplePage() {
  return (
    <Layout>
      <div
        className="min-h-screen bg-background"
        data-ocid="contract_sample.page"
      >
        {/* Page Header */}
        <section className="bg-card border-b border-border py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">
                Legal Documents
              </span>
            </div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-3">
              Contract Template
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Review our standard service contract before getting started. When
              you're ready, use our Contract Creator to generate a personalized
              agreement.
            </p>
          </div>
        </section>

        {/* Contract Document */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
              data-ocid="contract_sample.card"
            >
              {/* Document Header */}
              <div className="bg-primary/10 border-b border-primary/20 px-8 py-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Snowflake className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <h2 className="text-xl font-display font-bold text-foreground">
                      Frost & Bear Designs
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Premium Custom Design Studio
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mt-4">
                  Service Agreement Contract
                </h3>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <Badge
                    variant="outline"
                    className="text-primary border-primary/40"
                  >
                    SAMPLE TEMPLATE
                  </Badge>
                </div>
              </div>

              {/* Contract Body */}
              <div className="px-8 py-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Provider
                    </p>
                    <p className="font-semibold text-foreground">
                      Frost & Bear Designs
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Custom Design Studio
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Client
                    </p>
                    <p className="font-semibold text-foreground">
                      [Client Full Name]
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Discord: [Username]
                    </p>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-xl p-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Service
                    </p>
                    <p className="font-medium text-foreground text-sm">
                      [Service Type]
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Price (USD)
                    </p>
                    <p className="font-medium text-foreground text-sm">
                      $[Amount]
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Price (Robux)
                    </p>
                    <p className="font-medium text-foreground text-sm">
                      [Amount] R$
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-5">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Terms & Conditions
                  </h4>
                  {SAMPLE_TERMS.map((term) => (
                    <div key={term.heading}>
                      <h5 className="font-semibold text-foreground text-sm mb-1">
                        {term.heading}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {term.body}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Signature Section */}
                <div className="grid grid-cols-2 gap-8">
                  <div data-ocid="contract_sample.provider_signature">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Provider Signature
                    </p>
                    <div className="border-b border-border pb-2 mb-2 h-12 flex items-end">
                      <span
                        className="text-foreground text-2xl"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                      >
                        Frost & Bear Designs
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Date: ___________
                    </p>
                  </div>
                  <div data-ocid="contract_sample.client_signature">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Client Signature
                    </p>
                    <div className="border-b border-border pb-2 mb-2 h-12 flex items-end">
                      <span className="text-muted-foreground/40 text-sm italic">
                        [Client Signature]
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Date: ___________
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  This electronic contract is legally binding upon digital
                  signature by both parties.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className="mt-8 text-center"
              data-ocid="contract_sample.cta_section"
            >
              <p className="text-muted-foreground mb-4">
                Ready to create your personalized service agreement?
              </p>
              <Link to="/contract-creator">
                <Button
                  size="lg"
                  className="px-8"
                  data-ocid="contract_sample.create_contract_button"
                >
                  Create Your Contract
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
