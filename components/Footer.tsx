
const Footer = () => {
  return (
    <footer
          className='fixed bottom-0 text-center md:text-2xl lg:text-3xl xl:text-4xl'
    >
      &copy; {new Date().getFullYear()} Tackl
    </footer>
  )
}

export default Footer;