
const Footer = () => {
  return (
    <footer
          className='md:text-2xl lg:text-3xl xl:text-4xl'>
      &copy; {new Date().getFullYear()} ToDo List
    </footer>
  )
}

export default Footer;