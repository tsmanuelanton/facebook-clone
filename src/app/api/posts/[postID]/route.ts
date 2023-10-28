import { getPost } from "@/lib/firebase/firestore/posts";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: {params: {postID : string}}) => {
  const { postID } = params;
  const post = await getPost(postID)

  if (post == undefined)
    return Response.error();

  return Response.json(post);
};