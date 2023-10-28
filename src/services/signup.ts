
type SignUpBody = {name: string,surname: string, email: string, password: string }

export const signUp = async ({name,surname, email, password }: SignUpBody) => {
    const res = await fetch(`${window.location.origin}/api/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    });
    if (res.ok)
        return true
    return false
}