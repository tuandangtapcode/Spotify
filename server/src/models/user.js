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
  Playlists: {
    type: [
      {
        Title: { type: String, required: true },
        Description: { type: String, default: "Mô tả" },
        AvatarPath: { type: String, default: 'https://res.cloudinary.com/dgxlg5mhl/image/upload/v1711697125/spotify_fake/Avatar/faqn4a2dvpbisk6smjio.png' },
        Subtitle: { type: String, default: 'Danh sách phát' },
        Type: { type: String, default: 'playlist' },
        AddedAt: { type: Date, default: Date.now },
        Songs: {
          type: [
            {
              Title: { type: String, required: true },
              AvatarPath: { type: String, required: true },
              Time: { type: Number, required: true },
              Artist: {
                type: [
                  { type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true }
                ],
              },
              Album: {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Albums', required: true },
                Title: { type: String, required: true }
              },
              AddedAt: { type: Date, default: Date.now }
            }
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
        Title: { type: String, required: true },
        AvatarPath: { type: String, required: true },
        Type: { type: String, default: 'album' },
        Subtitle: { type: String, default: 'Album' },
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
