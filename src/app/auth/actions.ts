"use server";

import { redirect } from "next/navigation";

export async function signInWithGithub() {
  const githubSignInURL = new URL(
    "login/oauth/authorize",
    "https://github.com"
  );

  if (!process.env.GITHUB_OAUTH_CLIENT_ID || !process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI) {
    throw new Error("Missing GitHub OAuth environment variables");
  }

  githubSignInURL.searchParams.set('client_id', process.env.GITHUB_OAUTH_CLIENT_ID);
  githubSignInURL.searchParams.set(
    'redirect_uri',
    process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  );
  githubSignInURL.searchParams.set("scope", "user");

  redirect(githubSignInURL.toString());
}
