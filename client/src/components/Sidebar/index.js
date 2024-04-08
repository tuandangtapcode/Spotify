import { ContentPoperLoginStyled, ContentPoperStyled, ContentSidebarStyled, LogoStyled, SidebarStyled } from './styled'
import { Button, Dropdown, Popover, Tooltip } from 'antd'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ButtonCustom from 'src/components/ButtonCustom/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { globalSelector } from 'src/redux/selector'
import { toast } from 'react-toastify'
import globalSlice from 'src/redux/globalSlice'
import LibraryItem from './components/LibraryItem'
import UserService from 'src/services/UserService'
import ListIcons from '../ListIcons'

const Sidebar = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openTooltip, setOpenTooltip] = useState(false)
  const [openPoperCreatePlaylist, setOpenPoperCreatePlaylist] = useState(false)
  const [openPoperLogin, setOpenPoperLogin] = useState(false)
  const global = useSelector(globalSelector)
  const [openModalCreateAlbum, setOpenModalCreateAlbum] = useState(false)
  const dispatch = useDispatch()

  const handleCreatePlaylist = async () => {
    try {
      setLoading(true)
      const res = await UserService.createPlaylist()
      if (res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser({ ...global?.user, Playlists: [...global?.user?.playlists, res?.data] }))
      setOpenPoperCreatePlaylist(false)
      navigate(`/playlist/${res?.data?._id}`)
    } finally {
      setLoading(false)
    }
  }

  const contentPoperLogin = (
    <ContentPoperLoginStyled>
      <p className='text m-0 fs-20 fw-700'>Tạo danh sách phát</p>
      <p className='text mt-8 mb-24 fw-600'>Đăng nhập để tạo và chia sẻ playlist</p>
      <div className='d-flex-end'>
        <ButtonCustom className='fs-15 fw-600 noBackgroundColor' onClick={() => setOpenPoperLogin(false)}>Để sau</ButtonCustom>
        <ButtonCustom
          className='ml-4 fw-700 normal small'
          onClick={() => {
            setOpenPoperLogin(false)
            navigate('/login')
          }}
        >
          Đăng nhập
        </ButtonCustom>
      </div>
    </ContentPoperLoginStyled>
  )

  const itemDropdownCreatePlaylist = [
    {
      key: "1",
      label: (
        !global?.user?._id ?
          <div className='align-items-center'
            onClick={() => {
              setOpenPoperCreatePlaylist(false)
              setOpenPoperLogin(true)
            }}
          >
            {ListIcons.ICON_MUSIC_NOTE}
            Tạo danh sách phát mới
          </div>
          :
          <>
            <div
              className='align-items-center'
              onClick={() => handleCreatePlaylist()}
            >
              {ListIcons.ICON_MUSIC_NOTE}
              Tạo danh sách phát mới
            </div>
            <div
              className='align-items-center'
              onClick={() => {
                setOpenModalCreateAlbum(true)
                setOpenPoperCreatePlaylist(false)
              }}
            >
              {ListIcons.ICON_FOLDER}
              Tạo album nhạc
            </div>
          </>
      )
    }
  ]

  return (
    <SidebarStyled>
      {
        !global?.user?._id ?
          <ContentSidebarStyled>
            <div className='sidebar-top'>
              <div className='mr-6 mb-20 mt-10'>
                <Link to={'/'} style={{ textDecoration: 'none' }} className='align-items-center'>
                  <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
                  <span className='fw-600 text'>Spotify</span>
                </Link>
              </div>

              <div className='mb-20'>
                <NavLink
                  to={'/'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'>{ListIcons.ICON_HOME}</span>
                  <span className='fw-600'>Trang chủ</span>
                </NavLink>
              </div>

              <div className='mb-16'>
                <NavLink
                  to={'/search'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'>{ListIcons.ICON_SEARCH_FS_25}</span>
                  <span className='fw-600'>Tìm kiếm</span>
                </NavLink>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb'>
                <div className='d-flex-sb'>
                  <span className='mr-8 text'>{ListIcons.ICON_BAR}</span>
                  <span className='fw-600 text'>Thư viện</span>
                </div>
                <div>
                  <Dropdown
                    arrow={false}
                    trigger={["click"]}
                    placement="bottomLeft"
                    menu={{
                      items: itemDropdownCreatePlaylist
                    }}
                  >
                    <Tooltip arrow={false} open={openTooltip} color='rgb(46, 43, 43)' title={`Tạo danh sách phát hoặc thư mục`}>
                      <Button
                        className='icon-plus'
                        onClick={() => {
                          setOpenTooltip(false)
                          setOpenPoperCreatePlaylist(!openPoperCreatePlaylist)
                        }}
                        onMouseOver={() => setOpenTooltip(true)}
                        onMouseOut={() => setOpenTooltip(false)}
                        icon={ListIcons.ICON_PLUS}
                      />
                    </Tooltip>
                  </Dropdown>
                </div>
              </div>

              <Popover color='rgb(0, 119, 255)' content={contentPoperLogin} placement="right" open={openPoperLogin}>
                <div className='sidebar-bottom-items'>
                  <p className='ml-12 fs-16 fw-600 text'>Tạo danh sách phát đầu tiên của bạn</p>
                  <p className='ml-12 mb-20 fs-15 text'>Rất dễ! Chúng tôi sẽ giúp bạn</p>
                  <ButtonCustom
                    className='ml-12 fs-15 fw-700 normal medium'
                    onClick={() => setOpenPoperLogin(!openPoperLogin)}
                  >
                    Tạo danh sách phát
                  </ButtonCustom>
                </div>
              </Popover>

              <div className='sidebar-bottom-items'>
                <p className='ml-12 fs-16 fw-600 text'>Hãy cùng tìm và theo dõi một số podcast</p>
                <p className='ml-12 mb-20 fs-15 text'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
                <ButtonCustom className='ml-12 fs-15 fw-700 normal medium'>Duyệt xem podcast</ButtonCustom>
              </div>
            </div>
          </ContentSidebarStyled>
          :
          <ContentSidebarStyled>
            <div className='sidebar-top'>
              <div className='mb-20'>
                <NavLink
                  to={'/'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'>{ListIcons.ICON_HOME}</span>
                  <span className='fw-600'>Trang chủ</span>
                </NavLink>
              </div>

              <div className='mb-16'>
                <NavLink
                  to={'/search'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'>{ListIcons.ICON_SEARCH_FS_25}</span>
                  <span className='fw-600'>Tìm kiếm</span>
                </NavLink>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb mb-12' style={{ padding: '12px' }}>
                <div className='d-flex-sb'>
                  <span className='mr-8 text'>{ListIcons.ICON_BAR}</span>
                  <span className='text'>Thư viện</span>
                </div>

                <div>
                  <Dropdown
                    arrow={false}
                    trigger={["click"]}
                    placement="bottomLeft"
                    menu={{
                      items: itemDropdownCreatePlaylist
                    }}
                  >
                    <Tooltip arrow={false} open={openTooltip} color='rgb(46, 43, 43)' title={`Tạo danh sách phát hoặc thư mục`}>
                      <ButtonCustom
                        className='icon-plus'
                        onClick={() => {
                          setOpenTooltip(false)
                          setOpenPoperCreatePlaylist(!openPoperCreatePlaylist)
                        }}
                        onMouseOver={() => setOpenTooltip(true)}
                        onMouseOut={() => setOpenTooltip(false)}
                        icon={ListIcons.ICON_PLUS}
                      />
                    </Tooltip>
                  </Dropdown>
                  <Button
                    className='icon-plus'
                    icon={ListIcons.ICON_ARROW_RIGHT}
                  />
                </div>
              </div>

              <div className='sidebar-bottom-content'>
                <div>
                  {
                    (!!global?.user?.LoveSongs?.length ||
                      !!global?.user?.Playlists?.length ||
                      !!global?.user?.Albums?.length
                    ) ?
                      (
                        [
                          ...global?.user?.LoveSongs,
                          ...global?.user?.Playlists,
                          ...global?.user?.Albums
                        ].sort((a, b) => {
                          return new Date(b?.addedAt) - new Date(a?.addedAt)
                        }).map(i =>
                          <LibraryItem
                            libraryItem={i}
                          />
                        )
                      )
                      :
                      <div>
                        <div className='sidebar-bottom-items'>
                          <p className='ml-12 fs-16 fw-600 text'>Tạo danh sách phát đầu tiên của bạn</p>
                          <p className='ml-12 mb-20 fs-15 text'>Rất dễ! Chúng tôi sẽ giúp bạn</p>
                          <ButtonCustom
                            className='ml-12 fs-15 fw-700 normal medium'
                            onClick={() => handleCreatePlaylist()}
                          >
                            Tạo danh sách phát
                          </ButtonCustom>
                        </div>

                        <div className='sidebar-bottom-items'>
                          <p className='ml-12 fs-16 fw-600 text'>Hãy cùng tìm và theo dõi một số podcast</p>
                          <p className='ml-12 mb-20 fs-15 text'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
                          <ButtonCustom className='ml-12 fs-15 fw-700 normal medium'>Duyệt xem podcast</ButtonCustom>
                        </div>
                      </div>
                  }
                </div>
              </div>
            </div>
          </ContentSidebarStyled>
      }

    </SidebarStyled >
  )
}

export default Sidebar