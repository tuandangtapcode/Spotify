import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { globalSelector } from "src/redux/selector"
import SpinCustom from "src/components/SpinCustom"
import { ContentStyled } from "src/pages/ANONYMOUS/HomePage/styled"
import { TitleStyled } from "../PlaylistDetail/styled"
import { useNavigate } from "react-router-dom"
import ModalUpdateProfile from "./modal/ModalUpdateProfile"
import ProfileArtist from "./components/ProfileArtist"
import ProfileUser from "./components/ProfileUser"
import Header from "src/components/Header"

const UserProfile = () => {

  const global = useSelector(globalSelector)
  const [loading, setLoading] = useState(false)
  const [openModalUpdatePrfile, setOpenUpdateProfile] = useState(false)

  return (
    <SpinCustom spinning={loading}>
      <Header />
      <ContentStyled className=" text">
        <div className='d-flex mb-12'>
          <div className='image mr-24'>
            <img style={{ width: '230px', height: '230px' }} src={global?.user?.AvatarPath} alt='' />
          </div>
          <div className='infor d-flex flex-column justify-content-center'>
            <div
              className='fs-80 fw-800 mb-16 mt-16'
              onClick={() => {
                setOpenUpdateProfile(true)
              }}
              style={{ cursor: 'default' }}
            >
              <TitleStyled>
                {global?.user?.FullName}
              </TitleStyled>
            </div>
            {
              global?.user?.RoleID === 2 &&
              <div>
                Nghệ sĩ
              </div>
            }
          </div>
        </div>

        {
          global?.user?.RoleID === 2
            ? <ProfileArtist setLoading={setLoading} />
            : <ProfileUser />
        }

        {
          !!openModalUpdatePrfile &&
          <ModalUpdateProfile
            open={openModalUpdatePrfile}
            onCancel={() => setOpenUpdateProfile(false)}
          />
        }
      </ContentStyled>
    </SpinCustom>
  )
}

export default UserProfile