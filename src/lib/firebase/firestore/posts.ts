import type { Post, PostFeedback, UpdatePostType } from "@/types/posts";
import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  orderBy,
  deleteDoc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../client";

const postsCollection = collection(db, "posts");

export const getPost = async (id: string) => {
  const ref = doc(db, "posts", id);
  const {user, body, created_at, feedback, } = (await getDoc(ref)).data() as any;
  const post: Post = {
    id,
    userID: user.id,
    body,
    feedback: {
      likes: feedback.likes,
      comments: feedback.comments.map((ref : DocumentReference) => ref.id)
    },
    created_at
  };
  return post;
};

export const getPosts = async () => {
  return getDocs(query(postsCollection, orderBy("created_at", "desc"))).then(
    ({ docs }) =>
      docs.map((doc) => {
        const { user: userRef, created_at, feedback } = doc.data();
        const postOwnerID = userRef.id;
        const likes: string[] = feedback.likes.map(
          ({ id }: DocumentReference) => id
        );
        const comments: string[] = feedback.comments.map(
          ({ id }: DocumentReference) => id
        );

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
export const updatePost = async ({
  postID,
  body,
  feedback,
}: UpdatePostType) => {
  let feedbackAsRef;

  if (feedback){
    const commentsASRef = await Promise.all(feedback.comments.map(async commentID => doc(db, "comments", commentID)))
    feedbackAsRef = {likes: feedback.likes, comments: commentsASRef}
  }

  let toUpdate = {};
  toUpdate = Object.assign(toUpdate, body && { body }, feedbackAsRef && {feedback : feedbackAsRef});

  updateDoc(doc(db, "posts", postID), toUpdate);
};
