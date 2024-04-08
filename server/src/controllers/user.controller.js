import UserService from "../services/user.service.js"

const login = async (req, res) => {
  try {
    const data = await UserService.fncLogin(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const loginByGoogle = async (req, res) => {
  try {
    const data = await UserService.fncLoginByGoogle(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const createAccoutArtist = async (req, res) => {
  try {
    const data = await UserService.fncCreateAccoutArtist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const register = async (req, res) => {
  try {
    const data = await UserService.fncRegister(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const registerByGoogle = async (req, res) => {
  try {
    const data = await UserService.fncRegisterByGoogle(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getUserByEmail = async (req, res) => {
  try {
    const data = await UserService.fncGetUserByEmail(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailProfile = async (req, res) => {
  try {
    const data = await UserService.fncGetDetailProfile(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateProfile = async (req, res) => {
  try {
    const data = await UserService.fncUpdateProfile(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deactiveAccount = async (req, res) => {
  try {
    const deactive = await UserService.fnDeactiveAccount(req)
    return res.status(deactive.statusCode).json(deactive)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListUser = async (req, res) => {
  try {
    const data = await UserService.fncGetListUser(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const createPlaylist = async (req, res) => {
  try {
    const data = await UserService.fncCreatePlaylist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailPlaylist = async (req, res) => {
  try {
    const data = await UserService.fncGetDetailPlaylist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deletePlaylist = async (req, res) => {
  try {
    const data = await UserService.fncDeletePlaylist(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const UserController = {
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
  createAccoutArtist,
  getListUser,
  deactiveAccount
}

export default UserController
