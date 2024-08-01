import { Col, Form, Row } from "antd"
import ModalCustom from "src/components/ModalCustom"
import { useState } from "react"
import InputCustom from "src/components/InputCustom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { changePassword } from "src/services/UserService"
import { toast } from "react-toastify"
import globalSlice from "src/redux/globalSlice"

const ModalChangePassword = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // const handleChangePassword = async () => {

  //   try {
  //     setLoading(true)
  //     const values = await form.validateFields()
  //     if (values?.renewpassword !== values?.newpassword)
  //       return toast.error('Hãy điền đúng mật khẩu mới')
  //     const res = await changePassword(global?.user?._id, values)
  //     if (res?.isError) return toast.error(res?.msg)
  //     toast.success(res?.msg)
  //     dispatch(globalSlice.actions.setUser(res?.data))
  //     onCancel()
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <ModalCustom
      title="Đổi mật khẩu"
      open={open}
      onCancel={onCancel}
      // handleSubmit={handleChangePassword}
      loading={loading}
    >
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name='oldpassword'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom placeholder="Mật khẩu hiện nay" type="isPassword" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='newpassword'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom placeholder="Mật khẩu mới" type="isPassword" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='renewpassword'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom placeholder="Lặp lại mật khẩu mới" type="isPassword" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalChangePassword