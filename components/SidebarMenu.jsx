
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";

const SidebarMenu = ({ moveIn, setMoveIn }) => {
    const session = true;
  return (
    <aside
        className={`h-[100%] w-3/4 min-w-[250px] sm:w-1/2 sm:p-12 xl:w-1/3 p-6 bg-gray-300 left-0 top-0 z-10 flex flex-col fixed inset-0 
                ${moveIn?'translate-x-0' : '-translate-x-full'} ${moveIn?'opacity-100' : 'opacity-0'} duration-300 ease-in-out`}
    >
        <span 
            className="text-3xl text-gray-800 text-end p-2
                        hover:cursor-pointer hover:text-orange-600 duration-300 ease-out"
            onClick={()=>setMoveIn(false)}>X</span>

        <hr className="border-1 border-white w-full mb-8"/>

        {session && session?.user?

            <div className='flex flex-col gap-4 mt-4'>
                <a href=''>
                    <div className='w-30 h-30 
                                    text-orange-500 text-6xl bg-white border border-black border-dashed rounded-full
                                    flex items-center justify-center'>{session?.user?.name[0]}</div>
                </a>
                <span>{session?.user?.name}</span>
                <button className='w-35 h-15 bg-orange-500 text-white p-2 rounded-3xl'>Logout</button>
            </div>
           
        : 
            <div className='flex flex-col gap-4 mt-4'>
                <SignUpBtn />
                <LoginBtn />
            </div>
        }
    </aside>
  )
}

export default SidebarMenu;