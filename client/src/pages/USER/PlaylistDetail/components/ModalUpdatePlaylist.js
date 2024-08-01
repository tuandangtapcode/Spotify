import { Col, Form, Row, Upload, message } from "antd"
import ModalCustom from "src/components/ModalCustom"
import { useEffect, useState } from "react"
import InputCustom from "src/components/InputCustom"
import { toast } from "react-toastify"
import globalSlice from "src/redux/globalSlice"
import { useDispatch } from 'react-redux'
import TextArea from "antd/es/input/TextArea"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import UserService from "src/services/UserService"

const ModalUpdatePlaylist = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState()
  const [preview, setPreview] = useState()

  const handleUpdatePlaylist = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { Image, ...remainValues } = values
      const res = await UserService.updatePlaylist({ ...remainValues, PlaylistID: open?._id, Avatar: avatar })
      if (res?.isError) return toast.error(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
      toast.success("Cập nhật playlist thành công")
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

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

  useEffect(() => {
    form.setFieldsValue(open)
  }, [])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title="Sửa thông tin chi tiết"
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="haflLarge normal fw-700"
            htmlType="submit"
            loading={loading}
            onClick={() => handleUpdatePlaylist()}
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
                  required: !!open?.AvatarPath ? false : true, message: 'Thông tin không được để trống'
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
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : open?.AvatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name='Title'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom />
            </Form.Item>
            <Form.Item
              name='Description'
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom >
  )
}

export default ModalUpdatePlaylist