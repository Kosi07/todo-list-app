
import { cookie } from '@/fonts'
import Landing from '../components/landing-page'
import {auth} from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth.api.getSession(
    {headers: await headers()}
  )
  if(session){
    redirect('/home')
  }

  return (           
      <main>
        {!session && <Landing />}
      </main>
  )
}