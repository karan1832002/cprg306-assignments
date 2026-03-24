import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

export interface NewShoppingItem {
  name: string;
  quantity: number;
  category: string;
}

export interface ShoppingItem extends NewShoppingItem {
  id: string;
}

export async function getItems(userId: string): Promise<ShoppingItem[]> {
  const items: ShoppingItem[] = [];
  const itemsCollection = collection(db, "users", userId, "items");
  const q = query(itemsCollection);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docSnap) => {
    items.push({
      id: docSnap.id,
      ...(docSnap.data() as NewShoppingItem),
    });
  });

  return items;
}

export async function addItem(
  userId: string,
  item: NewShoppingItem
): Promise<string> {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
}

export async function deleteItem(
  userId: string,
  itemId: string
): Promise<void> {
  const itemRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemRef);
}