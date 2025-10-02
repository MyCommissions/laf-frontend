// data/api/matchedItem.api.ts
import axios from "axios";
import { MatchedItem } from "../models/MatchedItem";

const BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all matched items
export const getMatchedItemsApi = async (): Promise<MatchedItem[]> => {
  const res = await axios.get<MatchedItem[]>(`${BASE_URL}/matched-items`, {
    withCredentials: true,
  });
  return res.data;
};

// Claim matched item
export const claimMatchedItemApi = async (id: string): Promise<MatchedItem> => {
  const res = await axios.patch<MatchedItem>(
    `${BASE_URL}/matched-items/${id}/claim`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
