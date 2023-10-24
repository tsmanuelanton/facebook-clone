import type { Post, PostComment } from "@/types/posts";
import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  orderBy
} from "firebase/firestore";
import { db } from "../client";

const postsCollection = collection(db, "posts");

export const getPost = async (id: string) => {
  const ref = doc(db, "posts", id);
  return getDoc(ref);
};

export const getPosts = async () => {
  return getDocs(query(postsCollection, orderBy("created_at", "desc"))).then(({ docs }) =>
    docs.map((doc) => {

      const { user: userRef, created_at } = doc.data();
      const postOwnerID = userRef.id;
      const likes = doc.data().feedback.likes.map(({ id }: any) => id);
      const comments: PostComment[] = doc
        .data()
        .feedback.comments.map((data: any) => ({
          id: data.id,
          userID: data.user.id,
          text: data.text,
          created_at: data.created_at.toDate(),
        }));

      const post: Post = {
        id: doc.id,
        userID: postOwnerID,
        created_at: created_at.toDate(),
        body: doc.data().body,
        feedback: {
          likes,
          comments,
        },
      };
      return post;
    })
  );
};

export const addPost = async (post: Post) => {
  const { userID, created_at, ...rest } = post;
  const docRef = await addDoc(postsCollection, {
    user: doc(db, "/users/" + userID),
    created_at: new Date(post.created_at),
    ...rest,
  });
  return docRef.id;
};
