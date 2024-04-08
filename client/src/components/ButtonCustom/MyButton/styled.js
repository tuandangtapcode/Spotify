import styled from "styled-components"
import { Button } from 'antd'

export const ButtomCustomStyled = styled(Button)`
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center bottom;
  &:hover {
    transform: scale(1.05);
  }
`