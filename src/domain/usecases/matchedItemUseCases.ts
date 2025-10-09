import { matchedItemRepository } from "../../data/repositories/matchedItem.repository";
import type {
  Item,
} from "../../data/models/Item";

export const getMatchedAndPendingItems = async (): Promise<Item[]> => {
  return await matchedItemRepository.getMatchedAndPendingItems();
};