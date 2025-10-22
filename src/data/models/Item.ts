// src/data/models/Item.ts

export interface ClaimInfo {
  imageUuid: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  timeOfClaim: string;
  pin?: string; // optional in case you store PIN codes
}

export interface Item {
  _id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  category: "Umbrella" | "Wallet" | "Cash" | "Phone" | "ID" | "Others";
  imageUrl?: string;
  moneyAmount?: number;
  itemSize?: "Small" | "Medium" | "Large";
  itemColor?:
    | "Red"
    | "Orange"
    | "Yellow"
    | "Green"
    | "Blue"
    | "Indigo"
    | "Violet"
    | "Black"
    | "White";
  brandType?: string;
  uniqueIdentifier?: string;
  remarks?: string;
  found: boolean;
  claimed: boolean;
  matched: boolean;
  createdAt: string;
  updatedAt: string;
  status?: "Pending" | "Matched" | "Claimed"; // added "Claimed"
  type?: "lost" | "found";

  // ✅ Added nested structure for matched/pending records
  foundItem?: Item;
  lostItem?: Item;

  // ✅ Added claim info for claimed items
  claimInfo?: ClaimInfo;
}

export interface CreateItemRequest {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  category: "Umbrella" | "Wallet" | "Keys" | "Phone" | "ID" | "Cash" | "Others";
  imageUrl?: string;
  moneyAmount?: number;
  itemSize?: "Small" | "Medium" | "Large";
  itemColor?:
    | "Red"
    | "Orange"
    | "Yellow"
    | "Green"
    | "Blue"
    | "Indigo"
    | "Violet"
    | "Black"
    | "White";
  brandType?: string;
  uniqueIdentifier?: string;
  remarks?: string;
  found?: boolean;
  claimed?: boolean;
  matched?: boolean;
  claimInfo?: ClaimInfo; // ✅ also add here to support claim creation
}

export interface CreateItemResponse extends Item {}

export type GetItemsResponse = Item[];

export type LostFoundItem = Item;
export type CreateItemData = CreateItemRequest;

// ✅ keep your constants unchanged
export const CATEGORIES = [
  "Umbrella",
  "Wallet",
  "Cash",
  "Phone",
  "ID",
  "Others",
] as const;
