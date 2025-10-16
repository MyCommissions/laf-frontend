import client from "./client";
import type {
  Item
} from "../models/Item";

// Get all items
export const getMatchedAndPendingItemsApi = async (): Promise<Item[]> => {
  const { data } = await client.get("/item/all");
  return data.items ?? data;
};