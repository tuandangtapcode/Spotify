import { Checkbox, Form } from "antd"
import AfterFirstStep from "../AfterFirstStep"
import { CheckboxContainerStyled } from "./styled"
import { Link } from "react-router-dom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

const FormTermConditions = ({
  current,
  setCurrent,
  loading,
  handleRegister,
  step,
  title
}) => {

  return (
    <AfterFirstStep
      current={current}
      setCurrent={setCurrent}
      step={step}
      title={title}
    >
      <div>
        <Form.Item
          rules={[
            {
              required: true, message: 'Thông tin không được bỏ trống'
            }
          ]}
        >
          <CheckboxContainerStyled>
            <Checkbox className="text" value="A">Tôi không muốn nhận tin nhắn tiếp thị từ Spotify</Checkbox>
          </CheckboxContainerStyled>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true, message: 'Thông tin không được bỏ trống'
            }
          ]}
        >
          <CheckboxContainerStyled>
            <Checkbox className="text" value="B">Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung của Spotify cho mục đích tiếp thị.</Checkbox>
          </CheckboxContainerStyled>
        </Form.Item>
        <div>
          <p className="text mb-8">
            Bằng việc nhấp vào nút Đăng ký, bạn đồng ý với
            <Link className="text-green" to={'https://www.spotify.com/vn-vi/legal/end-user-agreement/'}> Điều khoản và điều kiện sử dụng </Link>
            của Spotify.
          </p>
        </div>
        <div>
          <p className="text mb-12">
            Để tìm hiểu thêm về cách thức Spotify thu thập, sử dụng, chia sẻ và bảo vệ dữ liệu cá nhân của bạn, vui lòng xem
            <Link className="text-green" to={'https://www.spotify.com/vn-vi/legal/privacy-policy/'}> Chính sách quyền riêng tư của Spotify. </Link>
          </p>
        </div>
        <ButtonCustom
          className='submit fw-700 fs-16'
          htmlType="submit"
          loading={loading}
          onClick={() => handleRegister()}
        >
          Đăng ký
        </ButtonCustom>
      </div>
    </AfterFirstStep>
  )
}

export default FormTermConditions