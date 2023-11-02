import { NextRequest } from "next/server";
import { addComment } from "@/lib/firebase/firestore/comments";
import { getPost } from "@/lib/firebase/firestore/posts";
import { headers } from "next/headers";
import {
  addFriendRequest,
  getUserPendingFriendRequests,
} from "@/lib/firebase/firestore/friendRequests";
import {
  FRIEND_REQUEST_STATUS,
  FriendRequestType,
} from "@/types/friendRequests";
import { getUser } from "@/lib/firebase/firestore/users";

export const GET = async ({ url }: Request) => {
  const { searchParams } = new URL(url);
  const userID = searchParams.get("userID");
  try {
    let friendRequests: FriendRequestType[] = [];
    if (userID) friendRequests = await getUserPendingFriendRequests(userID);

    return Response.json({ res: friendRequests });
  } catch (error) {
    console.error(error);

    return Response.json("");
  }
};

export const POST = async (request: NextRequest) => {
  const { receiverUserID } = await request.json();

  try {
    if (!await getUser(receiverUserID))
      return Response.json(
        { res: `Friend request not created: User ${receiverUserID} not found` },
        { status: 400 }
      );

    const friendReqeustID = await addFriendRequest({
      senderUserID: headers().get("userID")!,
      receiverUserID,
      requestDate: new Date(),
    });

    return Response.json(
      { res: `Friend request created with id ${friendReqeustID}` },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ res: "Something went wrong" }, { status: 500 });
  }
};
