import client from "./client";
import type {
  Item
} from "../models/Item";
import type {
  ClaimMatchedItemRequest,
  ClaimMatchedItemResponse,
} from "../models/MatchedItem";

// Get all items
export const getMatchedAndPendingItemsApi = async (): Promise<Item[]> => {
  const { data } = await client.get("/item/all");
  return data.items ?? data;
};

export const claimMatchedItemApi = async (
  id: string,
  payload: ClaimMatchedItemRequest | FormData
): Promise<ClaimMatchedItemResponse> => {
  const config =
    payload instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const { data } = await client.post<ClaimMatchedItemResponse>(
    `/item/matched/${id}/claim`,
    payload,
    config
  );

  return data;
};