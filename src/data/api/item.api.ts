// src/data/api/item.api.ts
import client from "./client";
import type {
  Item,
  CreateItemRequest,
  CreateItemResponse,
} from "../models/Item";

// Get all items
export const getItemsApi = async (): Promise<Item[]> => {
  const { data } = await client.get("/item");
  return data.items ?? data;
};

export const getFoundItemsApi = async (): Promise<Item[]> => {
  const { data } = await client.get("/item/found");
  return data.items ?? data;
};

export const createLostItemApi = async (
  newItem: CreateItemRequest | FormData
): Promise<CreateItemResponse> => {
  const config =
    newItem instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const { data } = await client.post<CreateItemResponse>(
    "/item/lost",
    newItem,
    config
  );
  return data;
};

export const createFoundItemApi = async (
  newItem: CreateItemRequest | FormData
): Promise<CreateItemResponse> => {
  const config =
    newItem instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const { data } = await client.post<CreateItemResponse>(
    "/item/found",
    newItem,
    config
  );
  return data;
};

export const updateItemApi = async (
  id: string,
  updatedData: Partial<Item>
): Promise<Item> => {
  const { data } = await client.put(`/item/pending/${id}`, updatedData);
  return data;
};

export const deleteItemApi = async (
  id: string
): Promise<{ status: string; message: string }> => {
  const { data } = await client.delete(`/item/pending/${id}`);
  return data;
};