import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
    cookies.delete("loggedUser", {path :"/"})
    return redirect("/login");
  };