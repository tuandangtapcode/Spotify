import jwt from 'jsonwebtoken'
import { response } from '../utils/lib.js'
import * as dotenv from "dotenv"
dotenv.config()

const checkExistToken = (req) => {
  let check = false
  if (!!req.headers.token) {
    check = true
  }
  return check
}

const authMiddleware = (Roles) => {
  return (req, res, next) => {
    const checkToken = checkExistToken(req)
    if (!checkToken) {
      return res.status(401).json(
        response({}, true, 'Không có token')
      )
    }
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err) {
        return res.status(401).json(
          response({}, true, err.toString())
        )
      }
      const { payload } = decode
      if (Roles.includes(payload.RoleID)) {
        req.user = payload
        next()
      } else {
        return res.status(403).json(
          response({}, true, 'Bạn không có quyền')
        )
      }
    })
  }
}

export default authMiddleware
