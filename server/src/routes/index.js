import AlbumRoute from "./album.route.js"
import NotificationRoute from "./notification.route.js"
import SongRoute from "./song.route.js"
import UserRoute from "./user.route.js"

const routes = (app) => {
  app.use("/album", AlbumRoute)
  app.use("/song", SongRoute)
  app.use("/user", UserRoute)
  app.use("/notification", NotificationRoute)
}

export default routes
