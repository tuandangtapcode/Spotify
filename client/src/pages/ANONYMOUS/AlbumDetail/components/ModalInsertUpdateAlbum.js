import ModalCustom from "src/components/ModalCustom"
import { useEffect, useState } from "react"
import { Col, Form, Row, Select, Upload, message } from "antd"
import InputCustom from "src/components/InputCustom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { CloudUploadOutlined } from '@ant-design/icons'
import AlbumService from "src/services/AlbumService"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { listGradients } from "src/lib/constant"
import { BackgroundItem } from "../styled"

const { Option } = Select

const ModalInsertUpdateAlbum = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState()
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)
  const [background, setBackground] = useState()

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

  const handleInsertUpdateAlbum = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = !!open?._id
        ? await AlbumService.updateAlbum({ Title: values?.Title, Avatar: avatar, AlbumID: open?._id, Background: background })
        : await AlbumService.createAlbum({ Title: values?.Title, Avatar: avatar, Background: background })
      if (res?.isError) return toast.error(res?.msg)
      if (!!open?._id) onOk()
      else navigate(`/album/${res?.data?._id}`)
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!open?._id) {
      form.setFieldsValue(open)
      setBackground(open?.Background)
    }
  }, [open])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={!!open?._id ? "Sửa thông tin chi tiết" : "Tạo mới album"}
      loading={loading}
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="haflLarge normal fw-700"
            htmlType="submit"
            loading={loading}
            onClick={() => handleInsertUpdateAlbum()}
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
                style={{ width: '100%' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div className="d-flex-center" style={{ height: "100%" }}>
                  <div className="mr-8">
                    <CloudUploadOutlined className="text" />
                  </div>
                  <div>
                    <span className="text">Chọn file</span>
                  </div>
                </div>
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : open?.AvatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <p className="text mb-12">Nhập vào tiêu đề của album</p>
            <Form.Item
              name='Title'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom
                placeholder={!!open?._id ? "" : "Tiêu đề"}
              />
            </Form.Item>
            <p className="text mb-12">Chọn màu nền cho album</p>
            <Form.Item
              name='BackgroundColor'
              className="mb-16"
              rules={[
                {
                  required: !!background ? false : true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <div className="d-flex-sb">
                {
                  listGradients?.map((i, idx) =>
                    <BackgroundItem
                      key={idx}
                      background={i}
                      isBackground={!!background?.includes(i)}
                      onClick={() => setBackground(i)}
                    />
                  )
                }
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalInsertUpdateAlbum