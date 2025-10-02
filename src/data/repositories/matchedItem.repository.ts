// data/repositories/matchedItem.repository.ts
import {
  getMatchedItemsApi,
  claimMatchedItemApi,
} from "../api/matchedItem.api";

import { MatchedItem } from "../models/MatchedItem";

export const matchedItemRepository = {
  getMatchedItems: async (): Promise<MatchedItem[]> => {
    return await getMatchedItemsApi();
  },

  claimMatchedItem: async (id: string): Promise<MatchedItem> => {
    return await claimMatchedItemApi(id);
  },
};
