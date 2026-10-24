
import { cookie } from '@/fonts'
import Link from 'next/link'
import Landing from '../components/landing-page'
import Tandem from '../components/Tandem'

export default function Home() {
  const session = true
  const pair = true

  return (     
    <>  
      <section></section>       
      <main>
        {!session && <Landing />}

        {session &&
          //fetch pair(); //check session server-side
          pair?
            <Tandem />
          :
          <>
            {/* fetch unique invite link to be copied/shared with friend */}
          </>
        }
      </main>
      <section></section>
    </>
  )
}