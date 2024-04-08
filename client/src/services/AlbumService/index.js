import http from "../index"
import {
  apiCreateAlbum,
  apiDeleteAlbum,
  apiGetAllAlbumByArtist,
  apiGetDetailAlbum,
  apiUpdateAlbum
} from "./urls"

const createAlbum = body => http.post(apiCreateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getDetailAlbum = AlbumID => http.get(`${apiGetDetailAlbum}/${AlbumID}`)
const getAllAlbumByArtist = body => http.post(apiGetAllAlbumByArtist, body)
const updateAlbum = body => http.post(apiUpdateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const deleteAlbum = AlbumID => http.get(`${apiDeleteAlbum}/${AlbumID}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const AlbumService = {
  createAlbum,
  getDetailAlbum,
  getAllAlbumByArtist,
  updateAlbum,
  deleteAlbum
}

export default AlbumService
