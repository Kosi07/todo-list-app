
const page = async({params}) => {
    const {handle} = await params
    //If no session, sign in and return here
    //if handle exists in db, send pair request to handle{Tell user ur pair request has been sent}
    //else{This user does not exist}
  return (
    <div>You were invited by @{handle}</div>
  )
}

export default page