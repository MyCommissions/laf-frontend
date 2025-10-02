// domain/hooks/useMatchedItems.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMatchedItemsUseCase,
  claimMatchedItemUseCase,
} from "../usecases/matchedItemUseCases";
import { MatchedItem } from "../../data/models/MatchedItem";

// Query: get matched items
export const useGetMatchedItems = () => {
  return useQuery<MatchedItem[], Error>({
    queryKey: ["matchedItems"],
    queryFn: getMatchedItemsUseCase,
  });
};

// Mutation: claim matched item
export const useClaimMatchedItem = () => {
  return useMutation<MatchedItem, Error, string>({
    mutationFn: claimMatchedItemUseCase,
  });
};
