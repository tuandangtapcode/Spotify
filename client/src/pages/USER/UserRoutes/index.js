import { jwtDecode } from "jwt-decode"
import { useLayoutEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import MainLayout from "src/components/Layout/MainLayout"
import { getLocalStorage } from "src/lib/commonFunction"
import ForbiddenPage from "src/pages/ERROR/ForbiddenPage"


const UserRoutes = () => {

  const isLogin = getLocalStorage("token")
  const [isUser, setIsUser] = useState(false)

  useLayoutEffect(() => {
    if (!!isLogin) {
      const user = jwtDecode(getLocalStorage("token"))
      if (user?.payload?.RoleID !== 1) setIsUser(true)
    }
  }, [isLogin])

  return (
    <>
      {
        !!isLogin ?
          !!isUser ?
            <MainLayout>
              <Outlet />
            </MainLayout>
            : <ForbiddenPage />
          :
          <Navigate to={'/'} />
      }
    </>
  )
}

export default UserRoutes