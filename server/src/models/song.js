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
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true }
      ],
      require: true
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
    Listens: {
      type: Number,
      default: 0
    }
  }, {
    timestamps: true
  })

  const Song = mongoose.model("Songs", SongSchema)

  export default Song
