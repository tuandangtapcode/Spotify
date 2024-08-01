import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateSong,
  apiDeleteSong,
  apiGetAllSongByAlbum,
  apiGetAllSongByArtist,
  apiGetDetailSong,
  apiPlusListen,
  apiUpdateSong
} from "./urls"

const createSong = body => http.post(apiCreateSong, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getDetailSong = SongID => http.get(`${apiGetDetailSong}/${SongID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getAllSongByAlbum = body => http.post(apiGetAllSongByAlbum, body)
const getAllSongByArtist = body => http.post(apiGetAllSongByArtist, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const deleteSong = SongID => http.get(`${apiDeleteSong}/${SongID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const updateSong = body => http.post(apiUpdateSong, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const plusListen = SongID => http.get(`${apiPlusListen}/${SongID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})


const SongService = {
  createSong,
  getDetailSong,
  getAllSongByAlbum,
  getAllSongByArtist,
  deleteSong,
  updateSong,
  plusListen
}

export default SongService
