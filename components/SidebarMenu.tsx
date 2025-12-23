import { authClient, signOut } from "@/lib/client-side-auth-client";
import SignInBtn from "./SignInBtn";

const SidebarMenu = ({ moveIn, setMoveIn }
    : 
    { moveIn: boolean, setMoveIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const session = authClient.useSession()
    const user = session?.data?.user

  return (
    <aside
        className={`h-full w-3/4 min-w-62.5 sm:w-1/2 sm:p-6 xl:w-1/3 p-2 bg-gray-300 right-0 top-0 z-10 flex flex-col fixed
                ${moveIn?'translate-x-0' : 'translate-x-full'} ${moveIn?'opacity-100' : 'opacity-0'} duration-300 ease-in-out`}
    >
        <span 
            className="text-3xl text-gray-800 text-end p-2
                        hover:cursor-pointer hover:text-orange-600 duration-300 ease-out"
            onClick={()=>setMoveIn(false)}>X</span>

        <hr className="border border-white w-full mb-8"/>

        {user?

            <div className='flex flex-col gap-4 mt-4'>
                        <span>{user.name}</span>
                    
                        <button 
                            className='w-35 h-15 bg-orange-500 text-white p-2 rounded-3xl'
                            onClick={()=>signOut()}
                        >
                            Sign out
                        </button>
            </div>
           
        : 
            <div className='flex flex-col gap-4 mt-4'>
                <SignInBtn />
            </div>
        }
    </aside>
  )
}

export default SidebarMenu;