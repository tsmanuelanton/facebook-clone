export enum FRIEND_REQUEST_STATUS {"PENDING"= "PENDING", "ACCEPTED" ="ACCEPTED" , "DECLINED" = "DECLINED"}

export type FriendRequestType = {
    id: string
    senderUserID: string,
    receiverUserID: string,
    requestDate: Date,
    status: FRIEND_REQUEST_STATUS,
}
