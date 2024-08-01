import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { BadgeStyled, HeaderStyled, InputHeaderStyled } from "./styled"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { Dropdown, Tooltip, Empty } from "antd"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import { useEffect, useState } from "react"
import globalSlice from "src/redux/globalSlice"
import ListIcons from "../ListIcons"
import { LogoStyled } from "../Sidebar/styled"
import socket from "src/utils/socket"
import NotificationService from "src/services/NotificationService"
import NotificationItem from "./components/NotificationItem"
import { removeLocalStorage } from "src/lib/commonFunction"

const Header = ({ isAdmin }) => {

  const global = useSelector(globalSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [openTooltip, setOpenTooltip] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notifiNotSeen, setNotifiNotSeen] = useState(0)

  const handleLogout = () => {
    removeLocalStorage('token')
    removeLocalStorage('currentSong')
    removeLocalStorage('currentTime')
    removeLocalStorage('currentSlider')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    navigate('/login')
  }

  const handleSeenNotification = async () => {
    const res = await NotificationService.seenNotification(global?.user?._id)
    if (res?.isError) return
    getNotifications()
  }

  const getNotifications = async () => {
    const res = await NotificationService.getListNotificationByReceiver(global?.user?._id)
    if (res?.isError) return
    setNotifications(res?.data?.List)
    setNotifiNotSeen(res?.data?.NotSeen)
  }

  useEffect(() => {
    if (global?.user?._id) getNotifications()
  }, [])

  const itemsNotification = [
    {
      key: '1',
      label: (
        notifications?.length > 0 ?
          <div style={{ width: '300px', padding: '12px' }}>
            {
              notifications?.map(i =>
                <NotificationItem data={i} />
              )
            }
          </div>
          :
          <Empty description="Chưa có thông báo" />
      )
    }
  ]

  const menuUser = [
    {
      label: 'Hồ sơ',
      key: '1',
      onClick: () => navigate("/profile")
    },
    {
      label: 'Nâng cấp lên Premium',
      key: '2',
    },
    {
      label: 'Hỗ trợ',
      key: '3',
    },
    {
      label: 'Tải xuống',
      key: '4',
    },
    {
      label: 'Cài đặt',
      key: '5',
    },
    {
      label: 'Đăng xuất',
      key: '6',
      onClick: () => handleLogout()
    },
  ]


  return (
    <HeaderStyled
      isAdmin={isAdmin}
      className="d-flex-sb"
    >
      {
        location.pathname.includes('search') ?
          <div className="search">
            <InputHeaderStyled
              allowClear={{ clearIcon: ListIcons.ICON_CLOSE }}
              prefix={ListIcons.ICON_SEARCH_TEXT}
              placeholder='Bạn muốn nghe gì?'
              size="large"
            />
          </div>
          :
          <div></div>
      }
      {global?.user?.RoleID === 1 &&
        <Link to={'/'} style={{ textDecoration: 'none' }} className='align-items-center'>
          <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
          <span className='fw-600 text'>Spotify</span>
        </Link>
      }
      {
        !global?.user?._id ?
          <div className="navigator justify-content-flex-end">
            <ButtonCustom
              className='noBackgroundColor fs-16 fw-600'
              onClick={() => navigate('/signup')}
            >
              Đăng ký
            </ButtonCustom>
            <ButtonCustom
              className='haflLarge normal fs-15 fw-700 ml-25'
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </ButtonCustom>
          </div>
          :
          <div className="navigator d-flex-sb">
            {
              global?.user?.RoleID !== 1 ?
                <>
                  {
                    !location.pathname.includes('search') ?
                      <ButtonCustom
                        className='noBackgroundColor fs-16 fw-600'
                        onClick={() => navigate('/signup')}
                      >
                        Khám phá Premium
                      </ButtonCustom> :
                      <div></div>
                  }

                  <ButtonCustom
                    className='medium noBackgroundColor fs-13 fw-700'
                    icon={ListIcons.ICON_ARROW_DOWN}
                  >
                    Cài đặt Ứng dụng
                  </ButtonCustom>
                  <Dropdown
                    menu={{ items: itemsNotification }}
                    trigger={['click']}
                    onOpenChange={e => {
                      if (!e) {
                        if (notifiNotSeen !== 0) handleSeenNotification()
                      }
                    }}
                  >
                    <BadgeStyled
                      size="small"
                      count={notifiNotSeen}
                      style={{ fontSize: '10px' }}
                    >
                      <ButtonCircle
                        className="noBackgroundColor"
                        icon={ListIcons.ICON_BELL}
                      />
                    </BadgeStyled>
                  </Dropdown>
                  <Tooltip arrow={false} color='rgb(46, 43, 43)' title={global?.user?.FullName} trigger="hover" open={openTooltip}>
                    <Dropdown menu={{ items: menuUser }} trigger={['click']}>
                      <ButtonCircle
                        className="noBackgroundColor"
                        icon={ListIcons.ICON_USER}
                        onMouseOver={() => setOpenTooltip(true)}
                        onMouseOut={() => setOpenTooltip(false)}
                        onClick={() => setOpenTooltip(false)}
                      />
                    </Dropdown>
                  </Tooltip>
                </>
                :
                <>
                  <Dropdown
                    menu={{ items: itemsNotification }}
                    trigger={['click']}
                    onOpenChange={e => {
                      if (!e) {
                        if (notifiNotSeen !== 0) handleSeenNotification()
                      }
                    }}
                  >
                    <BadgeStyled
                      size="small"
                      count={notifiNotSeen}
                      style={{ fontSize: '10px' }}
                    >
                      <ButtonCircle
                        className="noBackgroundColor"
                        icon={ListIcons.ICON_BELL_DASHBOARD}
                      />
                    </BadgeStyled>
                  </Dropdown>
                  <Tooltip arrow={false} color='rgb(46, 43, 43)' title={global?.user?.FullName} trigger="hover" open={openTooltip}>
                    <ButtonCircle
                      className="noBackgroundColor"
                      icon={ListIcons.ICON_USER}
                      onMouseOver={() => setOpenTooltip(true)}
                      onMouseOut={() => setOpenTooltip(false)}
                      onClick={() => setOpenTooltip(false)}
                    />
                  </Tooltip>
                </>
            }
          </div>
      }
    </HeaderStyled>
  )
}

export default Header