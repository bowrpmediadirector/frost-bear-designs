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
  useAddFreeRelease,
  useDeleteFreeRelease,
  useFreeReleases,
} from "@/hooks/useFreeReleases";
import type { FreeRelease } from "@/types";
import {
  Download,
  Eye,
  EyeOff,
  Package,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ReleaseForm {
  title: string;
  description: string;
  category: string;
  isPublished: boolean;
  file: File | null;
}

const EMPTY_FORM: ReleaseForm = {
  title: "",
  description: "",
  category: "",
  isPublished: true,
  file: null,
};

function ReleaseCard({
  release,
  index,
  onDelete,
  deleting,
}: {
  release: FreeRelease;
  index: number;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <Card
      data-ocid={`admin_releases.item.${index}`}
      className="bg-card border-border"
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {release.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {release.category}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  release.isPublished
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {release.isPublished ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
                {release.isPublished ? "Published" : "Draft"}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                data-ocid={`admin_releases.delete_button.${index}`}
                onClick={onDelete}
                disabled={deleting}
                className="w-7 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label="Delete release"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          {release.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {release.description}
            </p>
          )}
          <div className="flex items-center gap-1 mt-2">
            <Download className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {Number(release.downloadCount)} downloads
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UploadFormPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ReleaseForm>(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addRelease = useAddFreeRelease();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file || !form.title || !form.category) {
      toast.error("Please fill in all required fields and select a file.");
      return;
    }
    try {
      const buf = await form.file.arrayBuffer();
      const blob = ExternalBlob.fromBytes(
        new Uint8Array(buf),
      ).withUploadProgress((p) => setUploadProgress(p));
      await addRelease.mutateAsync({
        title: form.title,
        description: form.description,
        category: form.category,
        file: blob,
        isPublished: form.isPublished,
      });
      toast.success("Free release uploaded!");
      onClose();
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <Card
      data-ocid="admin_releases.upload_form"
      className="bg-card border-primary/30 mb-6"
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-semibold text-foreground">
            Upload Free Release
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-ocid="admin_releases.close_button"
            className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200"
            aria-label="Close form"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-1.5 block">
              File <span className="text-destructive">*</span>
            </Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="admin_releases.dropzone"
              className="w-full border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors duration-200"
            >
              {form.file ? (
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    {form.file.name}
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload file
                  </p>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFile}
              data-ocid="admin_releases.upload_button"
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
                htmlFor="release-title"
                className="text-sm text-muted-foreground mb-1.5 block"
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="release-title"
                data-ocid="admin_releases.title.input"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Arctic Icons Pack v1.0"
                className="bg-muted/40 border-border"
              />
            </div>
            <div>
              <Label
                htmlFor="release-category"
                className="text-sm text-muted-foreground mb-1.5 block"
              >
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="release-category"
                data-ocid="admin_releases.category.input"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="e.g. Icons, UI Kit"
                className="bg-muted/40 border-border"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="release-desc"
              className="text-sm text-muted-foreground mb-1.5 block"
            >
              Description
            </Label>
            <Textarea
              id="release-desc"
              data-ocid="admin_releases.description.textarea"
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
                id="release-published"
                data-ocid="admin_releases.published.switch"
                checked={form.isPublished}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, isPublished: v }))
                }
              />
              <Label
                htmlFor="release-published"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Publish immediately
              </Label>
            </div>
            <Button
              type="submit"
              size="sm"
              data-ocid="admin_releases.submit_button"
              disabled={addRelease.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {addRelease.isPending ? "Uploading…" : "Upload Release"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function AdminReleasesContent() {
  const { data: releases, isLoading } = useFreeReleases();
  const deleteRelease = useDeleteFreeRelease();
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: bigint) => {
    deleteRelease.mutate(id, {
      onSuccess: () => toast.success("Release deleted."),
      onError: () => toast.error("Delete failed."),
    });
  };

  return (
    <div className="container py-12" data-ocid="admin_releases.page">
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
            Free Releases
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage free community downloads
          </p>
        </div>
        <Button
          type="button"
          data-ocid="admin_releases.add_button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Cancel" : "Add Release"}
        </Button>
      </div>

      {showForm && <UploadFormPanel onClose={() => setShowForm(false)} />}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-20 w-full" />
          ))}
        </div>
      ) : !releases || releases.length === 0 ? (
        <div
          data-ocid="admin_releases.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-lg"
        >
          <Package className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No free releases yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload your first community asset
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {releases.map((release, i) => (
            <ReleaseCard
              key={release.id.toString()}
              release={release}
              index={i + 1}
              onDelete={() => handleDelete(release.id)}
              deleting={deleteRelease.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminReleasesPage() {
  return (
    <Layout>
      <AuthGuard>
        <AdminReleasesContent />
      </AuthGuard>
    </Layout>
  );
}
