import React, { useEffect, useState } from "react"
import SpinCustom from "./components/SpinCustom"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "./redux/selector"
import UserService from "./services/UserService"
import globalSlice from "./redux/globalSlice"
import { jwtDecode } from "jwt-decode"
import { ToastContainer } from "react-toastify"
import { getLocalStorage, removeLocalStorage } from "./lib/commonFunction"
import NotFoundPage from "./pages/ERROR/NotFoundPage"


// ADMIN
const AdminRoutes = React.lazy(() => import("src/pages/ADMIN/AdminRoutes"))
const SongManagement = React.lazy(() => import("src/pages/ADMIN/SongManagement"))
const UserManagement = React.lazy(() => import("src/pages/ADMIN/UserManagement"))
const AlbumManagement = React.lazy(() => import("src/pages/ADMIN/AlbumManagement"))

// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import("src/pages/ANONYMOUS/AnonymousRoutes"))
const AlbumDetail = React.lazy(() => import("src/pages/ANONYMOUS/AlbumDetail"))
const HomePage = React.lazy(() => import("src/pages/ANONYMOUS/HomePage"))
const LoginPage = React.lazy(() => import("src/pages/ANONYMOUS/LoginPage"))
const SignupPage = React.lazy(() => import("src/pages/ANONYMOUS/SignupPage"))
const SongDetail = React.lazy(() => import("src/pages/ANONYMOUS/SongDetail"))

// USER
const UserRoutes = React.lazy(() => import("src/pages/USER/UserRoutes"))
const PlaylistDetail = React.lazy(() => import("src/pages/USER/PlaylistDetail"))
const UserProfile = React.lazy(() => import("src/pages/USER/UserProfile"))

const LazyLoadingComponent = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  // ADMIN 
  {
    element: (
      <LazyLoadingComponent>
        <AdminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: "/dashboard/users",
        element: (
          <LazyLoadingComponent>
            <UserManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/dashboard/songs",
        element: (
          <LazyLoadingComponent>
            <SongManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/dashboard/albums",
        element: (
          <LazyLoadingComponent>
            <AlbumManagement />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // USER
  {
    element: (
      <LazyLoadingComponent>
        <UserRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: "/profile",
        element: (
          <LazyLoadingComponent>
            <UserProfile />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/playlist/:PlaylistID",
        element: (
          <LazyLoadingComponent>
            <PlaylistDetail />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <AnonymousRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: "/",
        element: (
          <LazyLoadingComponent>
            <HomePage />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/login",
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/signup",
        element: (
          <LazyLoadingComponent>
            <SignupPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/album/:AlbumID",
        element: (
          <LazyLoadingComponent>
            <AlbumDetail />
          </LazyLoadingComponent>
        )
      },
      {
        path: "/song/:SongID",
        element: (
          <LazyLoadingComponent>
            <SongDetail />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFoundPage />
      </LazyLoadingComponent>
    ),
  },
]

const App = () => {

  const appRoutes = useRoutes(routes)
  const dispatch = useDispatch()
  const global = useSelector(globalSelector)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  console.log("location", location.pathname.split("/")[1]);

  const getDetailProfile = async (token) => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(token)
      if (res?.isError) {
        removeLocalStorage("token")
        return
      }
      // socket.connect()
      dispatch(globalSlice.actions.setUser(res?.data))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!getLocalStorage("token")) {
      const user = jwtDecode(getLocalStorage("token"))
      if (!!user?.payload?.ID) {
        getDetailProfile(getLocalStorage("token"))
      } else {
        navigate('/forbidden')
      }
    }
  }, [])

  useEffect(() => {
    if (!!getLocalStorage("songs")) {
      const songs = getLocalStorage("songs")
      dispatch(globalSlice.actions.setSongs(JSON.parse(songs)))
    }
  }, [getLocalStorage("songs")])


  return (
    <div className="App">
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
      />
      <div>{appRoutes}</div>
    </div>
  )
}

export default App
