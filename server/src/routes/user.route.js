import express from "express"
const UserRoute = express.Router()
import UserController from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"
import upload from "../middlewares/clouddinary.middleware.js"

UserRoute.post("/login",
  UserController.login
)
UserRoute.post("/loginByGoogle",
  UserController.loginByGoogle
)
UserRoute.post("/createAccoutArtist",
  authMiddleware([Roles.ROLE_ADMIN]),
  UserController.createAccoutArtist
)
UserRoute.post("/register",
  UserController.register
)
UserRoute.post("/registerByGoogle",
  UserController.registerByGoogle
)
UserRoute.post("/getUserByEmail",
  UserController.getUserByEmail
)
UserRoute.get("/getDetailProfile",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.getDetailProfile
)
UserRoute.post("/updateProfile",
  upload("Avatar").single("Avatar"),
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.updateProfile
)
UserRoute.get("/deactiveAccount/:UserID",
  authMiddleware([Roles.ROLE_ADMIN]),
  UserController.deactiveAccount
)
UserRoute.post("/getListUser",
  authMiddleware([Roles.ROLE_ADMIN]),
  UserController.getListUser
)
UserRoute.get("/createPlaylist",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.createPlaylist
)
UserRoute.get("/getDetailPlaylist/:PlaylistID",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.getDetailPlaylist
)
UserRoute.get("/deletePlaylist/:PlaylistID",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.deletePlaylist
)
UserRoute.post("/updatePlaylist",
  upload("Avatar").single("Avatar"),
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.updatePlaylist
)
UserRoute.post("/addOrDeleteLoveSong",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.addOrDeleteLoveSong
)
UserRoute.post("/addOrDeleteAlbum",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  UserController.addOrDeleteAlbum
)
UserRoute.get("/getListArtist",
  authMiddleware([Roles.ROLE_ARTIST]),
  UserController.getListArtist
)

export default UserRoute
