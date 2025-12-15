import H1 from './H1';

function HamburgerIcon({ color, handleClick } : {color: string, handleClick: React.Dispatch<React.SetStateAction<boolean>>}){
    return(
      <svg 
        className={`w-15 h-full ${color} 
                    hover:cursor-pointer hover:text-gray-300 active:text-gray-200 duration-100`}
        onClick={()=>handleClick(true)}
        viewBox='0 0 24 24' 
        fill='none' 
        stroke='currentColor'
      >
        <line x1='3' y1='6' x2='21' y2='6' strokeWidth='2' />
        <line x1='3' y1='12' x2='21' y2='12' strokeWidth='2' />
        <line x1='3' y1='18' x2='21' y2='18' strokeWidth='2' />
      </svg>
    )
  }

const Header = ({ setMoveIn }: { setMoveIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <header  className='w-full border-b rounded-xl border-orange-400 border-double'>
        <nav className='px-1 py-3 flex flex-row gap-9'>
            <HamburgerIcon
              color='text-gray-500'
              handleClick={setMoveIn}
            />

            <H1 />
        </nav>
    </header>
  )
}

export default Header;