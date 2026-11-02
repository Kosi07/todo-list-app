'use client';

import { signInWithGoogle } from "@/lib/auth-client"

import Image from "next/image"
import googleIcon from '@/public/google.png'
import { useSearchParams } from "next/navigation";

const SignIn = () => {
  const searchParams = useSearchParams()
  const url = searchParams.get('redirect')
  console.log(url, 'url')

  const handleClick = async() => {
    await signInWithGoogle(url)
  }
  
  return (
    <>    
     <div 
        className='flex flex-col gap-15 m-4 p-10 border border-gray-700/20 shadow-sm rounded-xl min-w-77.5'
      >
        <div id='Google' className='flex flex-row gap-2 w-full'>
            <Image 
                src={googleIcon}
                className=''
                alt='google logo'
                width={120}
                height={120}
                onClick={handleClick}
            />

            <div 
              className='border p-2 w-40 h-15 rounded-t-xl rounded-br-xl flex justify-center items-center'
              onClick={handleClick}
            >
              Sign In with Google
            </div>
          </div>
      </div>
    </>
  )
}

export default SignIn