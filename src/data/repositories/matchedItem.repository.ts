// src/data/repositories/item.repository.ts
import {
  getMatchedAndPendingItemsApi,
} from "../api/matchedItem.api";
import type {
  Item,
} from "../models/Item";

export const matchedItemRepository = {
  getMatchedAndPendingItems: async (): Promise<Item[]> => {
    return await getMatchedAndPendingItemsApi();
  },
};
