import React from 'react'
import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './result.scss'
import ButtonCustom from 'src/components/ButtonCustom/MyButton'

const ForbiddenPage = () => {

  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<ButtonCustom className="submit fw-700" onClick={() => navigate('/')}>Back Home</ButtonCustom>}
    />
  )
}
export default ForbiddenPage