import User from "../models/user.js"
import { accessToken } from "../utils/jwt.js"
import bcrypt from "bcrypt"
import { getOneDocument, response } from "../utils/lib.js"
import Song from "../models/song.js"
import Album from "../models/album.js"
const saltRounds = 10

const addOrDeleteSongFromPlaylist = async (PlaylistID, Song, type) => {
  const updateUser = await User.findOneAndUpdate(
    { 'Playlists._id': PlaylistID },
    {
      [type]: {
        'Playlists.$.Songs': type.includes("push")
          ? Song
          : { _id: Song._id }
      }
    },
    { new: true }
  )
  return {
    user: updateUser,
    msg: type.includes("push") ? "Đã thêm vào" : "Đã xóa khỏi"
  }
}

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body
    const getUser = await getOneDocument(User, "Email", Email)
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    if (!!getUser && !getUser.Password) return response({}, true, "Mật khẩu không chính xác", 200)
    const check = bcrypt.compareSync(Password, getUser.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    if (!getUser.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const access_token = accessToken({
      ID: getUser._id,
      RoleID: getUser.RoleID,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLoginByGoogle = async (req) => {
  try {
    const email = req.body.email
    const getUser = await getOneDocument(User, "Email", email)
    if (!getUser) return response({}, true, "Email không tồn tại", 200)
    if (!getUser.IsActive)
      return response({}, true, "Tài khoản đã bị khóa", 200)
    const access_token = accessToken({
      ID: getUser._id,
      RoleID: getUser.RoleID,
    })
    return response(access_token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, "Login thành công", 200)
  }
}

const fncCreateAccoutArtist = async (req) => {
  try {
    const { Password, Email } = req.body
    const checkExist = await getOneDocument(User, "Email", Email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      RoleID: 2
    }
    const newUser = await User.create(hashUser)
    return response({}, false, "Thêm tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRegister = async (req) => {
  try {
    const { Password, Email } = req.body
    const checkExist = await getOneDocument(User, "Email", Email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      RoleID: 4
    }
    const newUser = await User.create(hashUser)
    return response({}, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRegisterByGoogle = async (req) => {
  try {
    const { email, given_name, picture } = req.body
    const checkExist = await getOneDocument(User, "Email", email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      AvatarPath: picture,
      IsByGoogle: true,
      RoleID: 4
    })
    return response({}, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListUser = async (req) => {
  try {
    const { PageSize, CurrentPage, TextSearch } = req.body
    const query = {
      RoleID: { $ne: 1 },
      FullName: { $regex: TextSearch, $options: "i" },
    }
    const users = await User.find(query).skip((CurrentPage - 1) * PageSize).limit(PageSize)
    const total = await User.find(query).countDocuments()
    return response(
      { List: users, Total: total },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListArtist = async (req) => {
  try {
    const UserID = req.user.ID
    const artists = await User.find({ RoleID: 2, _id: { $ne: UserID } }).select("_id FullName")
    return response(artists, false, "Lay data thanh cong", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetUserByEmail = async (req) => {
  try {
    const { Email } = req.body
    const user = await getOneDocument(User, "Email", Email)
    if (!!user) return response({}, true, 'Địa chỉ này đã được liên kết với một tài khoản hiện có', 200)
    return response({}, false, "OK", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await User
      .findOne({ _id: UserID })
      .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists Playlists')
    if (!user) return response({}, true, "Không tồn tại user", 200)
    return response(user, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateProfile = async (req) => {
  try {
    const { UpdateByAdmin } = req.body
    let UserID
    if (!!UpdateByAdmin) {
      UserID = req.body._id
    } else {
      UserID = req.user.ID
    }
    const user = await getOneDocument(User, "_id", UserID)
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const updateProfile = await User
      .findByIdAndUpdate(
        { _id: UserID },
        {
          ...req.body,
          AvatarPath: !!req.file ? req.file.path : user?.AvatarPath,
        },
        { new: true }
      )
      .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists')
    return response(updateProfile, false, "Cập nhật profile thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fnDeactiveAccount = async (req) => {
  try {
    const UserID = req.params.UserID
    const user = await User.findByIdAndUpdate(
      { _id: UserID },
      { IsActive: false }
    )
    if (!user) return response({}, true, "Không tồn tại user", 200)
    return response(user, false, "Khóa tài khoản thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncCreatePlaylist = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await getOneDocument(User, "_id", UserID)
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const numericalOrder = !!user.Playlists.length ? user.Playlists.length + 1 : 1
    const newPlaylist = await User
      .findOneAndUpdate(
        { _id: UserID },
        {
          $push: { Playlists: { Title: `Danh sách phát của tôi #${numericalOrder}` } }
        },
        { new: true }
      )
      .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists')
    return response(newPlaylist, false, 'Danh sách phát đã được thêm', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailPlaylist = async (req) => {
  try {
    const UserID = req.user.ID
    const PlaylistID = req.params.PlaylistID
    const playlist = await User
      .findOne(
        { _id: UserID },
        {
          Playlists: {
            $elemMatch: { _id: PlaylistID }
          }
        })
      .populate("Playlists.Songs.Artist", ["_id", "FullName"])
    if (!playlist.Playlists.length) return response({}, true, 'Playlist không tồn tại', 200)
    return response(playlist.Playlists[0], false, 'Lấy data thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeletePlaylist = async (req) => {
  try {
    const UserID = req.user.ID
    const PlaylistID = req.params.PlaylistID
    const user = await User.findByIdAndUpdate(
      { _id: UserID },
      { $pull: { Playlists: { _id: PlaylistID } } },
      { new: true }
    )
    if (!user) return response({}, true, 'Có lỗi xảy ra', 200)
    return response(user, false, 'Xóa playlist thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdatePlaylist = async (req) => {
  try {
    const { PlaylistID, Title, Description } = req.body
    const UserID = req.user.ID
    const checkExistPlaylist = await User.findOne(
      { _id: UserID },
      {
        Playlists: {
          $elemMatch: { _id: PlaylistID }
        }
      }
    )
    if (!checkExistPlaylist.Playlists.length) return response({}, true, 'Playlist không tồn tại', 200)
    const playlist = checkExistPlaylist.Playlists[0]
    const checkExistTitle = await User.findOne(
      { _id: UserID },
      {
        Playlists: {
          $elemMatch: { Title: Title }
        }
      }
    )
    const playlistByTitle = checkExistTitle.Playlists[0]
    if (!!playlistByTitle && !playlist._id.equals(playlistByTitle._id)) return response({}, true, 'Playlist đã tồn tại', 200)
    const updatePlaylist = await User
      .findOneAndUpdate(
        { 'Playlists._id': PlaylistID },
        {
          $set: {
            'Playlists.$.Title': Title,
            'Playlists.$.Description': Description,
            'Playlists.$.AvatarPath': !!req.file ? req.file.path : checkExistPlaylist?.AvatarPath,
          }
        },
        { new: true })
      .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists')
    return response(updatePlaylist, false, 'Cập nhật playlist thành công', 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncAddOrDeleteLoveSong = async (req) => {
  try {
    let updateUser
    const UserID = req.user.ID
    const { Song, IsNewPlaylist, PlaylistID } = req.body
    const user = await getOneDocument(User, "_id", UserID)
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    if (!!IsNewPlaylist) {
      const numericalOrder = !!user.Playlists.find(i => i.Title === "Bài hát yêu thích") ? user.Playlists.length + 1 : 1
      const newPlaylist = await User.findByIdAndUpdate(
        { _id: UserID },
        {
          $push: { Playlists: { Title: `Danh sách phát của tôi #${numericalOrder}` } }
        },
        { new: true }
      )
      updateUser = await addOrDeleteSongFromPlaylist(newPlaylist.Playlists[newPlaylist.Playlists.length - 1]._id.toString(), Song, "$push")
      return response(updateUser.user, false, `${updateUser.msg} ${newPlaylist.Playlists[newPlaylist.Playlists.length - 1].Title}`, 200)
    }
    if (!IsNewPlaylist && !!PlaylistID) {
      const playlist = user.Playlists.find(i => i._id.equals(PlaylistID))
      if (playlist.Songs.find(i => i._id.equals(Song._id))) {
        updateUser = await addOrDeleteSongFromPlaylist(PlaylistID, Song, "$pull")
      } else {
        updateUser = await addOrDeleteSongFromPlaylist(PlaylistID, Song, "$push")
      }
      return response(updateUser.user, false, `${updateUser.msg} ${playlist.Title}`, 200)
    }
    const playlist = user.Playlists.find(i => i.Title == "Bài hát yêu thích")
    if (!!playlist) {
      if (playlist.Songs.find(i => i._id.equals(Song._id))) {
        updateUser = await addOrDeleteSongFromPlaylist(playlist._id.toString(), Song, "$pull")
      } else {
        updateUser = await addOrDeleteSongFromPlaylist(playlist._id.toString(), Song, "$push")
      }
      return response(updateUser.user, false, `${updateUser.msg} Bài hát yêu thích`, 200)
    } else {
      const newPlaylist = await User.findOneAndUpdate(
        { _id: UserID },
        {
          $push: { Playlists: { Title: `Bài hát yêu thích` } }
        },
        { new: true }
      )
      updateUser = await addOrDeleteSongFromPlaylist(newPlaylist.Playlists[newPlaylist.Playlists.length - 1]._id.toString(), Song, "$push")
      return response(updateUser.user, false, `${updateUser.msg} Bài hát yêu thích`, 200)
    }
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncAddOrDeleteAlbum = async (req) => {
  try {
    let updateUser
    const UserID = req.user.ID
    const AlbumID = req.body._id
    const { Title, AvatarPath } = req.body
    const album = await User.findOne(
      { _id: UserID },
      {
        Albums: {
          $elemMatch: { _id: AlbumID }
        }
      }
    )
    if (!!album.Albums.length) {
      await Album.updateOne({ _id: AlbumID },
        {
          $pull: { Followers: UserID }
        }
      )
      updateUser = await User
        .findByIdAndUpdate(
          { _id: UserID },
          {
            $pull: {
              Albums: { _id: AlbumID }
            }
          },
          { new: true })
        .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists')
    } else {
      await Album.updateOne({ _id: AlbumID },
        {
          $push: { Followers: UserID }
        }
      )
      updateUser = await User
        .findByIdAndUpdate(
          { _id: UserID },
          {
            $push: {
              Albums: {
                _id: AlbumID,
                Title: Title,
                AvatarPath: AvatarPath
              }
            }
          },
          { new: true })
        .select('_id FullName RoleID AvatarPath Followers IsByGoogle Albums Playlists')
    }
    return response(updateUser, false, "Album đã được thêm vào thư viện", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const UserService = {
  fncLogin,
  fncLoginByGoogle,
  fncRegister,
  fncRegisterByGoogle,
  fncGetDetailProfile,
  fncGetUserByEmail,
  fncUpdateProfile,
  fncCreatePlaylist,
  fncGetDetailPlaylist,
  fncDeletePlaylist,
  fncUpdatePlaylist,
  fncCreateAccoutArtist,
  fncGetListUser,
  fnDeactiveAccount,
  fncAddOrDeleteLoveSong,
  fncAddOrDeleteAlbum,
  fncGetListArtist
}

export default UserService
