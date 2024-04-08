import SongService from "../services/song.service.js"

const createSong = async (req, res) => {
  try {
    const data = await SongService.fncCreateSong(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailSong = async (req, res) => {
  try {
    const data = await SongService.fncGetDetailSong(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllSongByAlbum = async (req, res) => {
  try {
    const data = await SongService.fncGetAllSongByAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllSongByArtist = async (req, res) => {
  try {
    const data = await SongService.fncGetAllSongByArtist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteSong = async (req, res) => {
  try {
    const data = await SongService.fncDeleteSong(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateSong = async (req, res) => {
  try {
    const data = await SongService.fncUpdateSong(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const SongController = {
  createSong,
  getDetailSong,
  getAllSongByAlbum,
  getAllSongByArtist,
  deleteSong,
  updateSong
}

export default SongController
