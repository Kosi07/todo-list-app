
const Footer = () => {
  return (
    <footer
          className='text-lg text-gray-800 text-center md:text-2xl lg:text-3xl xl:text-4xl'
    >
      &copy; {new Date().getFullYear()} Tackl
    </footer>
  )
}

export default Footer;