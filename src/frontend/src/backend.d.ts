import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Contract {
    id: bigint;
    status: ContractStatus;
    terms: string;
    serviceType: string;
    serviceDetails: string;
    clientName: string;
    totalPriceRobux: bigint;
    createdAt: bigint;
    clientDiscord: string;
    signatureText: string;
    caller: Principal;
    totalPriceUSD: number;
}
export interface Service {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    inclusions: Array<string>;
    priceRobux: bigint;
    category: ServiceCategory;
    priceUSD: number;
}
export interface Inquiry {
    id: bigint;
    status: InquiryStatus;
    serviceName: string;
    clientName: string;
    customDetails: string;
    submittedAt: bigint;
    priceRobux: bigint;
    clientDiscord: string;
    caller: Principal;
    serviceId: bigint;
    priceUSD: number;
    adminNotes: string;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    isPublished: boolean;
    createdAt: bigint;
    description: string;
    category: string;
    image: ExternalBlob;
}
export interface FreeRelease {
    id: bigint;
    title: string;
    isPublished: boolean;
    file: ExternalBlob;
    createdAt: bigint;
    description: string;
    category: string;
    downloadCount: bigint;
}
export enum ContractStatus {
    Draft = "Draft",
    Signed = "Signed",
    Completed = "Completed"
}
export enum InquiryStatus {
    InReview = "InReview",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Pending = "Pending"
}
export enum ServiceCategory {
    ELS = "ELS",
    Livery = "Livery",
    CommunitySetup = "CommunitySetup",
    BotDevelopment = "BotDevelopment",
    Graphics = "Graphics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFreeRelease(title: string, description: string, category: string, file: ExternalBlob, isPublished: boolean): Promise<FreeRelease>;
    addGalleryItem(title: string, description: string, category: string, image: ExternalBlob, isPublished: boolean): Promise<GalleryItem>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createContract(clientName: string, clientDiscord: string, serviceType: string, serviceDetails: string, totalPriceUSD: number, totalPriceRobux: bigint, terms: string): Promise<Contract>;
    deleteFreeRelease(id: bigint): Promise<boolean>;
    deleteGalleryItem(id: bigint): Promise<boolean>;
    getAllContracts(): Promise<Array<Contract>>;
    getCallerUserRole(): Promise<UserRole>;
    getFreeReleases(): Promise<Array<FreeRelease>>;
    getGalleryItems(): Promise<Array<GalleryItem>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getMyContracts(): Promise<Array<Contract>>;
    getMyInquiries(): Promise<Array<Inquiry>>;
    getServices(): Promise<Array<Service>>;
    getServicesByCategory(category: ServiceCategory): Promise<Array<Service>>;
    incrementDownloadCount(id: bigint): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    signContract(id: bigint, signatureText: string): Promise<boolean>;
    submitInquiry(clientName: string, clientDiscord: string, serviceId: bigint, serviceName: string, customDetails: string, priceUSD: number, priceRobux: bigint): Promise<Inquiry>;
    updateInquiryStatus(id: bigint, status: InquiryStatus, notes: string): Promise<boolean>;
}
