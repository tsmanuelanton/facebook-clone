import { PostComment, CreateCommentType } from "@/types/comments"

export const createComment = async (data: CreateCommentType) : Promise<string | null> => {
    const res = await fetch(window.location.origin + "/api/comments", {
        method: "POST",
        body: JSON.stringify(data),
      })
    if (res.ok)
      return res.json()
    return null
}

export const getComment = async (postID: string) : Promise<PostComment | null> => {
  const res = await fetch(`${window.location.origin}/api/comments/${postID}`)
  if (res.ok)
    return res.json()
  return null
}

export const getCommentsByPost = async (postID: string) : Promise<PostComment[]> => {
  const res = await fetch(`${window.location.origin}/api/comments?postID=${postID}`)
  if (res.ok)
    return res.json()
  return []
}

export const deleteComment = async (commentID: string) => {
  const res = await fetch(`${window.location.origin}/api/comments/${commentID}`,{
    method: "DELETE"
  })
  if (res.ok)
    return res.json()
}