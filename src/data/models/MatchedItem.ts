// data/models/MatchedItem.ts
import { Item } from "./Item";

export interface MatchedItem {
  _id: string;
  lostItem: Item | string;
  foundItem: Item | string;
  status: "pending" | "matched" | "claimed";
  claimedBy?: string | null; // User ID
  createdAt: string;
  updatedAt: string;
}
