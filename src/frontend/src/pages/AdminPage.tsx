import { InquiryStatus } from "@/backend";
import { AuthGuard } from "@/components/AuthGuard";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFreeReleases } from "@/hooks/useFreeReleases";
import { useGalleryItems } from "@/hooks/useGallery";
import { useInquiries } from "@/hooks/useInquiries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  FileText,
  Image,
  MessageSquare,
  Package,
  TrendingUp,
} from "lucide-react";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  loading,
  ocid,
}: {
  label: string;
  value: number;
  sub?: string;
  icon: React.ElementType;
  loading: boolean;
  ocid: string;
}) {
  return (
    <Card
      data-ocid={ocid}
      className="bg-card border-border relative overflow-hidden"
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <p className="font-display text-3xl font-bold text-foreground">
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </>
        )}
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
    </Card>
  );
}

const QUICK_LINKS = [
  {
    icon: MessageSquare,
    label: "Manage Inquiries",
    desc: "Review client inquiries & update statuses",
    href: "/admin/inquiries",
    ocid: "admin.inquiries_link",
  },
  {
    icon: Image,
    label: "Manage Gallery",
    desc: "Upload and publish portfolio work",
    href: "/admin/gallery",
    ocid: "admin.gallery_link",
  },
  {
    icon: Package,
    label: "Manage Free Releases",
    desc: "Upload downloadable community assets",
    href: "/admin/releases",
    ocid: "admin.releases_link",
  },
];

function AdminDashboardContent() {
  const { data: inquiries, isLoading: inqLoading } = useInquiries();
  const { data: gallery, isLoading: galLoading } = useGalleryItems();
  const { data: releases, isLoading: relLoading } = useFreeReleases();

  const pending =
    inquiries?.filter((i) => i.status === InquiryStatus.Pending).length ?? 0;
  const inReview =
    inquiries?.filter((i) => i.status === InquiryStatus.InReview).length ?? 0;

  return (
    <div className="container py-12" data-ocid="admin.page">
      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs"
            >
              Admin Panel
            </Badge>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back — Frost &amp; Bear Designs Operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard
          label="Total Inquiries"
          value={inquiries?.length ?? 0}
          sub={`${inReview} in review`}
          icon={MessageSquare}
          loading={inqLoading}
          ocid="admin.stat.total_inquiries"
        />
        <StatCard
          label="Pending Inquiries"
          value={pending}
          sub="awaiting response"
          icon={Clock}
          loading={inqLoading}
          ocid="admin.stat.pending_inquiries"
        />
        <StatCard
          label="Gallery Items"
          value={gallery?.length ?? 0}
          sub={`${gallery?.filter((g) => g.isPublished).length ?? 0} published`}
          icon={Image}
          loading={galLoading}
          ocid="admin.stat.gallery_items"
        />
        <StatCard
          label="Free Releases"
          value={releases?.length ?? 0}
          sub={`${releases?.filter((r) => r.isPublished).length ?? 0} published`}
          icon={Package}
          loading={relLoading}
          ocid="admin.stat.free_releases"
        />
      </div>

      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ icon: Icon, label, desc, href, ocid }) => (
            <Link key={href} to={href}>
              <Card
                data-ocid={ocid}
                className="bg-card border-border hover:border-primary/50 transition-smooth group cursor-pointer h-full"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0 mt-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Layout>
      <AuthGuard>
        <AdminDashboardContent />
      </AuthGuard>
    </Layout>
  );
}
