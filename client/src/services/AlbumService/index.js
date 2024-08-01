import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateAlbum,
  apiDeleteAlbum,
  apiGetAllAlbum,
  apiGetAllAlbumByArtist,
  apiGetDetailAlbum,
  apiUpdateAlbum
} from "./urls"

const createAlbum = body => http.post(apiCreateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getDetailAlbum = AlbumID => http.get(`${apiGetDetailAlbum}/${AlbumID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getAllAlbumByArtist = body => http.post(apiGetAllAlbumByArtist, body)
const updateAlbum = body => http.post(apiUpdateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const deleteAlbum = AlbumID => http.get(`${apiDeleteAlbum}/${AlbumID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getAllAlbum = body => http.post(apiGetAllAlbum, body)


const AlbumService = {
  createAlbum,
  getDetailAlbum,
  getAllAlbumByArtist,
  updateAlbum,
  deleteAlbum,
  getAllAlbum
}

export default AlbumService
