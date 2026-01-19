import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../lib/api.client";
import { CreateLinkFormValues } from "../../../schema/link.schema";

export const linksKeys = {
  all: ["short_links"] as const,
  lists: (params: { query: string; page?: number; limit?: number }) =>
    [...linksKeys.all, "list", params] as const,
};

export function useFetchLinks(
  query: string,
  page?: number,
  limit?: number
) {
  return useQuery({
    queryKey: linksKeys.lists({ query, page, limit }),
    queryFn: ({ queryKey }) => {
      const [, , params] = queryKey;
      return apiClient.fetch(
        `link?query=${encodeURIComponent(params.query)}&page=${params.page}&limit=${params.limit}`
      );
    },
  });
}


export function useAddLink() {
  return useMutation({
    mutationFn: (payload: CreateLinkFormValues) => apiClient.fetch(`link/create`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  })
}