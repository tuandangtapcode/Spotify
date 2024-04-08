import express from "express"
import AlbumController from "../controllers/album.controller.js"
const AlbumRoute = express.Router()
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

AlbumRoute.post("/createAlbum",
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.createAlbum
)
AlbumRoute.get("/getDetailAlbum/:AlbumID",
  AlbumController.getDetailAlbum,
)
AlbumRoute.post("/getAllAlbumByArtist",
  AlbumController.getAllAlbumByArtist
)
AlbumRoute.post("/updateAlbum",
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.updateAlbum
)
AlbumRoute.get("/deleteAlbum/:AlbumID",
  authMiddleware([Roles.ROLE_ARTIST]),
  AlbumController.deleteAlbum
)

export default AlbumRoute
