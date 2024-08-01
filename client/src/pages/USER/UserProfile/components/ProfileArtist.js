import { useEffect, useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { globalSelector } from "src/redux/selector"
import AlbumService from "src/services/AlbumService"
import SongService from "src/services/SongService"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ModalInsertUdpateSong from "../modal/ModalInsertUpdateSong"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import ModalInsertUpdateAlbum from "src/pages/ANONYMOUS/AlbumDetail/components/ModalInsertUpdateAlbum"

const ProfileArtist = ({ setLoading }) => {

  const global = useSelector(globalSelector)
  const [albums, setAlbums] = useState([])
  const [openInsertUpdateSong, setOpenInsertUpdateSong] = useState(false)
  const [openInsertUpdateAlbum, setOpenInsertUpdateAlbum] = useState(false)
  const [songs, setSongs] = useState([])
  const navigate = useNavigate()

  const getAlbumByArtist = async () => {
    try {
      setLoading(true)
      const res = await AlbumService.getAllAlbumByArtist({ Artist: global?.user?._id })
      if (res?.isError) return
      setAlbums(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getSongsByArtist = async () => {
    try {
      setLoading(true)
      const res = await SongService.getAllSongByArtist({ Artist: global?.user?._id })
      if (res?.isError) return
      setSongs(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAlbumByArtist()
    getSongsByArtist()
  }, [])


  return (
    <div>
      <div>
        <ButtonCustom
          className="haflLarge normal fw-700 mr-12"
          onClick={() => setOpenInsertUpdateSong(true)}
        >
          Thêm bài hát
        </ButtonCustom>
        <ButtonCustom
          className="haflLarge normal fw-700"
          onClick={() => setOpenInsertUpdateAlbum(true)}
        >
          Thêm Album
        </ButtonCustom>
      </div>
      <hr></hr>
      {
        !!songs.length &&
        <div className="mb-16">
          <h2 className="fs-25 mb-16">Bài hát</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            showsPagination={false}
            navigation={true}
            pagination={{
              clickable: true,
              enabled: false
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {songs.map((i) => (
              <SwiperSlide
                className="d-flex-center cursor-pointer"
              >
                <div onClick={() => navigate(`/song/${i?._id}`)}>
                  <img src={`${i?.AvatarPath}`} style={{ width: '200px', height: '200px' }} alt="" />
                  <h4 className="d-flex-center">{i?.Title}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
      {
        !!albums.length &&
        <div>
          <h2 className="fs-25 mb-16">Album</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={false}
            pagination={{
              clickable: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {albums.map((i) => (
              <SwiperSlide
                className="d-flex-center cursor-pointer"
              >
                <div onClick={() => navigate(`/album/${i?._id}`)}>
                  <img src={`${i?.AvatarPath}`} style={{ width: '200px', height: '200px' }} alt="" />
                  <h4 className="d-flex-center">{i?.Title}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }

      {
        !!openInsertUpdateSong &&
        <ModalInsertUdpateSong
          open={openInsertUpdateSong}
          onCancel={() => setOpenInsertUpdateSong(false)}
          onOk={() => getSongsByArtist()}
        />
      }

      {
        !!openInsertUpdateAlbum &&
        <ModalInsertUpdateAlbum
          open={openInsertUpdateAlbum}
          onCancel={() => setOpenInsertUpdateAlbum(false)}
          onOk={() => getAlbumByArtist()}
        />
      }
    </div>
  )
}

export default ProfileArtist