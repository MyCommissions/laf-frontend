// domain/usecases/matchedItemUseCases.ts
import { matchedItemRepository } from "../../data/repositories/matchedItem.repository";
import { MatchedItem } from "../../data/models/MatchedItem";

// Fetch matched items
export const getMatchedItemsUseCase = async (): Promise<MatchedItem[]> => {
  return await matchedItemRepository.getMatchedItems();
};

// Claim matched item
export const claimMatchedItemUseCase = async (
  id: string
): Promise<MatchedItem> => {
  return await matchedItemRepository.claimMatchedItem(id);
};
