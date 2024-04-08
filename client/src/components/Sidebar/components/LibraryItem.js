import { useNavigate } from "react-router-dom"
import { LibraryItemStyled } from "../styled"
import { useState } from "react"
import { deletePlaylist } from "src/services/UserService"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import { Dropdown } from "antd"
// import ModalUpdatePlaylist from "src/pages/ANONYMOUS/PlaylistDetail/components/ModalUpdatePlaylist"

const LibraryItem = ({ libraryItem }) => {

  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [modalUpdatePlaylist, setModalUpdatePlaylist] = useState(false)

  // const handleDeletePlaylist = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await deletePlaylist(global?.user?._id, { playlistId: libraryItem?._id })
  //     if (res?.isError) return toast.error(res?.msg)
  //     toast.success(res?.msg)
  //     dispatch(globalSlice.actions.setUser(res?.data))
  //     navigate('/')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const menuPlaylist = data => {
    return [
      {
        label: 'Chỉnh sửa danh sách phát',
        key: '1',
        onClick: () => setModalUpdatePlaylist()
      },
      {
        label: 'Xóa danh sách phát',
        key: '2',
        onClick: () => {
          ConfirmModal({
            title: "Xóa khỏi Thư viện?",
            description: `Thao tác này sẽ xóa ${data?.title} khỏi thư viện.`,
            okText: "Xóa",
            cancelText: "Hủy",
            onOk: async close => {
              // handleDeletePlaylist(data?._id)
              close()
            },
          })
        }
      },
    ]
  }

  return (
    <>
      <Dropdown
        menu={{
          items: menuPlaylist(libraryItem)
        }}
        trigger={['contextMenu']}
      >
        <LibraryItemStyled className="d-flex" onClick={() => navigate(`/playlist/${libraryItem?._id}`)}>
          <div className="image mr-8">
            <img style={{ width: '50px', height: '100%', borderRadius: '8px' }} src={libraryItem?.AvatarPath} alt="" />
          </div>
          <div className="infor d-flex flex-column justify-content-center">
            <div className="text fs-18 fw-600">
              {libraryItem?.Title}
            </div>
            <div className="text-gray-than">
              {libraryItem?.Type}
            </div>
          </div>
        </LibraryItemStyled>
      </Dropdown>
      {/* {
        !!modalUpdatePlaylist &&
        <ModalUpdatePlaylist
          open={modalUpdatePlaylist}
          onCancel={() => setModalUpdatePlaylist(false)}
        />
      } */}
    </>
  )
}

export default LibraryItem