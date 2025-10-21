import { useMutation, useQueryClient } from "@tanstack/react-query";
import { claimMatchedItem } from "../usecases/matchedItemUseCases";
import type {
  ClaimMatchedItemRequest,
  ClaimMatchedItemResponse,
} from "../../data/models/MatchedItem";

export function useClaimMatchedItem() {
  const queryClient = useQueryClient();

  return useMutation<
    ClaimMatchedItemResponse,
    Error,
    { id: string; payload: ClaimMatchedItemRequest | FormData }
  >({
    mutationFn: ({ id, payload }) => claimMatchedItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}