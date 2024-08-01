import express from "express"
import AlbumController from "../controllers/album.controller.js"
const AlbumRoute = express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"
import upload from "../middlewares/clouddinary.middleware.js"

AlbumRoute.post("/createAlbum",
  upload("Avatar").single("Avatar"),
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.createAlbum
)
AlbumRoute.get("/getDetailAlbum/:AlbumID",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_NORMAL]),
  AlbumController.getDetailAlbum,
)
AlbumRoute.post("/getAllAlbum",
  AlbumController.getAllAlbum
)
AlbumRoute.post("/getAllAlbumByArtist",
  AlbumController.getAllAlbumByArtist
)
AlbumRoute.post("/updateAlbum",
  upload("Avatar").single("Avatar"),
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.updateAlbum
)
AlbumRoute.get("/deleteAlbum/:AlbumID",
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.deleteAlbum
)

export default AlbumRoute
