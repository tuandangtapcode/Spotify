import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ContentStyled } from 'src/pages/ANONYMOUS/HomePage/styled'
import ModalUpdatePlaylist from './components/ModalUpdatePlaylist'
import { TitleStyled } from './styled'
import UserService from 'src/services/UserService'
import HeaderLayout from 'src/components/Layout/components/HeaderLayout'
import { gradientLovePlaylist, gradientPlaylist } from 'src/lib/constant'
import { ButtonCicleStyled } from 'src/components/ButtonCustom/ButtonCircle/styled'
import { handleSetCurrentMusic, setLocalStorage } from 'src/lib/commonFunction'
import globalSlice from 'src/redux/globalSlice'
import ListIcons from 'src/components/ListIcons'
import { globalSelector } from 'src/redux/selector'
import { DotStyled } from 'src/pages/ANONYMOUS/SignupPage/styled'
import TableListSong from 'src/components/TableCustom/TableListSong'

const PlaylistDetail = () => {

  const { PlaylistID } = useParams()
  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const [playlist, setPlaylist] = useState({})
  const [openUpdatePlaylist, setOpenUpdatePlaylist] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const getDetailPlaylist = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailPlaylist(PlaylistID)
      if (res?.isError) navigate('/not-found')
      setPlaylist(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailPlaylist()
  }, [PlaylistID])


  return (
    <>
      <HeaderLayout
        background={
          playlist?.Title === "Bài hát yêu thích"
            ? gradientLovePlaylist
            : gradientPlaylist
        }
      >
        <div className='d-flex'>
          <div className='image mr-24' onClick={() => setOpenUpdatePlaylist(playlist)}>
            <img style={{ width: '230px', height: '230px' }} src={playlist?.AvatarPath} alt='' />
          </div>
          <div className='infor d-flex flex-column justify-content-center'>
            <div>Playlist</div>
            <div
              className='fs-80 fw-800 mb-16 mt-16'
              onClick={() => setOpenUpdatePlaylist(playlist)}
              style={{ cursor: 'default' }}
            >
              <TitleStyled>
                {playlist?.Title}
              </TitleStyled>
            </div>
            <div className='d-flex'>
              <div
                className='fw-700 fs-18'
                onClick={() => setOpenUpdatePlaylist(playlist)}
                style={{ cursor: 'default' }}
              >
                {global?.user?.FullName}
              </div>
              {
                !!playlist?.Songs?.length &&
                <>
                  <DotStyled />
                  <div>
                    <span className="mr-4 fw-600">{playlist?.Songs?.length}</span>
                    <span className="mr-4 fw-600">bài hát</span>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </HeaderLayout>
      <ContentStyled className=" text mt-16">
        <ButtonCicleStyled
          className='mediumCircle greendBackgroundColor icon-play mr-25 mb-25'
          icon={
            (!!playlist?.Songs?.find(i => i?._id === global?.currentSong?._id) &&
              global?.isPlay)
              ? ListIcons.ICON_PAUSE_FS_30
              : ListIcons.ICON_PLAY_FS_30
          }
          onClick={() => {
            if (!!playlist?.Songs.length) {
              handleSetCurrentMusic(global?.user?._id, playlist?.Songs[0], dispatch, navigate)
              setLocalStorage("songs", JSON.stringify(playlist?.Songs))
              dispatch(globalSlice.actions.setSongs(playlist?.Songs))
              dispatch(globalSlice.actions.setIsPlay(!global?.isPlay))
            }
          }}
        />
        {
          !!playlist?.Songs?.length &&
          <TableListSong
            songs={playlist?.Songs}
            getDetailPlaylist={getDetailPlaylist}
          />
        }
      </ContentStyled>

      {
        !!openUpdatePlaylist &&
        <ModalUpdatePlaylist
          open={openUpdatePlaylist}
          onCancel={() => setOpenUpdatePlaylist(false)}
          onOk={() => getDetailPlaylist()}
        />
      }
    </>
  )
}

export default PlaylistDetail