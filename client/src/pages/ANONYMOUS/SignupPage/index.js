import { LogoStyled } from "../LoginPage/styled"
import { HeaderSignupStyled, SignupFormStyled, SignupStyled } from './styled'
import { Form, Steps } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormEmail from "./components/FormEmail"
import FormPassword from "./components/FormPassword"
import FormInfor from "./components/FormInfor"
import FormTermConditions from "./components/FormTermConditions"
import { toast } from 'react-toastify'
import UserService from "src/services/UserService"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"


const SignupPage = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const global = useSelector(globalSelector)

  const handleRegister = async () => {
    try {
      setLoading(true)
      let res
      if (!!data?.IsByGoogle) {
        res = await UserService.registerByGoogle(data)
      } else {
        res = await UserService.register(data)
      }
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: 'Form email',
      content: <FormEmail
        current={current}
        setCurrent={setCurrent}
        setData={setData}
        form={form}
      />
    },
    {
      title: 'Form password',
      content: <FormPassword
        current={current}
        setCurrent={setCurrent}
        form={form}
        data={data}
        setData={setData}
        step={1}
        title='Tạo mật khẩu'
      />
    },
    {
      title: 'Form infor',
      content: <FormInfor
        current={current}
        setCurrent={setCurrent}
        form={form}
        data={data}
        setData={setData}
        step={2}
        title='Giới thiệu thông tin về bản thân bạn'
      />
    },
    {
      title: 'Form term condition',
      content: <FormTermConditions
        current={current}
        setCurrent={setCurrent}
        form={form}
        loading={loading}
        handleRegister={handleRegister}
        step={3}
        title='Điều khoản và điều kiện'
      />
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
  }))

  useEffect(() => {
    if (!!global?.user?._id) navigate('/')
  }, [])

  return (
    <SignupStyled className="backgroundGray">
      <HeaderSignupStyled style={{ cursor: 'pointer' }} >
        <Link to={'/'} style={{ textDecoration: 'none' }} className='align-items-center'>
          <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
          <span className='fw-600 text'>Spotify</span>
        </Link>
      </HeaderSignupStyled>

      <div className="d-flex justify-content-center" style={{ height: '100%', flexGrow: 1 }}>
        <SignupFormStyled >
          <Steps
            current={current}
            items={items}
            progressDot={true}
          />
          <div style={{ height: '100%' }}>
            <Form form={form} style={{ height: '100%' }}>
              {steps[current].content}
            </Form>
          </div>
        </SignupFormStyled>
      </div>
      <div
        className="mb-20"
        style={{
          textAlign: 'center',
        }}
      >
        <span className="fs-12 text-gray ">
          This site is protected by reCAPTCHA and the Google
          <br></br>
          <Link to={'https://policies.google.com/privacy'} className="text-gray" style={{ textDecoration: 'underline' }}> Privacy Policy </Link>
          and
          <Link to={'https://policies.google.com/terms'} className="text-gray" style={{ textDecoration: 'underline' }}> Terms of Service apply. </Link>
        </span>
      </div>
    </SignupStyled>
  )
}

export default SignupPage