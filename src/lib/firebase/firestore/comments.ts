import {
  doc,
  query,
  getDoc,
  getDocs,
  collection,
  addDoc,
  orderBy,
  where,
  deleteDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../client";
import { PostComment } from "@/types/comments";
import { getPost, updatePost } from "./posts";
import { PostFeedback } from "@/types/posts";

const commentsCollection = collection(db, "comments");

export const getComment = async (id: string) => {
  const commentDoc = await getDoc(doc(db, "comments", id));
  const { user, post, comment, body, created_at } = commentDoc.data()!;
  const commentNormalized: PostComment = {
    id: commentDoc.id,
    userID: user.id,
    postID: post.id,
    commentID: comment?.id,
    body: body,
    created_at,
  };
  return commentNormalized;
};

export const getComments = async (postID?: string) => {
  return getDocs(
    query(
      commentsCollection,
      where("post", "==", doc(db, "/posts/" + postID)),
      orderBy("created_at", "desc")
    )
  ).then(({ docs }) =>
    docs.map((doc) => {
      const comment: PostComment = {
        id: doc.id,
        userID: doc.data().user.id,
        postID: doc.data().post.id,
        created_at: doc.data().created_at.toDate(),
        body: doc.data().body,
        commentID: doc.data().commentRef?.id,
      };
      return comment;
    })
  );
};

export const addComment = async ({
  body,
  postID,
  userID,
  created_at,
  commentID,
}: PostComment) => {
  const newCommentRef = await addDoc(commentsCollection, {
    body,
    post: doc(db, "/posts/" + postID),
    user: doc(db, "/users/" + userID),
    comment: commentID && doc(db, "/comments/" + commentID),
    created_at,
  });

  const post = await getPost(postID);
  post.feedback.comments.push(newCommentRef.id);

  await updatePost({ postID: postID, feedback: post.feedback });
  return newCommentRef.id;
};

export const deleteComment = async (id: string) => {
  const commentRef = await getDoc(doc(db, "/comments/", id));

  // delete comment from associated post
  const { post: postRef } = commentRef.data()!;

  const post = await getPost(postRef.id);
  const newFeedback: PostFeedback = {
    likes: post.feedback.likes,
    comments: post.feedback.comments.filter((commentID) => commentID != id),
  };
  await updatePost({ postID: postRef.id, feedback: newFeedback });

  return deleteDoc(doc(db, "comments", id));
};
