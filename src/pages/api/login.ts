import type { APIRoute } from "astro";
import { users } from "./users";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const credentials = await request.json();

  let body,
    options = { headers: { "content-type": "application/json" }, status: 200 };

  try {
    const user = users.find(
      (e) =>
        e.email === credentials.email && e.password === credentials.password
    );
    if (user) {
      body = JSON.stringify(user);
      const now = new Date();
      now.setTime(now.getTime() + (24*60*60*1000));
      cookies.set("loggedUser", user.id, {expires: now, path:"/"});
    } else {
      body = JSON.stringify({ res: `Wrong email or password` });
      options.status = 401;
    }
  } catch (error) {
    body = null;
    options.status = 500;
  } finally {
    return new Response(body, options);
  }
};
