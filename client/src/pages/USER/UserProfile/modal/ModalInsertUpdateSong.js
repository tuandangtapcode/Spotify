import { Col, Form, Row, Upload, message, Space, Select } from "antd"
import ModalCustom from "src/components/ModalCustom"
import { CloudUploadOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from "react"
import InputCustom from "src/components/InputCustom"
import { toast } from "react-toastify"
import { SliderStyled } from "src/components/CurrentMusic/styled"
import TextArea from "antd/es/input/TextArea"
import SongService from "src/services/SongService"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import UserService from "src/services/UserService"
import "../style.scss"

const { Option } = Select

const ModalInsertUdpateSong = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const global = useSelector(globalSelector)
  const [loading, setLoading] = useState(false)
  const [previewAudioSong, setPreviewAudioSong] = useState()
  const [previewAvatarSong, setPreviewAvatarSong] = useState()
  const [audio, setAudio] = useState()
  const [avatar, setAvatar] = useState()
  const audioRef = useRef()
  const [currentTime, setCurrentTime] = useState()
  const [artists, setArtists] = useState([])

  const handleChangeFile = (file, type) => {
    let allowedImageTypes
    let isAllowedType
    if (type === 'image') {
      allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
      isAllowedType = allowedImageTypes.includes(file.type)
      if (!isAllowedType) {
        message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
      } else {
        setPreviewAvatarSong(URL.createObjectURL(file))
        setAvatar(file)
      }
    } else {
      allowedImageTypes = ["audio/mpeg", "audio/mp3"]
      isAllowedType = allowedImageTypes.includes(file.type)
      if (!isAllowedType) {
        message.error("Yêu cầu chọn file mp3")
      } else {
        setPreviewAudioSong(URL.createObjectURL(file))
        setAudio(file)
      }
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  const handleInsertUpdateSong = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { MP3, Image, ...remainValues } = values
      const body = {
        ...remainValues,
        Audio: audio,
        Avatar: avatar,
        Album: !!open?.AlbumID ? open?.AlbumID : undefined,
        Time: audioRef.current.duration,
        Artist: !!remainValues?.OtherArtist?.length
          ? [
            global?.user?._id,
            ...remainValues?.OtherArtist
          ]
          : [global?.user?._id]
      }
      const res = !!open?._id
        ? await SongService.updateSong(body)
        : await SongService.createSong(body)
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      onOk()
      onCancel()
    } finally {
      setLoading(true)
    }
  }

  const getListArtist = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListArtist()
      if (res?.isError) return
      setArtists(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!open?._id) {
      form.setFieldsValue(open)
    }
  }, [open])

  useEffect(() => {
    if (!!previewAudioSong) {
      audioRef.current.play()
    }
  }, [previewAudioSong])

  useEffect(() => {
    getListArtist()
  }, [])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={!!open?._id ? "Sửa thông tin bài hát" : "Thêm bài hát"}
      loading={loading}
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="haflLarge normal fw-700"
            loading={loading}
            onClick={() => handleInsertUpdateSong()}
          >
            Lưu
          </ButtonCustom>
        </div>
      }
    >
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <p className="text mb-12">Nhập tên bài hát của bạn</p>
            <Form.Item
              name='Title'
              className="mb-16"
            // rules={[
            //   {
            //     required: true, message: 'Thông tin không được để trống'
            //   }
            // ]}
            >
              <InputCustom
                placeholder={!!open?._id ? "" : "Tên bài hát"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <p className="text mb-12">Nghệ sĩ cùng sáng tác</p>
            <Form.Item
              name='OtherArtist'
              className="mb-16"
            >
              <Select
                placeholder="Nghệ sĩ cùng sáng tác"
                mode="multiple"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
              >
                {
                  !!artists.length &&
                  artists?.map(i =>
                    <Option key={i?._id} value={i?._id}>{i?.FullName}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <p className="text mb-12">Nhập lời bài hát của bạn</p>
            <Form.Item
              name='Lyrics'
              className="mb-16"
            // rules={[
            //   {
            //     required: true, message: 'Thông tin không được để trống'
            //   }
            // ]}
            >
              <TextArea
                rows={5}
                placeholder={!!open?._id ? "" : "Lời bài hát"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className="image"
              name='Image'
            // rules={[
            //   {
            //     required: !!open?.avatarPath ? false : true, message: 'Thông tin không được để trống'
            //   }
            // ]}
            >
              <Upload
                beforeUpload={file => handleChangeFile(file, 'image')}
                style={{ width: '100%' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div className="d-flex-center mb-12" style={{ height: "100%" }}>
                  <div className="mr-8">
                    <CloudUploadOutlined className="text" />
                  </div>
                  <div>
                    <span className="text">Chọn file cho avatar của bài hát</span>
                  </div>
                </div>
                <img style={{ width: '100%', height: '180px' }} src={!!previewAvatarSong ? previewAvatarSong : open?.avatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className="mp3"
              name='MP3'
            // rules={[
            //   {
            //     required: !!open?.avatarPath ? false : true, message: 'Thông tin không được để trống'
            //   }
            // ]}
            >
              <Upload
                beforeUpload={file => handleChangeFile(file, 'audio')}
                style={{ width: '100%' }}
                accept="audio/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div className="d-flex-center mt-8" style={{ height: "100%" }}>
                  <div className="mr-8">
                    <CloudUploadOutlined style={{ cursor: 'pointer' }} className="text" />
                  </div>
                  <div>
                    <span style={{ cursor: 'pointer' }} className="text">Chọn file audio cho bài hát</span>
                  </div>
                </div>
                <audio
                  onTimeUpdate={() => {
                    const currentTime = Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)
                    setCurrentTime(currentTime)
                  }}
                  ref={audioRef}
                  src={!!previewAudioSong ? previewAudioSong : open?.audioPath}
                  alt=""
                />
              </Upload>
              {
                !!previewAudioSong &&
                <SliderStyled
                  step={1}
                  min={0}
                  max={100}
                  value={currentTime}
                  onChange={e => {
                    audioRef.current.currentTime = e / 100 * audioRef.current.duration
                    setCurrentTime(e)
                  }}
                />
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalInsertUdpateSong