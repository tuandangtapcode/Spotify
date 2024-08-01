import { Col, Form, Row, Upload, message } from "antd"
import ModalCustom from "src/components/ModalCustom"
import { useEffect, useState } from "react"
import InputCustom from "src/components/InputCustom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { toast } from "react-toastify"
import globalSlice from "src/redux/globalSlice"
import UserService from "src/services/UserService"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

const ModalUpdateProfile = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState()
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)

  const handleChangeFile = (file) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else {
      setPreview(URL.createObjectURL(file))
      setAvatar(file)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { Image, ...remainValues } = values
      const res = await UserService.updateProfile({ ...remainValues, Avatar: avatar })
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue(global?.user)
  }, [])

  return (
    <ModalCustom
      title="Chi tiết hồ sơ"
      open={open}
      onCancel={onCancel}
      loading={loading}
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="haflLarge normal fw-700"
            htmlType="submit"
            loading={loading}
            onClick={() => handleUpdateProfile()}
          >
            Lưu
          </ButtonCustom>
        </div>
      }
    >
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={10}>
            <Form.Item
              className="image"
              name='Image'
              rules={[
                {
                  required: !!global?.user?.avatarPath ? false : true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <Upload
                beforeUpload={file => handleChangeFile(file)}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : global?.user?.avatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name='FullName'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalUpdateProfile