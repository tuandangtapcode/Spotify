import { Col, Form, Input, Radio, Row, Select } from "antd"
import AfterFirstStep from "../AfterFirstStep"
import { Link } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import InputCustom from "src/components/InputCustom"
import './style.scss'

const FormInfor = ({
  current,
  setCurrent,
  form,
  step,
  title,
  data,
  setData
}) => {
  return (
    <AfterFirstStep
      current={current}
      setCurrent={setCurrent}
      step={step}
      title={title}
    >
      <div>
        <div className="d-flex-start">
          <p className="fs-16 fw-600 text">Tên</p>
        </div>
        <div className="d-flex-start mb-4">
          <p className="fs-13 text-gray">Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
        </div>
        <Form.Item
          name='FullName'
          className="mb-12"
          rules={[
            { required: true, message: 'Vui lòng nhập tên người dùng Spotify hoặc địa chỉ email' },
          ]}
        >
          <InputCustom
            placeholder="Nhập tên của bạn"
          />
        </Form.Item>
        <div className="d-flex-start fs-16 fw-600 text mb-2">
          Ngày sinh
        </div>
        <div className="fs-13 text-gray">
          <div className="d-flex-start">
            Tại sao chúng tôi cần biết ngày sinh của bạn?
          </div>
          <Link className="text-gray" style={{ textDecoration: 'underline' }} to={'https://www.spotify.com/vn-vi/legal/end-user-agreement/'}>Tìm hiểu thêm</Link>
        </div>
        <Row gutter={8} className="mb-12">
          <Col span={6}>
            <Input placeholder="dd" />
          </Col>
          <Col span={12}>
            <Select style={{ height: '100%', width: "100%" }} placeholder="Tháng">
              <Select.Option>Tháng</Select.Option>
              {
                Array.from({ length: 12 }, (_, index) => index + 1).map(i =>
                  <Select.Option value={i}>Tháng {i}</Select.Option>
                )
              }
            </Select>
          </Col>
          <Col span={6}>
            <Input placeholder="yyyy" />
          </Col>
        </Row>
        <div className="d-flex-start">
          <p className="fs-16 fw-600 text">Giới tính</p>
        </div>
        <div className="d-flex-start mb-4">
          <p className="fs-13 text-gray">Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng cáo phù hợp với bạn.</p>
        </div>
        <Row gutter={[24, 8]} className="mb-40">
          <Col span={24}>
            <Row gutter={16}>
              <Col>
                <Radio className="text" value={1}>Nam</Radio>
              </Col>
              <Col>
                <Radio className="text" value={1}>Nữ</Radio>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex-start" span={24}>
            <Radio className="text" value={3}>Không phân biệt giới tính</Radio>
          </Col>
          <Col className="d-flex-start" span={24}>
            <Radio className="text" value={4}>Giới tính khác</Radio>
          </Col>
          <Col className="d-flex-start" span={24}>
            <Radio className="text" value={5}>Không muốn nêu cụ thể</Radio>
          </Col>
        </Row>
        <ButtonCustom
          className='submit fw-700 fs-16'
          htmlType="submit"
          onClick={async () => {
            const values = await form.validateFields()
            setData({ ...data, ...values })
            setCurrent(current + 1)
          }}
        >
          Tiếp theo
        </ButtonCustom>
      </div>
    </AfterFirstStep>
  )
}

export default FormInfor