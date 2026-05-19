import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFreeReleases, useIncrementDownload } from "@/hooks/useFreeReleases";
import type { FreeRelease } from "@/types";
import {
  ArrowDownToLine,
  Download,
  FileArchive,
  FileImage,
  FileText,
  Gift,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  { key: "All", label: "All" },
  { key: "ELS", label: "ELS" },
  { key: "Livery", label: "Liveries" },
  { key: "Graphics", label: "Graphics" },
  { key: "Other", label: "Other" },
];

const CATEGORY_COLORS: Record<string, string> = {
  ELS: "bg-primary/20 text-primary border-primary/30",
  Livery: "bg-accent/20 text-accent border-accent/30",
  Graphics: "bg-chart-5/20 text-chart-5 border-chart-5/30",
  Other: "bg-muted text-muted-foreground border-border",
};

function getFileIcon(category: string) {
  switch (category) {
    case "ELS":
      return <FileText className="w-5 h-5 text-primary" />;
    case "Livery":
      return <FileImage className="w-5 h-5 text-accent" />;
    case "Graphics":
      return <FileImage className="w-5 h-5 text-chart-5" />;
    default:
      return <FileArchive className="w-5 h-5 text-muted-foreground" />;
  }
}

function ReleaseCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <div className="flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}

function ReleaseCard({
  release,
  index,
}: {
  release: FreeRelease;
  index: number;
}) {
  const incrementDownload = useIncrementDownload();
  const [downloading, setDownloading] = useState(false);
  const badgeClass = CATEGORY_COLORS[release.category] ?? CATEGORY_COLORS.Other;

  async function handleDownload() {
    setDownloading(true);
    try {
      await incrementDownload.mutateAsync(release.id);
      const url = release.file.getDirectURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = release.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success(
        "Download started — remember to credit Frost & Bear Designs!",
      );
    } catch {
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-smooth p-5"
      data-ocid={`free_releases.item.${index + 1}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon box */}
        <div className="shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          {getFileIcon(release.category)}
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-display font-semibold text-foreground text-base truncate">
              {release.title}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                badgeClass
              }`}
            >
              {release.category}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {release.description}
          </p>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Download className="w-3.5 h-3.5" />
          <span>
            {Number(release.downloadCount).toLocaleString()} downloads
          </span>
        </div>
        <Button
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          className="gap-2 transition-smooth"
          data-ocid={`free_releases.download_button.${index + 1}`}
        >
          <ArrowDownToLine className="w-3.5 h-3.5" />
          {downloading ? "Downloading…" : "Download"}
        </Button>
      </div>
    </motion.div>
  );
}

export default function FreeReleasesPage() {
  const { data: releases = [], isLoading } = useFreeReleases();
  const [activeCategory, setActiveCategory] = useState("All");

  const published = releases.filter((r) => r.isPublished);
  const filtered =
    activeCategory === "All"
      ? published
      : published.filter((r) => r.category === activeCategory);

  return (
    <Layout>
      {/* Hero Header */}
      <section className="bg-card border-b border-border py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-widest uppercase">
              <Gift className="w-3.5 h-3.5" />
              Community Resources
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free Releases
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Community resources from Frost &amp; Bear Designs — yours to use
              with credit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
              data-ocid={`free_releases.filter.${cat.key.toLowerCase()}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Releases List */}
      <section className="bg-background flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              data-ocid="free_releases.loading_state"
            >
              {Array.from({ length: 4 }, (_, i) => i).map((i) => (
                <ReleaseCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="free_releases.empty_state"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
                <Package className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No free releases yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                {activeCategory !== "All"
                  ? `No ${activeCategory} releases yet — try another category.`
                  : "Stay tuned! Free community assets are coming soon."}
              </p>
              {activeCategory !== "All" && (
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setActiveCategory("All")}
                  data-ocid="free_releases.filter.all"
                >
                  View All Releases
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((release, i) => (
                <ReleaseCard
                  key={String(release.id)}
                  release={release}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Attribution Footer */}
      {!isLoading && filtered.length > 0 && (
        <section className="bg-muted/40 border-t border-border py-6 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground text-sm">
              <span className="font-medium text-foreground">
                Attribution required.
              </span>{" "}
              All free releases require proper credit to{" "}
              <span className="text-primary font-medium">
                Frost &amp; Bear Designs
              </span>{" "}
              when used publicly.
            </p>
          </div>
        </section>
      )}
    </Layout>
  );
}
