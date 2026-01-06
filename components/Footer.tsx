
const Footer = () => {
  return (
    <footer
          className='fixed bottom-0 text-lg text-gray-600 text-center md:text-lg lg:text-xl xl:text-xl'
    >
      &copy; {new Date().getFullYear()} Tackl
    </footer>
  )
}

export default Footer