// here you can modify your protected routes code


import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = (props) => {
  let auth = {'token':props.status}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes