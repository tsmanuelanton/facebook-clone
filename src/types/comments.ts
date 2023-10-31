export type PostComment = {
    id: string;
    userID: string;
    postID: string,
    commentID: string | null,
    body: {text?:string, image?: string};
    created_at: Date;
}

export type CreateCommentType = {
    postID: string,
    commentID: string | null,
    body: {text: string | null, image:string | null},
}