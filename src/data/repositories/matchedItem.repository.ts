// src/data/repositories/item.repository.ts
import {
  claimMatchedItemApi,
  getClaimedItemsApi,
  getMatchedAndPendingItemsApi,
} from "../api/matchedItem.api";
import type {
  Item,
} from "../models/Item";
import type {
  ClaimMatchedItemRequest,
  ClaimMatchedItemResponse,
} from "../models/MatchedItem";

export const matchedItemRepository = {
  getMatchedAndPendingItems: async (): Promise<Item[]> => {
    return await getMatchedAndPendingItemsApi();
  },
  claimMatchedItem: async (
    id: string,
    payload: ClaimMatchedItemRequest | FormData
  ): Promise<ClaimMatchedItemResponse> => {
    return await claimMatchedItemApi(id, payload);
  },
  getClaimedItems: async (): Promise<Item[]> => {
    return await getClaimedItemsApi();
  },
};
