import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import LayoutAdmin from 'src/components/Layout/LayoutAdmin'
import ForbiddenPage from 'src/pages/ERROR/ForbiddenPage'
import { globalSelector } from "src/redux/selector"


const AdminRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        !!global?.user?._id && global?.user?.RoleID === 1 ?
          <LayoutAdmin>
            <Outlet />
          </LayoutAdmin>
          :
          <ForbiddenPage />
      }
    </>
  )
}

export default AdminRoutes