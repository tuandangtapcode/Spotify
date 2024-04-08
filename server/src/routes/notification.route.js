import express from "express"
const NotificationRoute = express.Router()
import NotificationController from "../controllers/notification.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

NotificationRoute.post("/createNotification",
  NotificationController.createNotification
)
NotificationRoute.get("/seenNotification",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  NotificationController.seenNotification
)
NotificationRoute.get("/getListNotificationByReceiver",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_ARTIST, Roles.ROLE_CUSTOMER_NORMAL, Roles.ROLE_CUSTOMER_PREMIUM]),
  NotificationController.getListNotificationByReceiver
)

export default NotificationRoute
