import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiAddOrDeleteAlbum,
  apiAddOrDeleteLoveSong,
  apiCreateAccoutArtist,
  apiCreatePlaylist,
  apiDeactiveAccount,
  apiDeletePlaylist,
  apiGetDetailPlaylist,
  apiGetDetailProfile,
  apiGetInforByGoogleLogin,
  apiGetListArtist,
  apiGetListUser,
  apiGetUserByEmail,
  apiLogin,
  apiLoginByGoogle,
  apiRegister,
  apiRegisterByGoogle,
  apiUpdatePlaylist,
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
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getListUser = body => http.post(apiGetListUser, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const createPlaylist = () => http.get(apiCreatePlaylist, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getDetailPlaylist = PlaylistID => http.get(`${apiGetDetailPlaylist}/${PlaylistID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const deletePlaylist = PlaylistID => http.get(`${apiDeletePlaylist}/${PlaylistID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const deactiveAccount = UserID => http.get(`${apiDeactiveAccount}/${UserID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const createAccoutArtist = body => http.post(apiCreateAccoutArtist, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const updatePlaylist = body => http.post(apiUpdatePlaylist, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const addOrDeleteLoveSong = body => http.post(apiAddOrDeleteLoveSong, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const addOrDeleteAlbum = body => http.post(apiAddOrDeleteAlbum, body, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getListArtist = () => http.get(apiGetListArtist, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
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
  updatePlaylist,
  getDetailPlaylist,
  deletePlaylist,
  getListUser,
  deactiveAccount,
  createAccoutArtist,
  addOrDeleteLoveSong,
  addOrDeleteAlbum,
  getListArtist
}

export default UserService
