import { deletePost, getPost } from "@/lib/firebase/firestore/posts";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: {params: {postID : string}}) => {
  const { postID } = params;
  const post = await getPost(postID)

  if (post == undefined)
    return Response.error();

  return Response.json(post);
};

export const DELETE = async (req: NextRequest, { params }: {params: {postID : string}}) => {
  const { postID } = params;

  const post = await getPost(postID)
  console.log(post)
  console.log(headers().get("userID"))
  if (post.userID === headers().get("userID")) {
    await deletePost(postID)
    return Response.json({res: `Post ${postID} removed successfully.`})
  }

    return Response.json("Unauthorized", {status: 403});
};