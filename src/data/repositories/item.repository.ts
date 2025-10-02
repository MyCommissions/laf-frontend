// src/data/repositories/item.repository.ts
import {
  createLostItemApi,
  createFoundItemApi,
  getItemsApi,
  getFoundItemsApi,
} from "../api/item.api";
import type {
  CreateItemRequest,
  CreateItemResponse,
  Item,
} from "../models/Item";

export const itemRepository = {
  getItems: async (): Promise<Item[]> => {
    return await getItemsApi();
  },
  getFoundItems: async (): Promise<Item[]> => {
    return await getFoundItemsApi();
  },
  createLostItem: async (
    newItem: CreateItemRequest | FormData
  ): Promise<CreateItemResponse> => {
    return await createLostItemApi(newItem);
  },
  createFoundItem: async (
    newItem: CreateItemRequest | FormData
  ): Promise<CreateItemResponse> => {
    return await createFoundItemApi(newItem);
  },
};
