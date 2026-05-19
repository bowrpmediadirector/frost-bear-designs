import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGalleryItems } from "@/hooks/useGallery";
import type { GalleryItem } from "@/types";
import { ImageIcon, Layers, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  { key: "All", label: "All" },
  { key: "ELS", label: "ELS & Lighting" },
  { key: "Livery", label: "Custom Liveries" },
  { key: "Graphics", label: "Graphics & Branding" },
];

const CATEGORY_COLORS: Record<string, string> = {
  ELS: "bg-primary/20 text-primary border-primary/30",
  Livery: "bg-accent/20 text-accent border-accent/30",
  Graphics: "bg-chart-5/20 text-chart-5 border-chart-5/30",
  CommunitySetup: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  BotDevelopment: "bg-chart-3/20 text-chart-3 border-chart-3/30",
};

function GalleryCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const badgeClass =
    CATEGORY_COLORS[item.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative rounded-xl overflow-hidden border border-border bg-card cursor-pointer"
      data-ocid={`gallery.item.${index + 1}`}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={item.image.getDirectURL()}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/gallery-placeholder.dim_800x500.png";
          }}
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm text-foreground/90 line-clamp-2">
            {item.description}
          </p>
        </div>
        {/* Shimmer border on hover */}
        <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-primary/40 transition-all duration-300 pointer-events-none" />
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <h3 className="font-display font-semibold text-foreground text-sm truncate flex-1">
          {item.title}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
            badgeClass
          }`}
        >
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

function LightboxModal({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  if (!item) return null;
  const badgeClass =
    CATEGORY_COLORS[item.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl w-full p-0 overflow-hidden bg-card border-border"
        data-ocid="gallery.dialog"
      >
        <div className="relative">
          <img
            src={item.image.getDirectURL()}
            alt={item.title}
            className="w-full max-h-[60vh] object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/gallery-placeholder.dim_800x500.png";
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 bg-background/70 hover:bg-background text-foreground rounded-full p-1.5 transition-smooth"
            aria-label="Close lightbox"
            data-ocid="gallery.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="font-display text-xl font-bold text-foreground">
              {item.title}
            </DialogTitle>
            <span
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${
                badgeClass
              }`}
            >
              {item.category}
            </span>
          </div>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            {item.description || "No description provided."}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GalleryPage() {
  const { data: items = [], isLoading } = useGalleryItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const published = items.filter((i) => i.isPublished);
  const filtered =
    activeCategory === "All"
      ? published
      : published.filter((i) => i.category === activeCategory);

  return (
    <Layout>
      {/* Hero Header */}
      <section className="bg-card border-b border-border py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              Portfolio
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Work
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Showcase of professional custom creations by Frost &amp; Bear
              Designs — from ELS lighting to liveries and graphics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
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
              data-ocid={`gallery.filter.${cat.key.toLowerCase()}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-background flex-1 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="gallery.loading_state"
            >
              {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <GalleryCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="gallery.empty_state"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
                <ImageIcon className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No gallery items yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                {activeCategory !== "All"
                  ? `No items in the ${activeCategory} category — try another filter.`
                  : "Check back soon — new work is always in progress!"}
              </p>
              {activeCategory !== "All" && (
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setActiveCategory("All")}
                  data-ocid="gallery.filter.all"
                >
                  View All Work
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <GalleryCard
                  key={String(item.id)}
                  item={item}
                  index={i}
                  onOpen={setLightboxItem}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </Layout>
  );
}
