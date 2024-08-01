import AlbumService from "../services/album.service.js"

const createAlbum = async (req, res) => {
  try {
    const data = await AlbumService.fncCreateAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailAlbum = async (req, res) => {
  try {
    const data = await AlbumService.fncGetDetailAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllAlbum = async (req, res) => {
  try {
    const data = await AlbumService.fncGetAllAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getAllAlbumByArtist = async (req, res) => {
  try {
    const data = await AlbumService.fncGetAllAlbumByArtist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateAlbum = async (req, res) => {
  try {
    const data = await AlbumService.fncUpdateAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const data = await AlbumService.fncDeleteAlbum(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const AlbumController = {
  createAlbum,
  getDetailAlbum,
  getAllAlbumByArtist,
  updateAlbum,
  deleteAlbum,
  getAllAlbum
}

export default AlbumController
