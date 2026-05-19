import { type ExternalBlob, createActor } from "@/backend";
import type { GalleryItem } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGalleryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      category: string;
      image: ExternalBlob;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addGalleryItem(
        params.title,
        params.description,
        params.category,
        params.image,
        params.isPublished,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
