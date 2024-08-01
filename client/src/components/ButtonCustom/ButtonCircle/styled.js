import { Button } from "antd"
import styled from "styled-components"

export const ButtonCicleStyled = styled(Button)`
  border-radius: 50% !important;
  border-color: transparent !important;
  transition: transform 0.3s ease;
  transform-origin: center bottom;
  &:hover {
    border-color: transparent !important;
    transform: scale(1.05);
  }
`