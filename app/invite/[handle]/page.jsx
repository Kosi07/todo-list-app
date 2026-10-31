import {auth} from '@/lib/auth'
import { headers } from 'next/headers'
import InviteeWaiting from '../../../components/InviteeWaiting'
import {db} from '@/app/api/tasks/route'
import {signOut} from '@/lib/client-side-auth-client'
import SignOutBtn from '../../../components/SignOutBtn'

const page = async({params}) => {
    const {handle} = await params
    //If no session, sign in and return here
    //if handle exists in db, send pair request to handle{Tell user ur pair request has been sent}
    //else{This user does not exist}

    const handleExists = await db.collection('user').findOne({handle})
    console.log(handleExists)

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if(!session){console.log('no session')}
  return (
    <main className='bg-paper'>
      {session.user.handle===handle?
        <>
        <div>You can't pair with yourself</div>

        <SignOutBtn />
        </>
      :
        handleExists?
          <div>
            You were invited by @{handle}
            {session && <InviteeWaiting user={session.user} inviter={handleExists && handleExists}/>}
          </div>
        :
          <div>This user '@{handle}' does not exist</div>
      }
    </main>
  )
}

export default page