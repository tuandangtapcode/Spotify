import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
  FullName: {
    type: String,
    require: true
  },
  Email: {
    type: String,
    require: true
  },
  Password: {
    type: String
  },
  AvatarPath: {
    type: String,
    require: true,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
  },
  RoleID: {
    type: Number,
    require: true
  },
  IsByGoogle: {
    type: Boolean,
    require: true
  },
  IsActive: {
    type: Boolean,
    default: true
  },
  LoveSongs: {
    type: [
      {
        SongID: { type: mongoose.Schema.Types.ObjectId, ref: 'Songs', required: true },
        Type: { type: String, default: 'Bài hát yêu thích' },
        AddedAt: { type: Date, default: Date.now },
      }
    ],
    default: []
  },
  Playlists: {
    type: [
      {
        Title: { type: String, required: true },
        Description: { type: String, default: "Mô tả" },
        AvatarPath: { type: String, default: 'https://res.cloudinary.com/dgxlg5mhl/image/upload/v1698718351/spotify_fake/Avatar/jqz23hptwstcbru3riw9' },
        Type: { type: String, default: 'Danh sách phát' },
        AddedAt: { type: Date, default: Date.now },
        Songs: {
          type: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Songs' }
          ],
          default: []
        }
      }
    ],
    default: []
  },
  Albums: {
    type: [
      {
        AlbumID: { type: mongoose.Schema.Types.ObjectId, ref: 'Albums', required: true },
        Type: { type: String, default: 'Album' },
        AddedAt: { type: Date, default: Date.now },
      }
    ],
    default: []
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

const User = mongoose.model("Users", UserSchema)

export default User
