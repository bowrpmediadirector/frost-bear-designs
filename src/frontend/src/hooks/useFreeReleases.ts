import { type ExternalBlob, createActor } from "@/backend";
import type { FreeRelease } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFreeReleases() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FreeRelease[]>({
    queryKey: ["freeReleases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFreeReleases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFreeRelease() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      category: string;
      file: ExternalBlob;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFreeRelease(
        params.title,
        params.description,
        params.category,
        params.file,
        params.isPublished,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["freeReleases"] });
    },
  });
}

export function useDeleteFreeRelease() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFreeRelease(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["freeReleases"] });
    },
  });
}

export function useIncrementDownload() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.incrementDownloadCount(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["freeReleases"] });
    },
  });
}
