
import { signOut } from "@/auth";

const LogoutBtn =  () => {
  return (
    <form action={async ()=>{
                                await signOut({redirectTo: '/'})
                      }
                 }
    >
         <button type='submit'>Logout</button>
    </form>
   
  )
}

export default LogoutBtn