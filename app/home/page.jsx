import Tandem from '@/components/Tandem'
import {db} from '@/app/api/tasks/route'
import { ObjectId } from 'mongodb'
import {auth} from '@/lib/auth'
import { headers } from 'next/headers'

const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = session.user.id
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
            Invite your friend
          </>
    }
    </>
  )
}

export default page