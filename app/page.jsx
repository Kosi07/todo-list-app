
import { cookie } from '@/fonts'
import Link from 'next/link'
import Landing from '../components/landing-page'

export default function Home() {

  return (     
    <>  
      <section></section>       
      <main>
        <Landing />
        <Link href='/home'>Home</Link>
      </main>
      <section></section>
    </>
  )
}