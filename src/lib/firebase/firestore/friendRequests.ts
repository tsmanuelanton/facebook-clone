import {
  doc,
  query,
  getDocs,
  collection,
  addDoc,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../client";
import {
  FRIEND_REQUEST_STATUS,
  FriendRequestType,
} from "@/types/friendRequests";

const friendRequestsCollection = collection(db, "friendRequests");

export const getFriendRequest = async (id: string) => {
  const ref = doc(db, "friendRequests", id);
  const { senderUser, receiverUser, status, requestDate } = (
    await getDoc(ref)
  ).data() as any;
  const request: FriendRequestType = {
    id,
    senderUserID: senderUser.id,
    receiverUserID: receiverUser.id,
    status,
    requestDate,
  };
  return request;
};

export const getUserPendingFriendRequests = async (userID: string) => {
  return getDocs(
    query(
      friendRequestsCollection,
      where("receiverUser", "==", doc(db, `/users/${userID}`)),
      where("status", "==", FRIEND_REQUEST_STATUS.PENDING)
    )
  ).then(({ docs }) =>
    docs.map((doc) => {
      const { receiverUser, senderUser, requestDate, status } = doc.data();
      const friendRequest: FriendRequestType = {
        id: doc.id,
        receiverUserID: receiverUser.id,
        senderUserID: senderUser.id,
        status,
        requestDate: requestDate.toDate(),
      };
      return friendRequest;
    })
  );
};

export const addFriendRequest = async ({
  senderUserID,
  receiverUserID,
  requestDate,
}: {
  senderUserID: string;
  receiverUserID: string;
  requestDate: Date;
}) => {
  const docRef = await addDoc(friendRequestsCollection, {
    senderUser: doc(db, "/users/" + senderUserID),
    receiverUser: doc(db, "/users/" + receiverUserID),
    requestDate,
    status: FRIEND_REQUEST_STATUS.PENDING,
  });

  return docRef.id;
};

export const updateFriendRequest = async ({
  requestID,
  newStatus,
}: {
  requestID: string;
  newStatus: FRIEND_REQUEST_STATUS;
}) => {
  updateDoc(doc(db, "friendRequests", requestID), { status: newStatus });
};
