import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateNotification,
  apiGetListNotificationByReceiver,
  apiSeenNotification
} from "./urls"

const createNotification = body => http.post(apiCreateNotification, body)
const seenNotification = () => http.get(apiSeenNotification, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})
const getListNotificationByReceiver = () => http.get(apiGetListNotificationByReceiver, {
  headers: {
    'token': `Bearer ${getLocalStorage('token')}`
  }
})


const NotificationService = {
  createNotification,
  seenNotification,
  getListNotificationByReceiver
}

export default NotificationService
