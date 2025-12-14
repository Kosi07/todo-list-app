import Link from 'next/link'

const H1 = () => {
  return (
    <h1 
        className='w-full text-start text-4xl font-black
            sm:text-5xl sm:text-center md:text-6xl lg:text-7xl'
    >
        <Link href='/' className='p-2 hover:cursor-pointer hover:text-gray-600 active:text-gray-600 duration-100'>Tackl</Link>
    </h1>
  )
}

export default H1