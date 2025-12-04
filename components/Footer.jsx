
const Footer = () => {
  return (
    <footer
          className='fixed bottom-0 bg-gray-100 w-19/20 rounded-lg text-center md:text-2xl lg:text-3xl xl:text-4xl'>
      &copy; {new Date().getFullYear()} ToDo List
    </footer>
  )
}

export default Footer;