import { createActor } from "@/backend";
import type { Contract } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllContracts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Contract[]>({
    queryKey: ["allContracts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContracts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyContracts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Contract[]>({
    queryKey: ["myContracts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyContracts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateContract() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      clientName: string;
      clientDiscord: string;
      serviceType: string;
      serviceDetails: string;
      totalPriceUSD: number;
      totalPriceRobux: bigint;
      terms: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createContract(
        params.clientName,
        params.clientDiscord,
        params.serviceType,
        params.serviceDetails,
        params.totalPriceUSD,
        params.totalPriceRobux,
        params.terms,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myContracts"] });
    },
  });
}

export function useSignContract() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: bigint; signatureText: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.signContract(params.id, params.signatureText);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myContracts"] });
      qc.invalidateQueries({ queryKey: ["allContracts"] });
    },
  });
}
