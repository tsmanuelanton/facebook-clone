export const logout = async () => {
    const res = await fetch(window.location.origin + "/api/logout", {
        method: "POST",
      });
    if (!res.ok)
      throw new Error("Failed login out") 
}