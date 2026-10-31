'use client'
import {signOut} from '@/lib/client-side-auth-client'
const SignOutBtn = () => {
  return (
    <button onClick={signOut}>Sign Out</button>
  )
}

export default SignOutBtn