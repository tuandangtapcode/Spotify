import http from "../index"
import {
  apiCreateSong,
  apiDeleteSong,
  apiGetAllSongByAlbum,
  apiGetAllSongByArtist,
  apiGetDetailSong,
  apiUpdateSong
} from "./urls"

const createSong = body => http.post(apiCreateSong, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getDetailSong = SongID => http.get(`${apiGetDetailSong}/${SongID}`)
const getAllSongByAlbum = body => http.post(apiGetAllSongByAlbum, body)
const getAllSongByArtist = body => http.post(apiGetAllSongByArtist, body)
const deleteSong = SongID => http.get(`${apiDeleteSong}/${SongID}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const updateSong = body => http.post(apiUpdateSong, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const SongService = {
  createSong,
  getDetailSong,
  getAllSongByAlbum,
  getAllSongByArtist,
  deleteSong,
  updateSong
}

export default SongService
