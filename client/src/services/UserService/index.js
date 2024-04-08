import http from "../index"
import {
  apiCreatePlaylist,
  apiDeactiveAccount,
  apiDeletePlaylist,
  apiGetDetailPlaylist,
  apiGetDetailProfile,
  apiGetInforByGoogleLogin,
  apiGetListUser,
  apiGetUserByEmail,
  apiLogin,
  apiLoginByGoogle,
  apiRegister,
  apiRegisterByGoogle,
  apiUpdateProfile
} from "./urls"

const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const login = body => http.post(apiLogin, body)
const loginByGoogle = body => http.post(apiLoginByGoogle, body)
const register = body => http.post(apiRegister, body)
const registerByGoogle = body => http.post(apiRegisterByGoogle, body)
const getUserByEmail = body => http.post(apiGetUserByEmail, body)
const getDetailProfile = token => http.get(apiGetDetailProfile, {
  headers: {
    'token': `Bearer ${token}`
  }
})
const updateProfile = body => http.post(apiUpdateProfile, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getListUser = body => http.post(apiGetListUser, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const createPlaylist = () => http.get(apiCreatePlaylist, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const getDetailPlaylist = PlaylistID => http.get(`${apiGetDetailPlaylist}/${PlaylistID}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const deletePlaylist = PlaylistID => http.get(`${apiDeletePlaylist}/${PlaylistID}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})
const deactiveAccount = UserID => http.get(`${apiDeactiveAccount}/${UserID}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
})


const UserService = {
  getInforByGoogleLogin,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  getUserByEmail,
  getDetailProfile,
  updateProfile,
  createPlaylist,
  getDetailPlaylist,
  deletePlaylist,
  getListUser,
  deactiveAccount
}

export default UserService
