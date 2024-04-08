import Song from "../models/song.js"
import { response } from "../utils/lib.js"

const fncCreateSong = async (req) => {
  try {
    const { Title } = req.body
    const UserID = req.user.ID
    const checkExist = await Song.findOne({ Title })
    if (!!checkExist) return response({}, true, `Bài hát ${Title} đã tồn tại`, 200)
    const newSong = await Song.create({
      ...req.body,
      Artist: UserID,
      AvatarPath: req.files.avatar[0].path,
      AudioPath: req.files.audio[0].path,
    })
    return response(newSong, false, 'Thêm mới bài hát thành công', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailSong = async (req) => {
  try {
    const SongID = req.params.SongID
    const song = await Song.findOne({ _id: SongID })
    if (!song) return response({}, true, "Bai hat khong ton tai", 200)
    return response(song, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllSongByAlbum = async (req) => {
  try {
    const { PageSize, CurrentPage, AlbumID } = req.body
    const songs = await Song.find({ Album: AlbumID })
    return response(songs, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllSongByArtist = async (req) => {
  try {
    const { PageSize, CurrentPage, Artist } = req.body
    const songs = await Song.find({ Artist })
    return response(songs, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteSong = async (req) => {
  try {
    const SongID = req.params.SongID
    const deleteSong = await Song.findByIdAndDelete({ _id: SongID })
    if (!deleteSong) return response({}, true, "Co loi xay ra", 200)
    return response({}, false, "Xóa bài hát thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateSong = async (req) => {
  try {
    const { Title, SongID } = req.body
    const checkExist = await Song.findOne({ _id: SongID })
    if (!checkExist) return response({}, true, 'Bài hát không tồn tại', 200)
    const checkExistTitle = await Song.findOne({ Title })
    if (!!checkExistTitle && !checkExist._id.equals(checkExistTitle._id))
      return response({}, true, `Bài hát ${Title} đã tồn tại`, 200)
    const updateSong = await Song.findByIdAndUpdate(
      { _id: SongID },
      {
        ...req.body,
        AvatarPath: !!req.files.avatar[0] ? req.files.avatar[0].path : checkExist?.AvatarPath,
        AudioPath: !!req.files.audio[0] ? req.files.audio[0].path : checkExist?.AudioPath,
      },
      { new: true }
    )
    return response(updateSong, false, "Cập nhật bài hát thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const SongService = {
  fncCreateSong,
  fncGetDetailSong,
  fncGetAllSongByAlbum,
  fncGetAllSongByArtist,
  fncDeleteSong,
  fncUpdateSong
}

export default SongService
