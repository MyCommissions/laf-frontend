// src/data/repositories/item.repository.ts
import {
  createLostItemApi,
  createFoundItemApi,
  getItemsApi,
  getFoundItemsApi,
  updateItemApi,
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
  updateItem: async (id: string, updatedData: Partial<Item>): Promise<Item> => {
    return await updateItemApi(id, updatedData);
  },
};