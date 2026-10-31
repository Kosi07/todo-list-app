import Navigation from "../../components/Nav"

const layout = ({children}) => {
  return (
    <div className='flex mx-auto'>
        {/* <Navigation /> */}
        {children}
    </div>
  )
}

export default layout