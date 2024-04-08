import mongoose from "mongoose"
const Schema = mongoose.Schema

const SongSchema = new Schema({
  Title: {
    type: String,
    require: true
  },
  Lyrics: {
    type: String,
    require: true
  },
  Artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  Album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Albums',
    default: null
  },
  AudioPath: {
    type: String,
    require: true
  },
  AvatarPath: {
    type: String,
    require: true
  },
  Time: {
    type: Number,
    default: 0
  },
  Listener: {
    type: Number,
    default: 0
  },
  Like: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Song = mongoose.model("Songs", SongSchema)

export default Song
