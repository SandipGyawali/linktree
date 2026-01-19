"use client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../lib/api.client";
import type { LoginSchema } from "../../../schema/auth.schema";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginSchema) => apiClient.fetch("auth/login", {
      method: "POST",
      body: JSON.stringify(payload),    
      credentials: "include"
    })
  })
}

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiClient.fetch("auth/me")
  })
}