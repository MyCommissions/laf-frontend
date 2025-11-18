// src/domain/hooks/useItems.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFoundItems,
  createLostItem,
  createFoundItem,
  updateItem,
  deleteItem,
} from "../usecases/itemUseCases";
import { getClaimedItems, getMatchedAndPendingItems } from "../usecases/matchedItemUseCases";
import type {
  CreateItemRequest,
  CreateItemResponse,
  Item,
} from "../../data/models/Item";

export function useGetMatchedAndPendingItems() {
  return useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: getMatchedAndPendingItems,
  });
}

export function useGetFoundItems() {
  return useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: getFoundItems,
  });
}

export function useCreateLostItem() {
  const queryClient = useQueryClient();

  return useMutation<CreateItemResponse, Error, CreateItemRequest | FormData>({
    mutationFn: createLostItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useCreateFoundItem() {
  const queryClient = useQueryClient();

  return useMutation<CreateItemResponse, Error, CreateItemRequest | FormData>({
    mutationFn: createFoundItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useGetClaimedItems() {
  return useQuery<Item[], Error>({
    queryKey: ["claimed-items"],
    queryFn: getClaimedItems,
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, { id: string; updatedData: Partial<Item> }>({
    mutationFn: ({ id, updatedData }) => updateItem(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation<{ status: string; message: string }, Error, string>({
    mutationFn: (id) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}