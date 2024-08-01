import express from "express"
const SongRoute = express.Router()
import SongController from "../controllers/song.controller.js"
import upload from "../middlewares/clouddinary.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

SongRoute.post("/createSong",
  upload('MP3').fields([{ name: 'Audio', maxCount: 1 }, { name: 'Avatar', maxCount: 1 }]),
  authMiddleware([Roles.ROLE_ARTIST]),
  SongController.createSong
)
SongRoute.get("/getDetailSong/:SongID",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  SongController.getDetailSong
)
SongRoute.post("/getAllSongByAlbum",
  SongController.getAllSongByAlbum
)
SongRoute.post("/getAllSongByArtist",
  SongController.getAllSongByArtist
)
SongRoute.get("/deleteSong/:SongID",
  authMiddleware([Roles.ROLE_ARTIST]),
  SongController.deleteSong
)
SongRoute.post("/updateSong",
  upload('MP3').fields([{ name: 'Audio', maxCount: 1 }, { name: 'Avatar', maxCount: 1 }]),
  authMiddleware([Roles.ROLE_ARTIST]),
  SongController.updateSong
)
SongRoute.get("/plusListen/:SongID",
  authMiddleware([Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  SongController.plusListen
)

export default SongRoute
