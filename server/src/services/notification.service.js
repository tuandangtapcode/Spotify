import Notification from "../models/notification.js"
import { response } from "../utils/lib.js"

const fncCreateNotification = async (req) => {
  try {
    const newNotification = await Notification.create(req.body)
    return response(newNotification, false, "Tạo thông báo thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSeenNotification = async (req) => {
  try {
    const UserID = req.user.ID
    const notification = await Notification.updateMany({ Receiver: UserID }, { IsSeen: true })
    return response(notification, false, "Seen", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListNotificationByReceiver = async (req) => {
  try {
    const UserID = req.user.ID
    const notifications = await Notification
      .find({ Receiver: UserID })
      .populate('Sender', ['_id', 'FullName', 'RoleID'])
      .populate('Receiver', ['_id', 'FullName'])
      .sort({ createdAt: 1 })
    const notificationsNotSeen = notifications.filter(i => !i.IsSeen)
    return response(
      { List: notifications.reverse(), NotSeen: notificationsNotSeen.length },
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const NotificationService = {
  fncCreateNotification,
  fncSeenNotification,
  fncGetListNotificationByReceiver
}

export default NotificationService
