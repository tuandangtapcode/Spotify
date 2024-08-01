import Album from "../models/album.js"
import User from "../models/user.js"
import Song from "../models/song.js"
import { getOneDocument, response } from "../utils/lib.js"

const fncCreateAlbum = async (req) => {
  try {
    const { Title } = req.body
    const UserID = req.user.ID
    const check = await getOneDocument(Album, "Title", Title)
    if (!!check) return response({}, true, `Album ${Title} đã tồn tại`, 200)
    const newAlbum = await Album.create({ ...req.body, AvatarPath: req.file.path, Artist: UserID })
    return response(newAlbum, false, 'Tạo mới album thành công', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailAlbum = async (req) => {
  try {
    const UserID = req.user.ID
    const AlbumID = req.params.AlbumID
    const album = await Album.findOne({ _id: AlbumID }).populate("Artist", ["_id", "FullName", "AvatarPath"])
    if (!album) return response({}, true, "Album không tồn tại", 200)
    const albums = await Album.find({ Artist: album.Artist._id })
    const ButtonShow = {
      isUpdateAlbum: album.Artist._id.equals(UserID) ? true : false,
      isInsertSong: album.Artist._id.equals(UserID) ? true : false
    }
    return response(
      {
        Album: album,
        List: albums,
        ButtonShow: ButtonShow
      },
      false,
      "Lay data thanh cong",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllAlbum = async (req) => {
  try {
    const { PageSize, CurrentPage, TextSearch } = req.body
    const albums = await Album
      .find({ Title: { $regex: TextSearch, $options: "i" } })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
      .populate("Artist", ["_id", "FullName"])
    return response(albums, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllAlbumByArtist = async (req) => {
  try {
    const { Artist } = req.body
    const albums = await Album.find({ Artist })
    return response(albums, false, "Lay dat thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateAlbum = async (req) => {
  try {
    const { Title, AlbumID } = req.body
    const UserID = req.user.ID
    const checkExist = await Album.findOne({ _id: AlbumID, Artist: UserID })
    if (!checkExist) return response({}, true, "Co loi xay ra", 200)
    const checkExistTitle = await getOneDocument(Album, "Title", Title)
    if (!!checkExistTitle && !checkExist._id.equals(checkExistTitle._id))
      return response({}, true, `Album ${Title} đã tồn tại`, 200)
    const updateAlbum = await Album.findByIdAndUpdate(
      { _id: AlbumID },
      {
        ...req.body,
        AvatarPath: !!req.file ? req.file.path : checkExist?.AvatarPath,
      },
      { new: true }
    )
    return response(updateAlbum, false, "Cập nhật album thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteAlbum = async (req) => {
  try {
    const AlbumID = req.params.AlbumID
    const UserID = req.user.ID
    const deleteAlbum = await Album.findByIdAndDelete({ _id: AlbumID, Artist: UserID })
    if (!deleteAlbum) return response({}, true, "Co loi xay ra", 200)
    return response({}, false, "Xóa album thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const AlbumService = {
  fncCreateAlbum,
  fncGetDetailAlbum,
  fncGetAllAlbumByArtist,
  fncUpdateAlbum,
  fncDeleteAlbum,
  fncGetAllAlbum
}

export default AlbumService
