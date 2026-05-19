import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMyInquiries, useSubmitInquiry } from "@/hooks/useInquiries";
import { useServices } from "@/hooks/useServices";
import { INQUIRY_STATUS_LABELS, SERVICE_CATEGORY_LABELS } from "@/types";
import type { Inquiry, Service } from "@/types";
import { useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  Loader2,
  SendHorizonal,
  Snowflake,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "border-amber-500/50 text-amber-400 bg-amber-500/10",
  InReview: "border-blue-400/50 text-blue-300 bg-blue-500/10",
  Completed: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
  Cancelled: "border-destructive/50 text-destructive bg-destructive/10",
};

function formatDate(ns: bigint) {
  return new Date(Number(ns / 1_000_000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function InquiryStatusBadge({ status }: { status: string }) {
  const key =
    typeof status === "object"
      ? Object.keys(status as Record<string, unknown>)[0]
      : status;
  return (
    <Badge variant="outline" className={`text-xs ${STATUS_COLORS[key] ?? ""}`}>
      {INQUIRY_STATUS_LABELS[key] ?? key}
    </Badge>
  );
}

function PastInquiries({
  inquiries,
  isLoading,
}: { inquiries: Inquiry[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }
  if (!inquiries || inquiries.length === 0) {
    return (
      <div
        className="flex flex-col items-center py-10 text-center"
        data-ocid="inquiry.empty_state"
      >
        <ClipboardList className="w-10 h-10 text-primary/20 mb-3" />
        <p className="text-sm text-muted-foreground">
          No inquiries submitted yet.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3" data-ocid="inquiry.history_list">
      {inquiries.map((inq, i) => {
        const statusKey =
          typeof inq.status === "object"
            ? Object.keys(inq.status as Record<string, unknown>)[0]
            : String(inq.status);
        return (
          <motion.div
            key={inq.id.toString()}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`inquiry.history_item.${i + 1}`}
            className="flex items-start justify-between gap-3 p-4 rounded-lg bg-muted/30 border border-border/40"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {inq.serviceName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                #{inq.id.toString()} · {formatDate(inq.submittedAt)}
              </p>
              {inq.adminNotes && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {inq.adminNotes}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <InquiryStatusBadge status={statusKey} />
              <span className="text-xs font-mono text-foreground">
                ${inq.priceUSD}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function InquiryPage() {
  const search = useSearch({ strict: false }) as { service?: string };

  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: myInquiries, isLoading: inquiriesLoading } = useMyInquiries();
  const submitMutation = useSubmitInquiry();

  const [clientName, setClientName] = useState("");
  const [clientDiscord, setClientDiscord] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [customDetails, setCustomDetails] = useState("");
  const [successId, setSuccessId] = useState<bigint | null>(null);

  // Pre-populate from URL param
  useEffect(() => {
    if (search.service) {
      setSelectedServiceId(search.service);
    }
  }, [search.service]);

  const selectedService = useMemo<Service | null>(() => {
    if (!services || !selectedServiceId) return null;
    return services.find((s) => s.id.toString() === selectedServiceId) ?? null;
  }, [services, selectedServiceId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService) return;

    try {
      const result = await submitMutation.mutateAsync({
        clientName: clientName.trim(),
        clientDiscord: clientDiscord.trim(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        customDetails: customDetails.trim(),
        priceUSD: selectedService.priceUSD,
        priceRobux: selectedService.priceRobux,
      });
      setSuccessId(result.id);
      setClientName("");
      setClientDiscord("");
      setSelectedServiceId("");
      setCustomDetails("");
    } catch {
      // error handled by mutation state
    }
  }

  const canSubmit =
    clientName.trim().length > 0 &&
    clientDiscord.trim().length > 0 &&
    selectedServiceId !== "" &&
    !submitMutation.isPending;

  return (
    <Layout>
      <div className="flex flex-col min-h-screen" data-ocid="inquiry.page">
        {/* Header */}
        <section className="bg-card border-b border-border/50 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                Get Started
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-4xl font-bold font-display text-foreground mb-2"
            >
              Submit a <span className="text-primary">Service Request</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Fill out the form below and our team will get back to you
              promptly.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="flex-1 bg-background py-10 px-6">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              {successId !== null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 px-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5"
                  data-ocid="inquiry.success_state"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-5" />
                  <h2 className="text-2xl font-bold font-display text-foreground mb-2">
                    Request Submitted!
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Your inquiry #{successId.toString()} has been received.
                    We'll reach out on Discord.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSuccessId(null)}
                    data-ocid="inquiry.submit_another_button"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                  data-ocid="inquiry.form"
                >
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="clientName" className="text-sm font-medium">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="clientName"
                      type="text"
                      placeholder="John Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      data-ocid="inquiry.name_input"
                    />
                  </div>

                  {/* Discord */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="clientDiscord"
                      className="text-sm font-medium"
                    >
                      Discord Username{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="clientDiscord"
                      type="text"
                      placeholder="username or username#1234"
                      value={clientDiscord}
                      onChange={(e) => setClientDiscord(e.target.value)}
                      required
                      data-ocid="inquiry.discord_input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include discriminator (#0000) if applicable.
                    </p>
                  </div>

                  {/* Service dropdown */}
                  <div className="space-y-1.5">
                    <Label htmlFor="service" className="text-sm font-medium">
                      Service <span className="text-destructive">*</span>
                    </Label>
                    {servicesLoading ? (
                      <Skeleton
                        className="h-10 w-full"
                        data-ocid="inquiry.service_loading_state"
                      />
                    ) : (
                      <Select
                        value={selectedServiceId}
                        onValueChange={setSelectedServiceId}
                        data-ocid="inquiry.service_select"
                      >
                        <SelectTrigger data-ocid="inquiry.service_select">
                          <SelectValue placeholder="Select a service…" />
                        </SelectTrigger>
                        <SelectContent>
                          {services && services.length > 0 ? (
                            Object.keys(SERVICE_CATEGORY_LABELS).map((cat) => {
                              const catServices = services.filter(
                                (s) => s.category === cat,
                              );
                              if (catServices.length === 0) return null;
                              return (
                                <div key={cat}>
                                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {SERVICE_CATEGORY_LABELS[cat]}
                                  </div>
                                  {catServices.map((s) => (
                                    <SelectItem
                                      key={s.id.toString()}
                                      value={s.id.toString()}
                                    >
                                      {s.name} — ${s.priceUSD}
                                      {s.priceRobux > 0n
                                        ? ` / ${s.priceRobux} Robux`
                                        : ""}
                                    </SelectItem>
                                  ))}
                                </div>
                              );
                            })
                          ) : (
                            <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                              No services available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Price display */}
                  {selectedService && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between"
                      data-ocid="inquiry.price_display"
                    >
                      <span className="text-sm text-muted-foreground">
                        Estimated Price
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold font-display text-primary">
                          ${selectedService.priceUSD}
                        </span>
                        {selectedService.priceRobux > 0n && (
                          <Badge
                            variant="outline"
                            className="border-amber-500/50 text-amber-400 bg-amber-500/10 font-mono text-xs"
                          >
                            ⬡ {selectedService.priceRobux.toString()} Robux
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="customDetails"
                      className="text-sm font-medium"
                    >
                      Custom Details / Notes
                    </Label>
                    <Textarea
                      id="customDetails"
                      placeholder="Tell us more about your specific needs, vehicle choices, color preferences, etc."
                      rows={5}
                      value={customDetails}
                      onChange={(e) => setCustomDetails(e.target.value)}
                      data-ocid="inquiry.details_textarea"
                    />
                  </div>

                  {/* Error */}
                  {submitMutation.isError && (
                    <div
                      className="text-sm text-destructive px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20"
                      data-ocid="inquiry.error_state"
                    >
                      Failed to submit. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit}
                    data-ocid="inquiry.submit_button"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Submitting…
                      </>
                    ) : (
                      <>
                        <SendHorizonal className="w-4 h-4 mr-2" /> Submit
                        Request
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>

            {/* Sidebar — past inquiries */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <Card className="border-border/50 bg-card">
                  <CardHeader className="pb-3 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-primary" />
                      <h2 className="text-sm font-semibold font-display text-foreground">
                        My Past Inquiries
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <PastInquiries
                      inquiries={myInquiries}
                      isLoading={inquiriesLoading}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
