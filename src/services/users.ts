import { User } from "@/types/user"

export const getUser = async (userID : string) : Promise<User | null>=> {
    const res = await fetch(`${window.location.origin}/api/users/${userID}`)
    if (res.ok){
        const user = await res.json()
        return user
    }
    return null
}

export const getUsers = async () : Promise<User[]>=> {
    const res = await fetch(`${window.location.origin}/api/users`)
    if (res.ok){
        const user = await res.json()
        return user
    }
    return []
}