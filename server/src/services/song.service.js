import Song from "../models/song.js"
import Album from "../models/album.js"
import { getOneDocument, response } from "../utils/lib.js"

const fncCreateSong = async (req) => {
  try {
    const { Title, Artist } = req.body
    const checkExist = await getOneDocument(Song, "Title", Title)
    if (!!checkExist) return response({}, true, `Bài hát ${Title} đã tồn tại`, 200)
    const newSong = await Song.create({
      ...req.body,
      Artist: Artist,
      AvatarPath: req.files.Avatar[0].path,
      AudioPath: req.files.Audio[0].path,
    })
    return response(newSong, false, 'Thêm mới bài hát thành công', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailSong = async (req) => {
  try {
    const UserID = req.user.ID
    const SongID = req.params.SongID
    const song = await Song
      .findOne({ _id: SongID })
      .populate("Album", ["_id", "Title"])
    if (!song) return response({}, true, "Bai hat khong ton tai", 200)
    const ButtonShow = {
      isUpdateSong: song.Artist.every(i => !i.equals(UserID)) ? false : true
    }
    return response({ Song: song, ButtonShow }, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllSongByAlbum = async (req) => {
  try {
    const { AlbumID } = req.body
    const songs = await Song
      .find({ Album: AlbumID })
      .populate("Artist", ["_id", "FullName"])
      .populate("Album", ["_id", "Title"])
    return response({ List: songs, Total: songs.length }, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetAllSongByArtist = async (req) => {
  try {
    const { Artist } = req.body
    const songs = await Song.find({
      Artist: {
        $elemMatch: { $eq: Artist }
      }
    })
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
    const checkExist = await getOneDocument(Song, "_id", SongID)
    if (!checkExist) return response({}, true, 'Bài hát không tồn tại', 200)
    const checkExistTitle = await getOneDocument(Song, "Title", Title)
    if (!!checkExistTitle && !checkExist._id.equals(checkExistTitle._id))
      return response({}, true, `Bài hát ${Title} đã tồn tại`, 200)
    const updateSong = await Song.findByIdAndUpdate(
      { _id: SongID },
      {
        ...req.body,
        AvatarPath: !!req.files.Avatar[0] ? req.files.Avatar[0].path : checkExist?.AvatarPath,
        AudioPath: !!req.files.Audio[0] ? req.files.Audio[0].path : checkExist?.AudioPath,
      },
      { new: true }
    )
    return response(updateSong, false, "Cập nhật bài hát thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncPlusListen = async (req) => {
  try {
    const SongID = req.params.SongID
    const updateSong = await Song.findByIdAndUpdate({ _id: SongID }, {
      $inc: {
        Listens: 1
      }
    })
    if (!updateSong) return response({}, true, "Bài hát không tồn tại", 200)
    return response(updateSong, false, "OK", 200)
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
  fncUpdateSong,
  fncPlusListen
}

export default SongService
