import Tandem from '@/components/Tandem'
import {db} from '@/app/api/tasks/route'
import { ObjectId } from 'mongodb'
import {auth} from '@/lib/auth'
import { headers } from 'next/headers'
import UnpairedInvite from '../../components/UnpairedInvite'
import { redirect } from 'next/navigation'

const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
      redirect('/sign-in')
    }

    const userId = session.user.id
    const name = session.user.name
    const profilePic = session.user.image
    const handle = session.user.handle
    console.log(userId)

    //fetch pair
    const pair = await db.collection('pairs').findOne({inviter: new ObjectId(userId)})

    if(pair){
        //urtasks, urInfo[profilePic, name, handle], hertasks, herInfo[profilePic, name, handle]
    }
    else{
        //Generate unique invite link
        console.log('Need to generate unique invite link')
    }

  return (
    <>
    {
        pair?
            <Tandem />
        :
          <>
            {/* fetch unique invite link to be copied/shared with friend */}
            <UnpairedInvite name={name} handle={handle} profilePic={profilePic} />
          </>
    }
    </>
  )
}

export default page