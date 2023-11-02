import {
  getFriendRequest,
  updateFriendRequest,
} from "@/lib/firebase/firestore/friendRequests";
import { addFriend } from "@/lib/firebase/firestore/users";
import { FRIEND_REQUEST_STATUS } from "@/types/friendRequests";
import { headers } from "next/headers";

export const PUT = async (
  { json }: Request,
  { params }: { params: { requestID: string } }
) => {
  const { requestID } = params;
  const { status } = await json();

  const userID = headers().get("userID");

  try {
    const friendRequest = await getFriendRequest(requestID);
    if (friendRequest.receiverUserID !== userID)
      return Response.json({ res: "Unauthorized" }, { status: 403 });

    if (friendRequest.status !== FRIEND_REQUEST_STATUS.PENDING)
      return Response.json({ res: "Operation invalid" }, { status: 409 });

    if (status === FRIEND_REQUEST_STATUS.ACCEPTED) {
      const { senderUserID, receiverUserID } = friendRequest;
      await addFriend(senderUserID, receiverUserID);
      await updateFriendRequest({
        requestID,
        newStatus: FRIEND_REQUEST_STATUS.ACCEPTED,
      });
      return Response.json({
        res: `Friend request ${requestID} updated from ${FRIEND_REQUEST_STATUS.PENDING} to ${status}.`,
      });
    } else if (status === FRIEND_REQUEST_STATUS.DECLINED) {
      await updateFriendRequest({
        requestID,
        newStatus: FRIEND_REQUEST_STATUS.DECLINED,
      });
      return Response.json({
        res: `Friend request ${requestID} updated from ${FRIEND_REQUEST_STATUS.PENDING} to ${status}.`,
      });
    }
    return Response.json({ res: "Operation invalid" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ res: "Something went wrong :c" }, { status: 500 });
  }
};
