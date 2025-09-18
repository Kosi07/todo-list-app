import Image from 'next/image';
import hamburgerMenuIcon from '@/public/hamburger-menu.svg'

const Header = ({ setMoveIn }) => {
  return (
    <header  className='w-23/25 mt-6 border-b border-t rounded-xl border-orange-400 border-double'>
        <nav className='p-4 flex flex-row gap-9'>
            <Image
                    className='w-7 h-9 md:h-12
                                hover:cursor-pointer'
                    src={hamburgerMenuIcon}
                    alt='hamburger menu icon' 
                    onClick={setMoveIn}
            />

            <h1 
                className='w-full text-start text-4xl font-[900]
                            sm:text-5xl sm:text-center md:text-6xl lg:text-7xl'>
                ToDo List
            </h1>
        </nav>
    </header>
  )
}

export default Header;