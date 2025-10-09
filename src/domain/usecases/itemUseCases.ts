import { itemRepository } from "../../data/repositories/item.repository";
import type {
  CreateItemRequest,
  CreateItemResponse,
  Item,
} from "../../data/models/Item";

export const getItems = async (): Promise<Item[]> => {
  return await itemRepository.getItems();
};

export const getFoundItems = async (): Promise<Item[]> => {
  return await itemRepository.getFoundItems();
};

export const createLostItem = async (
  newItem: CreateItemRequest | FormData
): Promise<CreateItemResponse> => {
  return await itemRepository.createLostItem(newItem);
};

export const createFoundItem = async (
  newItem: CreateItemRequest | FormData
): Promise<CreateItemResponse> => {
  return await itemRepository.createFoundItem(newItem);
};
