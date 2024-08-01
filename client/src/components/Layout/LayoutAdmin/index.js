import Header from "src/components/Header"
import { LayoutAdminStyled } from "./styled"
import { Col, Menu, Row } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { useState } from "react"
import ListIcons from "src/components/ListIcons"
import { menuItem } from "./menuitem"
import socket from "src/utils/socket"
import { removeLocalStorage } from "src/lib/commonFunction"

const LayoutAdmin = ({ children }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    removeLocalStorage('token')
    dispatch(globalSlice.actions.setUser({}))
    socket.disconnect()
    navigate('/login')
  }

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout()
    }
  }

  return (
    <LayoutAdminStyled>
      <Header isAdmin={true} />
      <Row>
        <Col span={collapsed ? 2 : 4}>
          <div
            className="menu-container"
            style={{
              width: collapsed ? "90px" : "100%"
            }}
          >
            <Menu
              inlineCollapsed={collapsed}
              mode="inline"
              onClick={e => handleChangeMenu(e.key)}
              items={menuItem()}
              selectedKeys={location?.pathname}
            />
            <div
              className="collapsed-menu cursor-pointer d-flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <div className="mr-8">
                {collapsed ? ListIcons.ICON_MENUUNFOLD : ListIcons.ICON_MENUFOLD}
              </div>
              {/* <p style={{ display: collapsed ? "none" : "block" }}>Collapsed</p> */}
            </div>
          </div>
        </Col>
        <Col span={collapsed ? 22 : 20}>
          <div className="content-container">
            {children}
          </div>
        </Col>
      </Row>
    </LayoutAdminStyled>
  )
}

export default LayoutAdmin