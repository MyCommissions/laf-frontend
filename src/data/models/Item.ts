// src/data/models/Item.ts
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
}

export interface CreateItemRequest {
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
  found?: boolean;
  claimed?: boolean;
  matched?: boolean;
}

export interface CreateItemResponse extends Item {}

export type GetItemsResponse = Item[];

export type LostFoundItem = Item;
export type CreateItemData = CreateItemRequest;

// ✅ this must be exported too
export const CATEGORIES = [
  "Umbrella",
  "Wallet",
  "Cash",
  "Phone",
  "ID",
  "Others",
] as const;
