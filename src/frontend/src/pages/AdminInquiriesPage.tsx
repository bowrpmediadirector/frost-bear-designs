import { InquiryStatus } from "@/backend";
import { AuthGuard } from "@/components/AuthGuard";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useInquiries, useUpdateInquiryStatus } from "@/hooks/useInquiries";
import type { Inquiry } from "@/types";
import { INQUIRY_STATUS_LABELS } from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  Pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: Clock,
  },
  InReview: {
    label: "In Review",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: Eye,
  },
  Completed: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: CheckCircle2,
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
    icon: XCircle,
  },
};

const FILTER_TABS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "In Review", value: "InReview" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

function statusKey(status: InquiryStatus): string {
  if (status === InquiryStatus.Pending) return "Pending";
  if (status === InquiryStatus.InReview) return "InReview";
  if (status === InquiryStatus.Completed) return "Completed";
  return "Cancelled";
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const key = statusKey(status);
  const cfg = STATUS_CONFIG[key];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function InquiryRow({ inquiry, index }: { inquiry: Inquiry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(inquiry.adminNotes ?? "");
  const updateStatus = useUpdateInquiryStatus();

  const handleUpdate = (status: InquiryStatus) => {
    updateStatus.mutate({ id: inquiry.id, status, notes });
  };

  const date = new Date(
    Number(inquiry.submittedAt / BigInt(1_000_000)),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      data-ocid={`admin_inquiries.item.${index}`}
      className="border border-border rounded-lg bg-card overflow-hidden"
    >
      <div className="flex items-center gap-3 p-4 flex-wrap">
        <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
          <div>
            <p className="text-xs text-muted-foreground">Client</p>
            <p className="text-sm font-medium text-foreground truncate">
              {inquiry.clientName}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Discord</p>
            <p className="text-sm text-foreground truncate">
              {inquiry.clientDiscord}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="text-sm text-foreground truncate">
              {inquiry.serviceName}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-sm text-foreground">
              ${inquiry.priceUSD}{" "}
              <span className="text-muted-foreground text-xs">
                / {Number(inquiry.priceRobux)} R$
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <StatusBadge status={inquiry.status} />
          <span className="text-xs text-muted-foreground hidden sm:block">
            {date}
          </span>
          <button
            type="button"
            data-ocid={`admin_inquiries.expand.${index}`}
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200"
            aria-label="Expand inquiry"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border p-4 bg-muted/20 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Custom Details</p>
            <p className="text-sm text-foreground leading-relaxed">
              {inquiry.customDetails || "(none)"}
            </p>
          </div>
          <div>
            <label
              htmlFor={`notes-${inquiry.id}`}
              className="text-xs text-muted-foreground mb-1 block"
            >
              Admin Notes
            </label>
            <Textarea
              id={`notes-${inquiry.id}`}
              data-ocid={`admin_inquiries.notes.${index}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes…"
              className="bg-card border-border text-sm resize-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {inquiry.status !== InquiryStatus.InReview && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                data-ocid={`admin_inquiries.in_review_button.${index}`}
                onClick={() => handleUpdate(InquiryStatus.InReview)}
                disabled={updateStatus.isPending}
                className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10"
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" /> Mark In Review
              </Button>
            )}
            {inquiry.status !== InquiryStatus.Completed && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                data-ocid={`admin_inquiries.completed_button.${index}`}
                onClick={() => handleUpdate(InquiryStatus.Completed)}
                disabled={updateStatus.isPending}
                className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Mark Completed
              </Button>
            )}
            {inquiry.status !== InquiryStatus.Cancelled && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                data-ocid={`admin_inquiries.cancel_button.${index}`}
                onClick={() => handleUpdate(InquiryStatus.Cancelled)}
                disabled={updateStatus.isPending}
                className="border-red-500/40 text-red-400 hover:bg-red-500/10"
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminInquiriesContent() {
  const { data: inquiries, isLoading } = useInquiries();
  const [filter, setFilter] = useState("all");

  const filtered = (inquiries ?? []).filter(
    (i) => filter === "all" || statusKey(i.status) === filter,
  );

  return (
    <div className="container py-12" data-ocid="admin_inquiries.page">
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs"
            >
              Admin
            </Badge>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Inquiries
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage all client inquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {inquiries?.length ?? 0} total
          </span>
        </div>
      </div>

      <div
        className="flex gap-1 mb-6 flex-wrap"
        data-ocid="admin_inquiries.filter.tab"
      >
        {FILTER_TABS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {label}
            {value !== "all" && inquiries && (
              <span className="ml-1.5 text-xs opacity-70">
                ({inquiries.filter((i) => statusKey(i.status) === value).length}
                )
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-16 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          data-ocid="admin_inquiries.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-lg"
        >
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No inquiries
            {filter !== "all"
              ? ` with status “${INQUIRY_STATUS_LABELS[filter]}”`
              : ""}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inquiry, i) => (
            <InquiryRow
              key={inquiry.id.toString()}
              inquiry={inquiry}
              index={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminInquiriesPage() {
  return (
    <Layout>
      <AuthGuard>
        <AdminInquiriesContent />
      </AuthGuard>
    </Layout>
  );
}
