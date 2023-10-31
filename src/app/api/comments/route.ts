import { NextRequest } from "next/server";
import { addComment, getComments } from "@/lib/firebase/firestore/comments";
import { PostComment } from "@/types/comments";
import { getPost } from "@/lib/firebase/firestore/posts";
import { headers } from "next/headers";

export const GET = async ({ url }: Request) => {
  const { searchParams } = new URL(url);
  const postID = searchParams.get("postID");
  try {
    let comments: PostComment[] = [];
    if (postID) comments = await getComments(postID);
    else comments = await getComments();

    return Response.json(comments);
  } catch (error) {
    console.error(error);

    return Response.json("");
  }
};

export const POST = async (request: NextRequest) => {
  const { postID, commentID, body } = await request.json();

  try {
    if (await getPost(postID)) {
      const newCommentID = await addComment({
        id: "Temp0",
        postID,
        userID: headers().get("userID")!,
        commentID,
        body,
        created_at: new Date(),
      });
      return Response.json(newCommentID);
    }
    return Response.json({ res: `Post ${postID} not found` }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ res: "Something went wrong" }, { status: 500 });
  }
};
