import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connect successfully!!")
  } catch (error) {
    console.log("Connect failures!!")
  }
}

export default connect
