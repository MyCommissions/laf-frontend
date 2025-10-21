import { matchedItemRepository } from "../../data/repositories/matchedItem.repository";
import type {
  Item,
} from "../../data/models/Item";
import type {
  ClaimMatchedItemRequest,
  ClaimMatchedItemResponse,
} from "../../data/models/MatchedItem";

export const getMatchedAndPendingItems = async (): Promise<Item[]> => {
  return await matchedItemRepository.getMatchedAndPendingItems();
};

export const claimMatchedItem = async (
  id: string,
  payload: ClaimMatchedItemRequest | FormData
): Promise<ClaimMatchedItemResponse> => {
  return await matchedItemRepository.claimMatchedItem(id, payload);
};