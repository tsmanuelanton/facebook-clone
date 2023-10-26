import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../client";
import type { User } from "@/types/user";

const usersCollection = collection(db, "users");

export const getUser = async (id: string) => {
  const snapshot = await getDoc(doc(db, "users", id));
  const user = {
    ...snapshot.data(),
    id: snapshot.id,
    friends: snapshot.get("friends").map((ref: DocumentReference) => ref.id),
  } as User;
  return user;
};

export const getUsers = async () => {
  return getDocs(query(usersCollection)).then(({ docs }) =>
    docs.map((snapshot) => ({
      ...snapshot.data(),
      id: snapshot.id,
      friends: snapshot.get("friends").map((ref: DocumentReference) => ref.id),
    } as User))
  );
};

export const addUser = async ({ email, password, name, image, friends }: User) => {
  const docRef = await addDoc(usersCollection, {
    email,
    password,
    name,
    image,
    friends: friends.map((userID) => doc(db, "/users/" + userID)),
  });

  return docRef.id
};
