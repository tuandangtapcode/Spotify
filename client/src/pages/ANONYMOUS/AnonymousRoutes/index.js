import { Navigate, Outlet, useLocation } from "react-router-dom"
import { globalSelector } from "src/redux/selector"
import { useSelector } from "react-redux"
import MainLayout from "src/components/Layout/MainLayout"

const AnonymousRoutes = () => {

  const global = useSelector(globalSelector)
  const location = useLocation()
  const lstLayoutAnonymous = ['login', 'signup']

  return (
    <>
      {
        global?.user?.RoleID !== 1 ?
          lstLayoutAnonymous.some(i => location.pathname.includes(i)) ?
            <Outlet />
            :
            <MainLayout>
              <Outlet />
            </MainLayout>
          :
          <Navigate to={"/dashboard/users"} />
      }
    </>
  )
}

export default AnonymousRoutes