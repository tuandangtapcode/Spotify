import ModalCustom from "src/components/ModalCustom"
import { useNavigate } from "react-router-dom"

const ModalCreateAccoutArtist = ({ open, onCancel, onOk }) => {
  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Thêm mới account"
    >
    </ModalCustom>
  )
}

export default ModalCreateAccoutArtist