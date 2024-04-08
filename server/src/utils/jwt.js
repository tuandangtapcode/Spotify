import jwt from 'jsonwebtoken'

export const accessToken = (payload) => {
  const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '365d' })
  return access_token
}

export const refreshToken = (payload) => {
  const refresh_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
  return refresh_token
}
