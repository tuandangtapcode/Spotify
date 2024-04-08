import mongoose from "mongoose"
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  Title: {
    type: String,
    require: true
  },
  Artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  AvatarPath: {
    type: String,
    require: true
  },
  Like: {
    type: Number,
    default: 0
  },
  Followers: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
    ],
    default: []
  }
}, {
  timestamps: true
})

const Album = mongoose.model("Albums", AlbumSchema)

export default Album
