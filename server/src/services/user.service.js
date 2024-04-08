import User from "../models/user.js"
import { accessToken } from "../utils/jwt.js"
import bcrypt from "bcrypt"
import { response } from "../utils/lib.js"
const saltRounds = 10

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body
    const getUser = await User.findOne({ Email })
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
    const getUser = await User.findOne({ Email: email })
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
    const checkExist = await User.findOne({ Email })
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      RoleID: 2
    }
    const newUser = await User.create(hashUser)
    return response(newUser, false, "Thêm tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRegister = async (req) => {
  try {
    const { Password } = req.body
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const hashUser = {
      ...req.body,
      Password: hashPassword,
      RoleID: 4
    }
    const newUser = await User.create(hashUser)
    return response(newUser, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRegisterByGoogle = async (req) => {
  try {
    const { email, given_name, picture } = req.body
    const checkExist = await User.findOne({ Email: email })
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const newUser = await User.create({
      Email: email,
      FullName: given_name,
      AvatarPath: picture,
      IsByGoogle: true,
      RoleID: 4
    })
    return response(newUser, false, "Đăng ký tài khoản thành công", 201)
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
    return response(
      { List: users, Total: users.length },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetUserByEmail = async (req) => {
  try {
    const { Email } = req.body
    const user = await User.findOne({ Email })
    if (!!user) return response({}, true, 'Địa chỉ này đã được liên kết với một tài khoản hiện có', 200)
    return response({}, false, "OK", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const detail = await User.findOne({ _id: UserID })
    // .select('_id, FullName RoleID AvatarPath Description Follows IsByGoogle Premium')
    // .populate('Follows', ['AvatarPath', 'Title', 'Likes', 'Reads'])
    if (!detail) return response({}, true, "Không tồn tại user", 200)
    return response(detail, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await User.findOne({ _id: UserID })
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const updateProfile = await User.findByIdAndUpdate(
      { _id: UserID },
      {
        ...req.body,
        AvatarPath: !!req.file ? req.file.path : user?.AvatarPath,
      },
      { new: true }
    )
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
    const user = await User.findOne({ _id: UserID })
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const numericalOrder = !!userBefore.playlists.length ? userBefore.playlists.length + 1 : 1
    const newPlaylist = await User.findByIdAndUpdate(
      { _id: UserID },
      {
        $push: { Playlists: { title: `Danh sách phát của tôi #${numericalOrder}` } }
      },
      { new: true }
    )
    return response(newPlaylist.Playlists[newPlaylist.Playlists.length - 1], false, 'Danh sách phát đã được thêm', 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailPlaylist = async (req) => {
  try {
    const UserID = req.user.ID
    const PlaylistID = req.params.PlaylistID
    // const user = await User.findOne({ _id: UserID })
    // const playlist = user.Playlists.find(i => i._id.equals(PlaylistID))
    const playlist = await User.findOne({ _id: UserID, "Playlists._id": PlaylistID })
    if (!playlist) return response({}, true, 'Playlist không tồn tại', 200)
    return response(playlist, false, 'Lấy data thành công', 200)
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
  fncCreateAccoutArtist,
  fncGetListUser,
  fnDeactiveAccount
}

export default UserService
