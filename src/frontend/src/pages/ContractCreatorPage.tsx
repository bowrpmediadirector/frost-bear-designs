import { type Contract, type Service, ServiceCategory } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContract, useSignContract } from "@/hooks/useContracts";
import { useServices } from "@/hooks/useServices";
import { SERVICE_CATEGORY_LABELS } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  FileSignature,
  Printer,
  Snowflake,
} from "lucide-react";
import { useMemo, useState } from "react";

// Load Dancing Script for signature rendering
const sigFontLink = document.getElementById("dancing-script-font");
if (!sigFontLink) {
  const link = document.createElement("link");
  link.id = "dancing-script-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap";
  document.head.appendChild(link);
}

const DEFAULT_TERMS = `This contract is entered into between Frost & Bear Designs (Provider) and the Client.

1. SERVICES: Provider agrees to deliver the agreed-upon service as specified above.

2. PAYMENT: Agreed price is due upon signing this contract. Robux payment must be confirmed before work begins. USD payments must be completed via the agreed platform.

3. DELIVERY: Provider will deliver completed work within the agreed business days of confirmed payment. Timeline may vary based on scope.

4. REVISIONS: One round of revisions is included. Additional revisions may incur extra charges.

5. CREDIT: Client agrees to properly credit Frost & Bear Designs in any public use of the delivered work.

6. CANCELLATION: Cancellation after work has begun forfeits any partial payment already made.

7. OWNERSHIP: Upon full payment, Client receives a non-exclusive license to use the work. Frost & Bear Designs retains portfolio rights.

By signing below, both parties agree to the terms and conditions set forth in this contract.`;

const STATIC_SERVICES: Record<
  string,
  { name: string; usd: number; robux: bigint; id: string }[]
> = {
  ELS: [
    { id: "els_pack", name: "ELS Pack", usd: 20, robux: 100n },
    { id: "els_single", name: "Single ELS Pattern", usd: 5, robux: 50n },
  ],
  Livery: [
    {
      id: "livery_pack",
      name: "Livery Pack (6 Vehicles)",
      usd: 30,
      robux: 800n,
    },
    {
      id: "livery_additional",
      name: "Additional Vehicle",
      usd: 10,
      robux: 100n,
    },
  ],
  Graphics: [
    { id: "graphics_embed", name: "Discord Embeds", usd: 10, robux: 0n },
    { id: "graphics_logo", name: "Logo Design", usd: 5, robux: 0n },
    { id: "graphics_pfp", name: "Profile Picture (PFP)", usd: 7, robux: 0n },
    { id: "graphics_banner", name: "Banner Design", usd: 20, robux: 0n },
  ],
  CommunitySetup: [
    {
      id: "comm_discord",
      name: "Discord Server Configuration",
      usd: 30,
      robux: 0n,
    },
    {
      id: "comm_website",
      name: "Website Creation (Google Sites)",
      usd: 50,
      robux: 0n,
    },
  ],
  BotDevelopment: [
    {
      id: "bot_prebuilt",
      name: "Prebuilt Bot (SCNX / Bot Ghost)",
      usd: 15,
      robux: 0n,
    },
    { id: "bot_custom", name: "Custom Discord Bot", usd: 40, robux: 0n },
  ],
};

type Step = "form" | "preview" | "success";

interface FormState {
  clientName: string;
  clientDiscord: string;
  category: string;
  serviceId: string;
  customDetails: string;
  priceUSD: string;
  priceRobux: string;
  terms: string;
  signatureName: string;
  agreed: boolean;
}

function SignaturePreview({ name }: { name: string }) {
  if (!name.trim()) {
    return (
      <div className="h-16 flex items-end pb-2 border-b border-border">
        <span className="text-muted-foreground/40 text-sm italic">
          Your signature will appear here…
        </span>
      </div>
    );
  }
  return (
    <div className="h-16 flex items-end pb-1 border-b-2 border-primary/60">
      <span
        className="text-foreground leading-none"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "2.4rem",
          fontWeight: 700,
        }}
        data-ocid="contract_creator.signature_preview"
      >
        {name}
      </span>
    </div>
  );
}

function ContractDocument({
  form,
  createdAt,
  contractId,
}: {
  form: FormState;
  createdAt?: string;
  contractId?: bigint;
}) {
  const category = form.category as keyof typeof STATIC_SERVICES;
  const services = STATIC_SERVICES[category] ?? [];
  const service = services.find((s) => s.id === form.serviceId);
  const today = createdAt ?? new Date().toLocaleDateString();

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-ocid="contract_creator.document"
    >
      {/* Header */}
      <div className="bg-primary/10 border-b border-primary/20 px-8 py-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Snowflake className="w-7 h-7 text-primary" />
          <div className="text-left">
            <h2 className="text-lg font-display font-bold text-foreground">
              Frost & Bear Designs
            </h2>
            <p className="text-xs text-muted-foreground">
              Premium Custom Design Studio
            </p>
          </div>
        </div>
        <h3 className="text-xl font-display font-bold text-foreground mt-3">
          Service Agreement Contract
        </h3>
        {contractId !== undefined && (
          <Badge
            variant="outline"
            className="mt-2 text-primary border-primary/40"
          >
            Contract #{contractId.toString()}
          </Badge>
        )}
      </div>

      <div className="px-8 py-7 space-y-6">
        {/* Parties */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Provider
            </p>
            <p className="font-semibold text-foreground">
              Frost & Bear Designs
            </p>
            <p className="text-xs text-muted-foreground">
              Custom Design Studio
            </p>
          </div>
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Client
            </p>
            <p className="font-semibold text-foreground">{form.clientName}</p>
            <p className="text-xs text-muted-foreground">
              Discord: {form.clientDiscord}
            </p>
          </div>
        </div>

        <div className="bg-muted/40 rounded-xl p-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Service
            </p>
            <p className="font-medium text-foreground text-sm">
              {service?.name ?? form.serviceId}
            </p>
            <p className="text-xs text-muted-foreground">
              {SERVICE_CATEGORY_LABELS[form.category] ?? form.category}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Price (USD)
            </p>
            <p className="font-semibold text-foreground">${form.priceUSD}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Price (Robux)
            </p>
            <p className="font-semibold text-foreground">
              {form.priceRobux && form.priceRobux !== "0"
                ? `${form.priceRobux} R$`
                : "N/A"}
            </p>
          </div>
        </div>

        {form.customDetails && (
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Special Instructions
            </p>
            <p className="text-sm text-foreground">{form.customDetails}</p>
          </div>
        )}

        <Separator />

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Terms & Conditions
          </p>
          <div className="bg-muted/20 rounded-lg p-4 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {form.terms}
          </div>
        </div>

        <Separator />

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Provider Signature
            </p>
            <div className="border-b border-border pb-1 mb-2 h-12 flex items-end">
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
                className="text-foreground"
              >
                Frost & Bear Designs
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Date: {today}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Client Signature
            </p>
            <div className="border-b border-border pb-1 mb-2 h-12 flex items-end">
              {form.signatureName ? (
                <span
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                  }}
                  className="text-foreground"
                >
                  {form.signatureName}
                </span>
              ) : (
                <span className="text-muted-foreground/40 text-sm italic">
                  Pending signature
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Date: {today}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-1">
          This electronic contract is legally binding upon digital signature by
          both parties.
        </p>
      </div>
    </div>
  );
}

export default function ContractCreatorPage() {
  const { data: backendServices } = useServices();
  const createContract = useCreateContract();
  const signContract = useSignContract();

  const [step, setStep] = useState<Step>("form");
  const [createdContract, setCreatedContract] = useState<Contract | null>(null);
  const [form, setForm] = useState<FormState>({
    clientName: "",
    clientDiscord: "",
    category: "",
    serviceId: "",
    customDetails: "",
    priceUSD: "",
    priceRobux: "",
    terms: DEFAULT_TERMS,
    signatureName: "",
    agreed: false,
  });

  // Merge backend services with static pricing
  const availableServices = useMemo(() => {
    if (!form.category) return [];
    const staticList =
      STATIC_SERVICES[form.category as keyof typeof STATIC_SERVICES] ?? [];
    if (backendServices && backendServices.length > 0) {
      const filtered = backendServices.filter(
        (s: Service) =>
          Object.keys(ServiceCategory).find(
            (k) =>
              ServiceCategory[k as keyof typeof ServiceCategory] === s.category,
          ) === form.category || s.category.toString() === form.category,
      );
      if (filtered.length > 0)
        return filtered.map((s: Service) => ({
          id: String(s.id),
          name: s.name,
          usd: s.priceUSD,
          robux: s.priceRobux,
        }));
    }
    return staticList;
  }, [form.category, backendServices]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCategoryChange(cat: string) {
    setForm((prev) => ({
      ...prev,
      category: cat,
      serviceId: "",
      priceUSD: "",
      priceRobux: "",
    }));
  }

  function handleServiceChange(svcId: string) {
    const svc = availableServices.find((s) => String(s.id) === svcId);
    setForm((prev) => ({
      ...prev,
      serviceId: svcId,
      priceUSD: svc ? String(svc.usd) : "",
      priceRobux: svc ? String(svc.robux) : "",
    }));
  }

  const canGenerate =
    form.clientName.trim() &&
    form.clientDiscord.trim() &&
    form.category &&
    form.serviceId &&
    form.priceUSD &&
    form.agreed &&
    form.signatureName.trim();

  async function handleGenerate() {
    if (!canGenerate) return;
    try {
      const result = await createContract.mutateAsync({
        clientName: form.clientName,
        clientDiscord: form.clientDiscord,
        serviceType: form.serviceId,
        serviceDetails: form.customDetails,
        totalPriceUSD: Number(form.priceUSD),
        totalPriceRobux: BigInt(form.priceRobux || "0"),
        terms: form.terms,
      });
      setCreatedContract(result);
      setStep("preview");
    } catch (_e) {
      // Error handled by mutation state
    }
  }

  async function handleSign() {
    if (!createdContract) return;
    try {
      await signContract.mutateAsync({
        id: createdContract.id,
        signatureText: form.signatureName,
      });
      setStep("success");
    } catch (_e) {
      // Error handled by mutation state
    }
  }

  function handlePrint() {
    window.print();
  }

  const steps = [
    { label: "Client Info", num: 1 },
    { label: "Service", num: 2 },
    { label: "Terms", num: 3 },
    { label: "Signature", num: 4 },
  ];

  const currentFormSection = (() => {
    if (!form.clientName || !form.clientDiscord) return 1;
    if (!form.category || !form.serviceId) return 2;
    return 3;
  })();

  return (
    <Layout>
      <div
        className="min-h-screen bg-background"
        data-ocid="contract_creator.page"
      >
        {/* Page Header */}
        <section className="bg-card border-b border-border py-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-3">
              <FileSignature className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">
                Client Contracts
              </span>
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Contract Creator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate a personalized service agreement with Frost & Bear
              Designs.
            </p>

            {/* Progress steps */}
            {step === "form" && (
              <div
                className="flex items-center gap-1 mt-6"
                data-ocid="contract_creator.steps"
              >
                {steps.map((s, i) => (
                  <div key={s.num} className="flex items-center gap-1">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                        currentFormSection === s.num
                          ? "bg-primary text-primary-foreground"
                          : currentFormSection > s.num
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span>{s.num}</span>
                      <span>{s.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-10 px-6">
          <div className="max-w-3xl mx-auto">
            {step === "form" && (
              <div className="space-y-8">
                {/* Section 1: Client Info */}
                <div
                  className="bg-card border border-border rounded-2xl p-7"
                  data-ocid="contract_creator.client_info_section"
                >
                  <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Client Information
                  </h2>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Full Name</Label>
                      <Input
                        id="clientName"
                        placeholder="Your full name"
                        value={form.clientName}
                        onChange={(e) => setField("clientName", e.target.value)}
                        data-ocid="contract_creator.client_name_input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientDiscord">Discord Username</Label>
                      <Input
                        id="clientDiscord"
                        placeholder="username#0000"
                        value={form.clientDiscord}
                        onChange={(e) =>
                          setField("clientDiscord", e.target.value)
                        }
                        data-ocid="contract_creator.discord_input"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Service Details */}
                <div
                  className="bg-card border border-border rounded-2xl p-7"
                  data-ocid="contract_creator.service_section"
                >
                  <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Service Details
                  </h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label>Service Category</Label>
                        <Select
                          value={form.category}
                          onValueChange={handleCategoryChange}
                        >
                          <SelectTrigger data-ocid="contract_creator.category_select">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(SERVICE_CATEGORY_LABELS).map(
                              ([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Specific Service</Label>
                        <Select
                          value={form.serviceId}
                          onValueChange={handleServiceChange}
                          disabled={!form.category}
                        >
                          <SelectTrigger data-ocid="contract_creator.service_select">
                            <SelectValue
                              placeholder={
                                form.category
                                  ? "Select a service"
                                  : "Choose category first"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {availableServices.map((svc) => (
                              <SelectItem
                                key={String(svc.id)}
                                value={String(svc.id)}
                              >
                                {svc.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="priceUSD">Agreed Price (USD)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            $
                          </span>
                          <Input
                            id="priceUSD"
                            className="pl-7"
                            placeholder="0.00"
                            value={form.priceUSD}
                            onChange={(e) =>
                              setField("priceUSD", e.target.value)
                            }
                            data-ocid="contract_creator.price_usd_input"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priceRobux">Agreed Price (Robux)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            R$
                          </span>
                          <Input
                            id="priceRobux"
                            className="pl-8"
                            placeholder="0"
                            value={form.priceRobux}
                            onChange={(e) =>
                              setField("priceRobux", e.target.value)
                            }
                            data-ocid="contract_creator.price_robux_input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customDetails">
                        Custom Details / Special Instructions
                      </Label>
                      <Textarea
                        id="customDetails"
                        placeholder="Describe any specific requirements, vehicle choices, color schemes, etc."
                        rows={3}
                        value={form.customDetails}
                        onChange={(e) =>
                          setField("customDetails", e.target.value)
                        }
                        data-ocid="contract_creator.details_textarea"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Terms */}
                <div
                  className="bg-card border border-border rounded-2xl p-7"
                  data-ocid="contract_creator.terms_section"
                >
                  <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Contract Terms
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms & Conditions</Label>
                    <Textarea
                      id="terms"
                      rows={10}
                      value={form.terms}
                      onChange={(e) => setField("terms", e.target.value)}
                      className="font-mono text-xs"
                      data-ocid="contract_creator.terms_textarea"
                    />
                    <p className="text-xs text-muted-foreground">
                      Pre-filled with standard terms. You may edit them for your
                      specific agreement.
                    </p>
                  </div>
                </div>

                {/* Section 4: Signature */}
                <div
                  className="bg-card border border-border rounded-2xl p-7"
                  data-ocid="contract_creator.signature_section"
                >
                  <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    Your Signature
                  </h2>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signatureName">
                        Type your full name to sign
                      </Label>
                      <Input
                        id="signatureName"
                        placeholder="Your full name"
                        value={form.signatureName}
                        onChange={(e) =>
                          setField("signatureName", e.target.value)
                        }
                        data-ocid="contract_creator.signature_input"
                      />
                    </div>

                    {/* Live cursive preview */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Signature Preview
                      </p>
                      <div className="bg-muted/20 rounded-xl px-6 py-4">
                        <SignaturePreview name={form.signatureName} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This cursive rendering will appear on your contract.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <Checkbox
                        id="agreed"
                        checked={form.agreed}
                        onCheckedChange={(v) => setField("agreed", !!v)}
                        data-ocid="contract_creator.agree_checkbox"
                      />
                      <Label
                        htmlFor="agreed"
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        This is my electronic signature and I agree to the terms
                        above.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex items-center justify-between pt-2">
                  <Link to="/contract-sample">
                    <Button
                      variant="outline"
                      type="button"
                      data-ocid="contract_creator.view_sample_button"
                    >
                      View Sample Contract
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    disabled={!canGenerate || createContract.isPending}
                    onClick={handleGenerate}
                    data-ocid="contract_creator.generate_button"
                  >
                    {createContract.isPending
                      ? "Generating…"
                      : "Generate Contract"}
                  </Button>
                </div>

                {createContract.isError && (
                  <p
                    className="text-destructive text-sm text-center"
                    data-ocid="contract_creator.error_state"
                  >
                    Failed to create contract. Please ensure you are logged in
                    and try again.
                  </p>
                )}
              </div>
            )}

            {step === "preview" && createdContract && (
              <div
                className="space-y-6"
                data-ocid="contract_creator.preview_section"
              >
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      Contract #{createdContract.id.toString()} created
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Review your contract below and click Sign to finalize.
                    </p>
                  </div>
                </div>

                <ContractDocument form={form} contractId={createdContract.id} />

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("form")}
                    data-ocid="contract_creator.back_button"
                  >
                    Edit Contract
                  </Button>
                  <Button
                    size="lg"
                    disabled={signContract.isPending}
                    onClick={handleSign}
                    data-ocid="contract_creator.sign_button"
                  >
                    {signContract.isPending ? "Signing…" : "Sign Contract"}
                  </Button>
                </div>

                {signContract.isError && (
                  <p
                    className="text-destructive text-sm text-center"
                    data-ocid="contract_creator.sign_error_state"
                  >
                    Failed to sign contract. Please try again.
                  </p>
                )}
              </div>
            )}

            {step === "success" && createdContract && (
              <div
                className="space-y-6"
                data-ocid="contract_creator.success_state"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center">
                  <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h2 className="text-xl font-display font-bold text-foreground mb-1">
                    Contract Signed!
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Contract #{createdContract.id.toString()} has been signed
                    and recorded.
                  </p>
                </div>

                <ContractDocument
                  form={form}
                  contractId={createdContract.id}
                  createdAt={new Date().toLocaleDateString()}
                />

                <div className="flex items-center justify-center gap-4 pt-2">
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    data-ocid="contract_creator.print_button"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print / Download
                  </Button>
                  <Link to="/inquiry">
                    <Button data-ocid="contract_creator.new_inquiry_button">
                      Submit Inquiry
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
