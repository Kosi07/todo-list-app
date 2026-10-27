import {auth} from '@/lib/auth'
import { headers } from 'next/headers'
import InviteeWaiting from '../../../components/InviteeWaiting'

const page = async({params}) => {
    const {handle} = await params
    //If no session, sign in and return here
    //if handle exists in db, send pair request to handle{Tell user ur pair request has been sent}
    //else{This user does not exist}

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if(!session){console.log('no session')}
  return (
    <main className='bg-paper'>
      {!session.user.handle===handle?
        <div>You can't pair with yourself</div>
      :
        <div>
          You were invited by @{handle}
          {session && <InviteeWaiting inviterHandle={handle}/>}
        </div>
      }
    </main>
  )
}

export default page