import { Form } from "antd"
import AfterFirstStep from "../AfterFirstStep"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/ButtonCustom/MyButton"

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
          ]}
        >
          <InputCustom
            type='isPassword'
          />
        </Form.Item>
        <div className=" mb-20">
          <span className="text-gray">Mật khẩu phải có ít nhất 8 ký tự. Bạn nên dùng ít nhất 1 chữ số và 1 ký tự đặc biệt.</span>
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