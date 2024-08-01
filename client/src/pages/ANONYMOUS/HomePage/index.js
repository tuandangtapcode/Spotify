import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import HomeUser from "./components/HomeUser"
import HomeGuest from "./components/HomeGuest"

const HomePage = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        !!global?.user?._id
          ? <HomeUser />
          : <HomeGuest />
      }
    </>
  )
}

export default HomePage