import {auth} from '@/lib/auth'
import { headers } from 'next/headers'
import InviteeWaiting from '../../../components/InviteeWaiting'
import {db} from '@/app/api/tasks/route'
import SignOutBtn from '../../../components/SignOutBtn'
import { redirect } from 'next/navigation'
import { ObjectId } from 'mongodb'

const page = async({params}) => {
    const {handle} = await params
    //If no session, sign in and return here
    //if handle exists in db, send pair request to handle{Tell user ur pair request has been sent}
    //else{This user does not exist}
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
    redirect(`/sign-in?redirect=/invite/${handle}`)
  }

  const handleExists = await db.collection('user').findOne({handle}, {projection: {email: 0, emailVerified: 0}})

  let pairExists 
  if(handleExists){
    pairExists = await db.collection('pairs').findOne({inviter: handleExists._id, invitee: new ObjectId(session.user.id)})
    console.log(pairExists, 'paaaaaaaaaaaaaaaa')
  }

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
            <InviteeWaiting user={session.user} inviter={handleExists} pairExists={pairExists}/>
          </div>
        :
          <div>This user '@{handle}' does not exist</div>
      }
    </main>
  )
}

export default page