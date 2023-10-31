import {
  deleteComment,
  getComment,
  getComments,
} from "@/lib/firebase/firestore/comments";
import { getPost, updatePost } from "@/lib/firebase/firestore/posts";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { commentID: string } }
) => {
  const { commentID } = params;
  const post = await getComments(commentID);

  if (post == undefined) return Response.error();

  return Response.json(post);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { commentID: string } }
) => {
  const { commentID } = params;
  try {
    const comment = await getComment(commentID);
    
    if (!comment)
      return Response.json({ res: "Unauthorized" }, { status: 403 });

    if (comment.userID !== headers().get("userID"))
      return Response.json({ res: "Comment not found" }, { status: 404 });

    await deleteComment(commentID);
    return Response.json({ res: `Comment ${commentID} removed successfully.` });

  } catch (error) {
    console.log(error);
    
    return Response.json(error, { status: 500 });
  }
};
