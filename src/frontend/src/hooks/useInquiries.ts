import { createActor } from "@/backend";
import type { Inquiry, InquiryStatus } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Inquiry[]>({
    queryKey: ["myInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      clientName: string;
      clientDiscord: string;
      serviceId: bigint;
      serviceName: string;
      customDetails: string;
      priceUSD: number;
      priceRobux: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        params.clientName,
        params.clientDiscord,
        params.serviceId,
        params.serviceName,
        params.customDetails,
        params.priceUSD,
        params.priceRobux,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myInquiries"] });
    },
  });
}

export function useUpdateInquiryStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      status: InquiryStatus;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateInquiryStatus(params.id, params.status, params.notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
