import { useSelector, useDispatch } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { useEffect, useState } from "react"
import { ContentStyled } from "src/pages/ANONYMOUS/HomePage/styled"
import ModalInsertUpdateAlbum from "./components/ModalInsertUpdateAlbum"
import { AvatarArtistStyled } from "./styled"
import { convertSecondsToMinutesAndSeconds } from "src/lib/stringUtils"
import globalSlice from "src/redux/globalSlice"
import SpinCustom from "src/components/SpinCustom"
import ListIcons from "src/components/ListIcons"
import SongService from "src/services/SongService"
import { TitleStyled } from "src/pages/USER/PlaylistDetail/styled"
import AlbumService from "src/services/AlbumService"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import ModalInsertUdpateSong from "src/pages/USER/UserProfile/modal/ModalInsertUpdateSong"
import { ButtonCicleStyled } from "src/components/ButtonCustom/ButtonCircle/styled"
import TableListSong from "src/components/TableCustom/TableListSong"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import { useNavigate, useParams } from "react-router-dom"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import { handleSetCurrentMusic, setLocalStorage } from "src/lib/commonFunction"
import ItemList from "src/components/ItemList"
import moment from "moment"
import { Col, Row, Tooltip } from "antd"
import HeaderLayout from "src/components/Layout/components/HeaderLayout"
import { DotStyled } from "../SignupPage/styled"

const AlbumDetail = () => {

  const { AlbumID } = useParams()
  const global = useSelector(globalSelector)
  const [album, setAlbum] = useState()
  const [songs, setSongs] = useState([])
  const [totalSong, setTotalSong] = useState(0)
  const [totalTime, setTotalTime] = useState([])
  const [buttonShow, setButtonShow] = useState()
  const [openUpdateAlbum, setOpenUpdateAlbum] = useState(false)
  const [openInsertUpdatesong, setOpenInsertUpdateSong] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkStatusFollow = global?.user?.Albums?.some(i =>
    i?._id === AlbumID
      ? "greendBackgroundColor fs-30"
      : "noBackgroundColor fs-30"
  )

  const getDetailAlbum = async () => {
    try {
      setLoading(true)
      const res = await AlbumService.getDetailAlbum(AlbumID)
      if (res?.isError) return navigate("/not-found")
      setAlbum({
        ...res?.data?.Album,
        List: res?.data?.List
      })
      setButtonShow(res?.data?.ButtonShow)
    } finally {
      setLoading(false)
    }
  }

  const getSongByAlbum = async () => {
    try {
      setLoading(true)
      const res = await SongService.getAllSongByAlbum({ AlbumID: album?._id })
      if (res?.isError) navigate('/not-found')
      const totalTime = res?.data?.List.reduce((total, currentValue) => {
        return total + currentValue?.Time
      }, 0)
      const totalTimeString = convertSecondsToMinutesAndSeconds(totalTime)
      const totalTimeArray = totalTimeString.split(':')
      setTotalTime(totalTimeArray)
      setSongs(res?.data?.List)
      setTotalSong(res?.data?.Total)
      dispatch(globalSlice.actions.setSongs(res?.data?.List))
    } finally {
      setLoading(false)
    }
  }

  const handleAddOrDeleteAlbum = async () => {
    try {
      setLoading(true)
      const res = await UserService.addOrDeleteAlbum(album)
      if (res?.isError) return
      dispatch(globalSlice.actions.setUser(res?.data))
      toast.success(res?.msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailAlbum()
  }, [AlbumID])

  useEffect(() => {
    if (!!album) getSongByAlbum()
  }, [album])


  return (
    <SpinCustom spinning={loading}>
      <HeaderLayout
        background={album?.Background}
      >
        <div className='d-flex'>
          <div
            className='image mr-24'
            onClick={() => {
              if (!!buttonShow?.isUpdateAlbum) {
                setOpenUpdateAlbum(album)
              }
            }}>
            <img style={{ width: '230px', height: '230px' }} src={album?.AvatarPath} alt='' />
          </div>
          <div className='infor d-flex flex-column justify-content-center'>
            <div>Album</div>
            <div
              className='fs-80 fw-800 mb-16 mt-16'
              onClick={() => {
                if (!!buttonShow?.isUpdateAlbum) {
                  setOpenUpdateAlbum(album)
                }
              }}
              style={{ cursor: 'default' }}
            >
              <TitleStyled>
                {album?.Title}
              </TitleStyled>
            </div>
            <div className="description d-flex">
              <div className="infor-artist d-flex-sb">
                <AvatarArtistStyled src={album?.Artist?.AvatarPath} alt="" className="mr-4" />
                <span
                  className="text-click fw-600"
                  onClick={() => navigate(`/artist/${album?.Artist?._id}`)}
                >
                  {album?.Artist?.FullName}
                </span>
              </div>
              <DotStyled />
              <Tooltip title={
                `${moment(album?.createdAt).format("DD")} 
                tháng ${moment(album?.createdAt).format("MM")}, 
                ${moment(album?.createdAt).format("YYYY")}`
              }
              >
                <span>{moment(album?.createdAt).format("YYYY")}</span>
              </Tooltip>
              <DotStyled />
              <div>
                <span className="mr-4 fw-600">{totalSong}</span>
                <span className="mr-4 fw-600">bài hát,</span>
                <span className="mr-4 fw-600">{totalTime[0]}</span>
                <span className="mr-4 fw-600">phút</span>
                <span className="mr-4 fw-600">{totalTime[1]}</span>
                <span>giây</span>
              </div>
            </div>
          </div>
        </div>
      </HeaderLayout>
      <ContentStyled className=" text">
        <div className="mt-16 mb-25 d-flex-start">
          {
            !!buttonShow?.isInsertSong ?
              <ButtonCustom
                className="haflLarge normal fw-700 mr-25"
                onClick={() => setOpenInsertUpdateSong({ AlbumID })}
              >
                Thêm bài hát
              </ButtonCustom>
              :
              <>
                <ButtonCicleStyled
                  className='mediumCircle greendBackgroundColor icon-play mr-25'
                  icon={
                    (global?.currentSong?.Album?._id === AlbumID && global?.isPlay)
                      ? ListIcons.ICON_PAUSE_FS_30
                      : ListIcons.ICON_PLAY_FS_30
                  }
                  onClick={() => {
                    if (!!songs.length) {
                      handleSetCurrentMusic(global?.user?._id, songs[0], dispatch, navigate)
                      setLocalStorage("songs", JSON.stringify(songs))
                      dispatch(globalSlice.actions.setSongs(songs))
                      dispatch(globalSlice.actions.setIsPlay(!global?.isPlay))
                    }
                  }}
                />
                <ButtonCircle
                  className={!!checkStatusFollow ? "greendBackgroundColor fs-30 mr-20" : "noBackgroundColor fs-30 mr-20"}
                  icon={!!checkStatusFollow ? ListIcons.ICON_CHECK : ListIcons.ICON_PLUS_CIRCLE}
                  onClick={() => handleAddOrDeleteAlbum()}
                  loading={loading}
                />
              </>
          }
        </div>
        {
          !!songs.length &&
          <div className="list-songs">
            <TableListSong songs={songs} />
          </div>
        }
        <div className="list-albums mt-16">
          <div className="fs-22 fw-700 mb-16">
            <span className="mr-6">Album khác của</span>
            <span>
              {!!buttonShow?.isUpdateAlbum
                ? "bạn"
                : album?.Artist?.FullName}
            </span>
          </div>
          <Row>
            {
              album?.List?.map(i =>
                <Col key={i?._id} span={6}>
                  <ItemList item={{ ...i, Description: moment(i?.createdAt).format("YYYY") }} />
                </Col>
              )
            }
          </Row>
        </div>
      </ContentStyled>

      {
        !!openUpdateAlbum &&
        <ModalInsertUpdateAlbum
          open={openUpdateAlbum}
          onCancel={() => setOpenUpdateAlbum(false)}
          onOk={() => getDetailAlbum()}
        />
      }

      {
        !!openInsertUpdatesong &&
        <ModalInsertUdpateSong
          open={openInsertUpdatesong}
          onCancel={() => setOpenInsertUpdateSong(false)}
          onOk={() => getSongByAlbum()}
        />
      }
    </SpinCustom>
  )
}

export default AlbumDetail  