import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  DocumentReference,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../client";
import type { UpdateUser, User } from "@/types/user";

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
    docs.map(
      (snapshot) =>
        ({
          ...snapshot.data(),
          id: snapshot.id,
          friends: snapshot
            .get("friends")
            .map((ref: DocumentReference) => ref.id),
        } as User)
    )
  );
};

export const addUser = async ({
  email,
  password,
  name,
  image,
  friends,
}: User) => {
  const docRef = await addDoc(usersCollection, {
    email,
    password,
    name,
    image,
    friends: friends.map((userID) => doc(db, "/users/" + userID)),
  });

  return docRef.id;
};

export const updateUser = async (
  userID: string,
  { image, name, email, password, friends }: UpdateUser
) => {
  const data = Object.assign(
    {},
    image && { image },
    name && { name },
    email && { email },
    password && { password },
    friends && {
      friends: friends.map((friendID) => doc(db, "users", friendID)),
    }
  );

  updateDoc(doc(db, "users", userID), data);
};

export const addFriend = async (userAID: string, userBID: string) => {
  await updateDoc(doc(db, "users", userAID), {
    friends: arrayUnion(doc(db, "users", userBID)),
  });
  await updateDoc(doc(db, "users", userBID), {
    friends: arrayUnion(doc(db, "users", userAID)),
  });
};
