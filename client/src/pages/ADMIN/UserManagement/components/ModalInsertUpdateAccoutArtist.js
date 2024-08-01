import ModalCustom from "src/components/ModalCustom"
import { Row, Col, Form } from "antd"
import { useNavigate } from "react-router-dom"
import InputCustom from "src/components/InputCustom"
import { getRegexEmail, getRegexPassowrd } from "src/lib/stringUtils"
import { DotStyled } from "src/pages/ANONYMOUS/SignupPage/styled"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { useEffect, useState } from "react"
import UserService from "src/services/UserService"
import { toast } from 'react-toastify'

const ModalInsertUpdateAccoutArtist = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        ...open,
        ...values,
        UpdateByAdmin: true
      }
      const res = !!open?._id
        ? await UserService.updateProfile(body)
        : await UserService.createAccoutArtist(body)
      if (res?.isError) return
      toast.success("Tạo tài khoản thành công")
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!open?._id) form.setFieldsValue(open)
  }, [open])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Thêm mới account"
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="haflLarge normal fw-700"
            htmlType="submit"
            loading={loading}
            onClick={() => handleSubmit()}
          >
            Lưu
          </ButtonCustom>
        </div>
      }
    >
      <Form form={form}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Form.Item
              name="FullName"
              rules={[
                { required: true, message: "Hãy nhập vào tên của bạn" },
              ]}
            >
              <InputCustom placeholder="FullName" />
            </Form.Item>
          </Col >
          <Col span={24}>
            <Form.Item
              name='Email'
              rules={[
                { required: true, message: 'Vui lòng nhập tên người dùng Spotify hoặc địa chỉ email' },
                { pattern: getRegexEmail(), message: 'Email không đúng định dạng' },
              ]}
            >
              <InputCustom
                placeholder="Email hoặc tên người dùng"
              />
            </Form.Item>
          </Col>
          {
            !open?._id &&
            <Col span={24}>
              <Form.Item
                name='Password'
                className="mb-8"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  { pattern: getRegexPassowrd(), message: "Mật khẩu sai định dạng" }
                ]}
              >
                <InputCustom
                  type='isPassword'
                  placeholder="Password"
                />
              </Form.Item>
              <div>
                <p className="text-gray">
                  <DotStyled />
                  Ký tự đầu tiên phải là một chữ cái in hoa (A-Z)
                </p>
                <p className="text-gray">
                  <DotStyled />
                  Các ký tự tiếp theo có thể là chữ cái (in hoa hoặc in thường) hoặc chữ số (0-9)
                </p>
                <p className="text-gray">
                  <DotStyled />
                  Ít nhất 5 ký tự tiếp theo
                </p>
              </div>
            </Col>
          }
        </Row >
      </Form >
    </ModalCustom >
  )
}

export default ModalInsertUpdateAccoutArtist