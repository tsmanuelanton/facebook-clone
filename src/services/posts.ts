import { Post, PostBody } from "@/types/posts";

export const createPost = async (body: PostBody) : Promise<string | null> => {
    const res = await fetch(window.location.origin + "/api/posts", {
        method: "POST",
        body: JSON.stringify(body),
      })
    if (res.ok)
      return res.json()
    return null
}

export const getPost = async (postID: string) : Promise<Post | null> => {
  const res = await fetch(`${window.location.origin}/api/posts/${postID}`)
  if (res.ok)
    return res.json()
  return null
}

export const getPosts = async () : Promise<Post[]> => {
  const res = await fetch(`${window.location.origin}/api/posts`)
  if (res.ok)
    return res.json()
  return []
}

export const deletePost = async (postID: string) => {
  const res = await fetch(`${window.location.origin}/api/posts/${postID}`,{
    method: "DELETE"
  })
  if (res.ok)
    return res.json()
}