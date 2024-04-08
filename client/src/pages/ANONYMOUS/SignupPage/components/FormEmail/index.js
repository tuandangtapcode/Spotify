import { Form } from "antd"
import { getRegexEmail } from "src/lib/stringUtils"
import { OptionLoginStyled } from "src/pages/ANONYMOUS/LoginPage/styled"
import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from 'react-toastify'
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import UserService from "src/services/UserService"
import { useGoogleLogin } from "@react-oauth/google"

const FormEmail = ({
  current,
  setCurrent,
  form,
  setData
}) => {

  const [loading, setLoading] = useState(false)

  const checkEmailExistByForm = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.getUserByEmail(values)
      if (res?.isError) return toast.error(res?.msg)
      setData({ Email: values?.Email, IsByGoogle: false })
      setCurrent(current + 1)
    } finally {
      setLoading(false)
    }
  }

  const checkEmailExistByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
        if (!userInfor?.email) {
          return toast.error("Có lỗi xảy ra")
        } else {
          setData({ ...userInfor, IsByGoogle: true })
          setCurrent(current + 3)
        }
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div style={{ width: '300px' }} className="m-auto">
      <p className="fs-45 fw-700 mb-40 text">Đăng ký để bắt đầu nghe</p>
      <div className="d-flex-start">
        <p className="fs-16 fw-600 mb-8 text">Địa chỉ email</p>
      </div>
      <Form.Item
        name='Email'
        rules={[
          { required: true, message: 'Vui lòng nhập tên người dùng Spotify hoặc địa chỉ email' },
          { pattern: getRegexEmail(), message: 'Email không đúng định dạng' },
        ]}
      >
        <InputCustom
          placeholder="abc@gmail.com"
        />
      </Form.Item>
      <ButtonCustom
        className='submit fw-700 fs-16'
        htmlType="submit"
        loading={loading}
        onClick={() => checkEmailExistByForm()}
      >
        Tiếp theo
      </ButtonCustom>
      <hr></hr>
      <div className="list-option-login mt-50">
        <OptionLoginStyled
          className="align-items-center"
          onClick={() => checkEmailExistByGoogle()}
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
      <div className="mt-50 mb-25">
        <span className="mr-8 fs-16" style={{ color: '#6a6a6a' }}>
          Bạn có tài khoản?
          <Link to={'/login'} className="text" style={{ textDecoration: 'underline' }}> Đăng nhập tại đây</Link>
        </span>
      </div>
    </div >
  )
}

export default FormEmail