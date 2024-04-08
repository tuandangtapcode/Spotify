import mongoose from "mongoose"
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  Content: {
    type: String,
    require: true
  },
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  IsSeen: {
    type: Boolean,
    default: false
  },
  Type: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const Notification = mongoose.model("Notifications", NotificationSchema)

export default Notification
