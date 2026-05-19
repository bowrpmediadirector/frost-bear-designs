import { createActor } from "@/backend";
import type { Service, ServiceCategory } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServicesByCategory(category: ServiceCategory) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
