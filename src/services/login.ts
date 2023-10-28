
export const login = async ({email, password} : {email : string, password : string}) => {
    const res = await fetch(`${window.location.origin}/api/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (res.ok)
        return await res.json()
    return null
} 