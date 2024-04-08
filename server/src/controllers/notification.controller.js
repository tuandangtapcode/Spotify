import NotificationService from "../services/notification.service.js"

const createNotification = async (req, res) => {
  try {
    const data = await NotificationService.fncCreateNotification(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString8())
  }
}

const seenNotification = async (req, res) => {
  try {
    const data = await NotificationService.fncSeenNotification(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString8())
  }
}

const getListNotificationByReceiver = async (req, res) => {
  try {
    const data = await NotificationService.fncGetListNotificationByReceiver(req)
    return res.status(data.statusCode).json(data)
  } catch (error) {
    return res.status(500).json(error.toString8())
  }
}


const NotificationController = {
  createNotification,
  seenNotification,
  getListNotificationByReceiver
}

export default NotificationController
