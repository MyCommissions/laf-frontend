// src/data/models/Item.ts

export interface ClaimInfo {
  imageUuid: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  timeOfClaim: string;
  pin?: string; // optional in case you store PIN codes
}

// 🆕 Define structure for matched partner info
export interface MatchedWithInfo {
  _id: string;
  category: string;
  itemColor?: string;
  type: "lost" | "found";
}

export interface Item {
  _id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  category:
    | "Umbrella"
    | "Wallet"
    | "Cash"
    | "Phone"
    | "ID"
    | "Others"
    | "Keys"
    | "Documents"
    | "Accessories"
    | "Gadgets";
  imageUrl?: string;
  moneyAmount?: number;
  itemSize?: "Small" | "Medium" | "Large";
  itemColor?:
    | "Black"
    | "White"
    | "Gray"
    | "Blue"
    | "Red"
    | "Green"
    | "Yellow"
    | "Brown"
    | "Pink"
    | "Purple"
    | "Orange"
    | "Gold"
    | "Silver"
    | "Beige / Cream"
    | "Transparent / Clear";
  brandType?: string;
  uniqueIdentifier?: string;
  remarks?: string;
  found: boolean;
  claimed: boolean;
  matched: boolean;
  createdAt: string;
  updatedAt: string;
  status?: "pending" | "matched" | "claimed"; // lowercase to match backend
  type?: "lost" | "found";

  // ✅ Nested structure for matched/pending records
  foundItem?: Item;
  lostItem?: Item;

  // ✅ Claim info
  claimInfo?: ClaimInfo;

  // ✅ MatchedWith info from backend
  matchedWith?: MatchedWithInfo;
}

export interface CreateItemRequest {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  category:
    | "Umbrella"
    | "Wallet"
    | "Keys"
    | "Phone"
    | "ID"
    | "Cash"
    | "Others"
    | "Documents"
    | "Accessories"
    | "Gadgets";
  imageUrl?: string;
  moneyAmount?: number;
  itemSize?: "Small" | "Medium" | "Large";
  itemColor?:
    | "Black"
    | "White"
    | "Gray"
    | "Blue"
    | "Red"
    | "Green"
    | "Yellow"
    | "Brown"
    | "Pink"
    | "Purple"
    | "Orange"
    | "Gold"
    | "Silver"
    | "Beige / Cream"
    | "Transparent / Clear";
  brandType?: string;
  uniqueIdentifier?: string;
  remarks?: string;
  found?: boolean;
  claimed?: boolean;
  matched?: boolean;
  claimInfo?: ClaimInfo;
}

export interface CreateItemResponse extends Item {}

export type GetItemsResponse = Item[];
export type LostFoundItem = Item;
export type CreateItemData = CreateItemRequest;

// ✅ Categories constant
export const CATEGORIES = [
  "Accessories",
  "Cash",
  "Documents",
  "Gadgets",
  "ID",
  "Keys",
  "Umbrella",
  "Wallet",
  "Others",
] as const;
