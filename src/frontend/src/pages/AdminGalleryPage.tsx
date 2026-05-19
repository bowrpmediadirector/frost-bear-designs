import { ExternalBlob } from "@/backend";
import { AuthGuard } from "@/components/AuthGuard";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddGalleryItem,
  useDeleteGalleryItem,
  useGalleryItems,
} from "@/hooks/useGallery";
import type { GalleryItem } from "@/types";
import { Eye, EyeOff, Image, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UploadForm {
  title: string;
  description: string;
  category: string;
  isPublished: boolean;
  file: File | null;
  previewUrl: string | null;
}

const EMPTY_FORM: UploadForm = {
  title: "",
  description: "",
  category: "",
  isPublished: true,
  file: null,
  previewUrl: null,
};

function GalleryItemCard({
  item,
  index,
  onDelete,
  deleting,
}: {
  item: GalleryItem;
  index: number;
  onDelete: () => void;
  deleting: boolean;
}) {
  const imageUrl = item.image.getDirectURL();
  return (
    <Card
      data-ocid={`admin_gallery.item.${index}`}
      className="bg-card border-border overflow-hidden group"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
              item.isPublished
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {item.isPublished ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )}
            {item.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm truncate">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.category}
            </p>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            data-ocid={`admin_gallery.delete_button.${index}`}
            onClick={onDelete}
            disabled={deleting}
            className="flex-shrink-0 w-7 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete gallery item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UploadFormPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<UploadForm>(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useAddGalleryItem();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, file, previewUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file || !form.title || !form.category) {
      toast.error("Please fill in all required fields and select an image.");
      return;
    }
    try {
      const buf = await form.file.arrayBuffer();
      const blob = ExternalBlob.fromBytes(
        new Uint8Array(buf),
      ).withUploadProgress((p) => setUploadProgress(p));
      await addItem.mutateAsync({
        title: form.title,
        description: form.description,
        category: form.category,
        image: blob,
        isPublished: form.isPublished,
      });
      toast.success("Gallery item added!");
      onClose();
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <Card
      data-ocid="admin_gallery.upload_form"
      className="bg-card border-primary/30 mb-6"
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-semibold text-foreground">
            Add Gallery Item
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-ocid="admin_gallery.close_button"
            className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200"
            aria-label="Close form"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-1.5 block">
              Image <span className="text-destructive">*</span>
            </Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="admin_gallery.dropzone"
              className="w-full border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors duration-200"
            >
              {form.previewUrl ? (
                <img
                  src={form.previewUrl}
                  alt="Preview"
                  className="max-h-32 rounded-md object-contain"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload image
                  </p>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFile}
              data-ocid="admin_gallery.upload_button"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="gallery-title"
                className="text-sm text-muted-foreground mb-1.5 block"
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gallery-title"
                data-ocid="admin_gallery.title.input"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Sheriff Livery Pack"
                className="bg-muted/40 border-border"
              />
            </div>
            <div>
              <Label
                htmlFor="gallery-category"
                className="text-sm text-muted-foreground mb-1.5 block"
              >
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gallery-category"
                data-ocid="admin_gallery.category.input"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="e.g. Liveries"
                className="bg-muted/40 border-border"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="gallery-desc"
              className="text-sm text-muted-foreground mb-1.5 block"
            >
              Description
            </Label>
            <Textarea
              id="gallery-desc"
              data-ocid="admin_gallery.description.textarea"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={2}
              placeholder="Short description…"
              className="bg-muted/40 border-border resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="gallery-published"
                data-ocid="admin_gallery.published.switch"
                checked={form.isPublished}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, isPublished: v }))
                }
              />
              <Label
                htmlFor="gallery-published"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Publish immediately
              </Label>
            </div>
            <Button
              type="submit"
              size="sm"
              data-ocid="admin_gallery.submit_button"
              disabled={addItem.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {addItem.isPending ? "Uploading…" : "Add Item"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function AdminGalleryContent() {
  const { data: items, isLoading } = useGalleryItems();
  const deleteItem = useDeleteGalleryItem();
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: bigint) => {
    deleteItem.mutate(id, {
      onSuccess: () => toast.success("Item deleted."),
      onError: () => toast.error("Delete failed."),
    });
  };

  return (
    <div className="container py-12" data-ocid="admin_gallery.page">
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
            Gallery Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage portfolio work
          </p>
        </div>
        <Button
          type="button"
          data-ocid="admin_gallery.add_button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Cancel" : "Add Item"}
        </Button>
      </div>

      {showForm && <UploadFormPanel onClose={() => setShowForm(false)} />}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="aspect-video rounded-lg" />
          ))}
        </div>
      ) : !items || items.length === 0 ? (
        <div
          data-ocid="admin_gallery.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-lg"
        >
          <Image className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No gallery items yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload your first piece of work
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <GalleryItemCard
              key={item.id.toString()}
              item={item}
              index={i + 1}
              onDelete={() => handleDelete(item.id)}
              deleting={deleteItem.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminGalleryPage() {
  return (
    <Layout>
      <AuthGuard>
        <AdminGalleryContent />
      </AuthGuard>
    </Layout>
  );
}
