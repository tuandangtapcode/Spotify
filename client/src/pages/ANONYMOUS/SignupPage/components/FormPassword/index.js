import { Form } from "antd"
import AfterFirstStep from "../AfterFirstStep"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { DotStyled } from "../../styled"
import { getRegexPassowrd } from "src/lib/stringUtils"

const FormPassword = ({
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
          <p className="fs-16 fw-600 mb-8 text">Mật khẩu</p>
        </div>
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

export default FormPassword