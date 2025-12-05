import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '../store/useStore'

const PrivateRequest = () => {
    const { isAuth } = useStore()

    if (!isAuth) return <Navigate to="/login" />
    return <Outlet />
}

export default PrivateRequest
