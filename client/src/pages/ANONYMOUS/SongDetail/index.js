import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import SongService from "src/services/SongService"

const SongDetail = () => {

  const { SongID } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState()
  const [buttonShow, setButtonShow] = useState()

  const getSong = async () => {
    try {
      setLoading(true)
      const res = await SongService.getDetailSong(SongID)
      if (res?.isError) return navigate("/not-found")
      setSong(res?.data?.Song)
      setButtonShow(res?.data?.ButtonShow)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSong()
  }, [SongID])

  return (
    <SpinCustom spinning={loading}>
      SongDetail
    </SpinCustom>
  )
}

export default SongDetail