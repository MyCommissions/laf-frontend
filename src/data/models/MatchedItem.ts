import { Item } from "./Item";

export interface ClaimInfo {
  imageUuid?: string | null;
  contactNumber?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  timeOfClaim?: string | Date | null;
}

export interface MatchedItem {
  _id: string;
  lostItem: Item | string;
  foundItem: Item | string;
  status: "pending" | "matched" | "claimed";
  claimedBy?: string | null; // User ID
  claimInfo?: ClaimInfo | null;
  createdAt: string;
  updatedAt: string;
}

// 🟢 API request body for claiming a matched item
export interface ClaimMatchedItemRequest {
  pin: {
    code: string;
  };
  claimInfo: ClaimInfo;
}

// 🟢 API response after claiming
export interface ClaimMatchedItemResponse {
  status: string;
  message: string;
  item: MatchedItem | Item; // sometimes backend returns either type
}
