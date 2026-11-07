import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient()

export const signInWithGoogle = async (url: string|null) => {
  try{
    await authClient.signIn.social({
      provider: "google",
      callbackURL: url? url : '/'
    })
  }
  catch(err){
    console.error('Signin Error', err);
  }
}

