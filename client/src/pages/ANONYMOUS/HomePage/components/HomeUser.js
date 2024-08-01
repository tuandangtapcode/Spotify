import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import AlbumService from "src/services/AlbumService"
import { Col, Row } from "antd"
import ItemList from "src/components/ItemList"
import { useNavigate } from "react-router-dom"
import Header from "src/components/Header"

const HomeUser = () => {

  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 4,
  })
  const navigate = useNavigate()

  const getAllAlbum = async () => {
    try {
      setLoading(true)
      const res = await AlbumService.getAllAlbum(pagination)
      if (res?.isError) return
      setAlbums(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllAlbum()
  }, [pagination])

  return (
    <SpinCustom spinning={loading}>
      <Header />
      <Row>
        {
          !!albums.length &&
          albums?.map(i =>
            <Col span={6} onClick={() => navigate(`/album/${i?._id}`)}>
              <ItemList item={{ ...i, Description: i?.Artist?.FullName }} />
            </Col>
          )
        }
      </Row>
    </SpinCustom>
  )
}

export default HomeUser