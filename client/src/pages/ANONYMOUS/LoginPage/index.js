import { HeaderLoginStyled, LoginFormStyled, LoginStyled, LogoStyled, OptionLoginStyled } from "./styled"
import { Form } from "antd"
import { getRegexEmail } from "src/lib/stringUtils"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import InputCustom from "src/components/InputCustom"
import UserService from "src/services/UserService"
import { useGoogleLogin } from "@react-oauth/google"
import socket from "src/utils/socket"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLoginByForm = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.login(values)
      if (res?.isError) return toast.error(res?.msg)
      const user = jwtDecode(res?.data)
      if (!!user?.payload?.ID) {
        getDetailProfile(res?.data)
      } else {
        navigate('/forbidden')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLoginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
        const res = await UserService.loginByGoogle(userInfor)
        if (res?.isError) return toast.error(res?.msg)
        const user = jwtDecode(res?.data)
        if (!!user.payload.ID) {
          getDetailProfile(res?.data)
        } else {
          navigate('/forbidden')
        }
      } finally {
        setLoading(false)
      }
    },
  })

  const getDetailProfile = async (token) => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(token)
      if (res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      localStorage.setItem('token', token)
      socket.connect()
      if (res?.data?.RoleID === 1) navigate('/dashboard/users')
      else navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!global?.user?._id) navigate('/')
  }, [])

  return (
    <LoginStyled className="">
      <HeaderLoginStyled style={{ cursor: 'pointer' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }} className='align-items-center'>
          <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
          <span className='fw-600 text'>Spotify</span>
        </Link>
      </HeaderLoginStyled>

      <div className="d-flex-center">
        <LoginFormStyled className="mt-25">
          <p className="fs-45 fw-700 mt-60 text">Đăng nhập vào Spotify fake</p>
          <div className="list-option-login mt-50">
            <OptionLoginStyled
              className="align-items-center"
              onClick={() => handleLoginByGoogle()}
            >
              <span className="icon-google"></span>
              <span className="title-login text">Tiếp tục bằng Google</span>
            </OptionLoginStyled>
            <OptionLoginStyled className="align-items-center">
              <span className="icon-facebook"></span>
              <span className="title-login text">Tiếp tục bằng Facebook</span>
            </OptionLoginStyled>
          </div>
          <hr></hr>
          <div style={{ width: '300px' }} className="m-auto">
            <Form form={form}>
              <div className="d-flex-start">
                <p className="fs-16 fw-600 mb-8 text">Email hoặc tên người dùng</p>
              </div>
              <Form.Item
                name='Email'
                rules={[
                  { required: true, message: 'Vui lòng nhập tên người dùng Spotify hoặc địa chỉ email' },
                  { pattern: getRegexEmail(), message: 'Email không đúng định dạng' },
                ]}
              >
                <InputCustom placeholder="Email hoặc tên người dùng" />
              </Form.Item>

              <div className="d-flex-start">
                <p className="fs-16 fw-600 mb-8 text">Mật khẩu</p>
              </div>
              <Form.Item
                name='Password'
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                ]}
              >
                <InputCustom
                  placeholder="Mật khẩu"
                  type="isPassword"
                />
              </Form.Item>

              <ButtonCustom
                className='submit fw-700 fs-16'
                htmlType="submit"
                loading={loading}
                onClick={() => handleLoginByForm()}
              >
                Đăng nhập
              </ButtonCustom>
            </Form>
          </div>
          <div className="mt-25">
            <Link className="text">Quên mật khẩu của bạn?</Link>
          </div>
          <hr></hr>
          <div className="mt-50">
            <span className="mr-8 text-gray">Bạn chưa có tài khoản?</span>
            <Link to={'/signup'} className="text">Đăng ký Spotify fake</Link>
          </div>
          <div className="mt-80 mb-30">
            <p className="fs-12 text-gray">
              Trang web này được bảo vệ bằng reCAPTCHA và tuân theo
              <Link to={'https://policies.google.com/privacy'} className="text-gray"> Chính sách quyền riêng tư </Link>
              cũng như
              <Link to={'https://policies.google.com/terms'} className="text-gray"> Điều khoản dịch vụ </Link>
              của Google</p>
          </div>
        </LoginFormStyled>
      </div >
    </LoginStyled >
  )
}

export default LoginPage