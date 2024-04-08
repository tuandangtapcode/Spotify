import './input.scss'
import { Input } from "antd"

const typeInput = (props) => {
  switch (props?.type) {
    case 'isPassword':
      return <Input.Password {...props} />
    case 'isTextArea':
      return <Input.TextArea {...props} />
    default:
      return <Input {...props} />
  }
}

const InputCustom = (props) => {

  return (
    <>
      {
        typeInput(props)
      }
    </>
  )
}

export default InputCustom