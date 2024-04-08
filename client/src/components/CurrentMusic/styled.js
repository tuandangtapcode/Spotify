import { Slider } from "antd"
import styled from "styled-components"

export const CurrentMusicStyled = styled.div`
background-color: black;
display: flex !important;
justify-content: space-between;
align-items: center;
padding: 8px 12px;
position: fixed;
right: 0;
left: 0;
bottom: 0;
z-index: 1;
`

export const SliderStyled = styled(Slider)`
.ant-slider-rail {
  background-color: #6a6a6a !important;
  height: 3px !important;
}
.ant-slider-handle {
  display: none !important;
}
&:hover .ant-slider-handle {
  display: block !important;
}
.ant-slider-track {
  background-color: #1ed760 !important;
  height: 3px !important;
}
.ant-slider-handle::after, .ant-slider-handle:focus::after{
  box-shadow: 0 0 0 0 transparent !important;
}
`