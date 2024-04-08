import React from 'react'
import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './result.scss'
import ButtonCustom from 'src/components/ButtonCustom/MyButton'

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<ButtonCustom className="submit fw-700" onClick={() => navigate('/')}>Back Home</ButtonCustom>}
    />
  )
}
export default NotFoundPage