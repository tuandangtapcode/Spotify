import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import MainLayout from "src/components/Layout/MainLayout"
import { globalSelector } from "src/redux/selector"


const UserRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        !!global?.user?._id && global?.user?.RoleID !== 1 ?
          <MainLayout>
            <Outlet />
          </MainLayout>
          :
          <Navigate to={'/guest'} />
      }
    </>
  )
}

export default UserRoutes