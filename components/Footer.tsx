
const Footer = () => {
  return (
    <footer
          className='text-center md:text-2xl lg:text-3xl xl:text-4xl'>
      &copy; {new Date().getFullYear()} ToDo List
    </footer>
  )
}

export default Footer;