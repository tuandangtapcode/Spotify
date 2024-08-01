import { globalSelector } from "src/redux/selector"
import { useSelector } from "react-redux"
import ItemList from "src/components/ItemList"

const ProfileUser = () => {

  const global = useSelector(globalSelector)

  return (
    <div>
      {
        global?.user?.Playlist?.map(i =>
          <ItemList item={{ ...i, Description: `của ${global?.user?.FullName}` }} />
        )
      }
    </div>
  )
}

export default ProfileUser