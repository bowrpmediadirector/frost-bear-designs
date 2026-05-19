import type {
  Contract,
  ContractStatus,
  FreeRelease,
  GalleryItem,
  Inquiry,
  InquiryStatus,
  Service,
  ServiceCategory,
  UserRole,
} from "@/backend";

export type {
  Contract,
  ContractStatus,
  FreeRelease,
  GalleryItem,
  Inquiry,
  InquiryStatus,
  Service,
  ServiceCategory,
  UserRole,
};

export interface PricingDisplay {
  usd: number;
  robux: bigint;
}

export interface NavLink {
  label: string;
  href: string;
}

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  ELS: "ELS & Lighting",
  Livery: "Custom Liveries",
  Graphics: "Graphics & Branding",
  CommunitySetup: "Community Setup",
  BotDevelopment: "Bot Development",
};

export const INQUIRY_STATUS_LABELS: Record<string, string> = {
  Pending: "Pending",
  InReview: "In Review",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export const CONTRACT_STATUS_LABELS: Record<string, string> = {
  Draft: "Draft",
  Signed: "Signed",
  Completed: "Completed",
};
