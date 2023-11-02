import {
  FRIEND_REQUEST_STATUS,
  FriendRequestType,
} from "@/types/friendRequests";

export const getUserFriendRequests = async (
  userID: string
): Promise<FriendRequestType[]> => {
  const res = await fetch(
    `${window.location.origin}/api/friend-requests?userID=${userID}`
  );
  if (res.ok) {
    const friendRequests = (await res.json()).res;
    return friendRequests;
  }
  return [];
};

export const changeStatusFriendRequest = async (
  requestID: string,
  newStatus: FRIEND_REQUEST_STATUS
) => {
  const res = await fetch(
    `${window.location.origin}/api/friend-requests/${requestID}`,
    {
      method: "PUT",
      body: JSON.stringify({status: newStatus}),
    }
  );

  if (res.ok) {
    const friendRequests = (await res.json()).res;
    return friendRequests;
  }
};


export const addFriendRequest = async (
  receiverUserID: string,
) => {
  const res = await fetch(
    `${window.location.origin}/api/friend-requests`,
    {
      method: "POST",
      body: JSON.stringify({receiverUserID}),
    }
  );

  if (res.ok) {
    const friendRequests = (await res.json()).res;
    return friendRequests;
  }
};