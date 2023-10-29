import type { Post, PostComment } from "@/types/posts";
import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  orderBy,
  deleteDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../client";

const postsCollection = collection(db, "posts");

export const getPost = async (id: string) => {
  const ref = doc(db, "posts", id);
  const data = (await getDoc(ref)).data() as any
  const post : Post =  {
    ...data,
    userID: data.user.id,
  }
  return post;
};

export const getPosts = async () => {
  return getDocs(query(postsCollection, orderBy("created_at", "desc"))).then(
    ({ docs }) =>
      docs.map((doc) => {
        const { user: userRef, created_at } = doc.data();
        const postOwnerID = userRef.id;
        const likes = doc
          .data()
          .feedback.likes.map(({ id }: DocumentReference) => id);
        const comments: PostComment[] = doc
          .data()
          .feedback.comments.map(({ id }: DocumentReference) => id);

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

export const deletePost = async (postID: string) => {
  await deleteDoc(doc(db, "/posts/" + postID));
};
