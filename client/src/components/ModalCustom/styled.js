import { Modal } from "antd"
import styled from "styled-components"

export const ModalCustomStyled = styled(Modal)`

.ant-modal-content, .ant-modal-header {
  background-color: rgb(54, 53, 53);
}
.ant-modal-title {
 color: white;
 font-size: 20px;
 font-weight: 700;
}
.ant-modal-footer {
  text-align: unset;
  background: transparent !important;
  margin-top: 12px !important;
}
.ant-modal-close {
  color: white !important;
  &:hover {
    background-color: #6a6a6a !important; 
    border-radius: 50% !important;
  }
}
`