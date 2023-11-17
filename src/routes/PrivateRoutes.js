import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  return true
}
	
const  PrivateRoutes = ({children}) => {
	
  const auth = useAuth()
	
  return (
    auth ? children : <Navigate to="/login"/>
    )
}
	
export default PrivateRoutes