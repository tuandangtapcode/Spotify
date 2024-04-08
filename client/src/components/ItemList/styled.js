import { Card } from "antd"
import styled from "styled-components"

export const ItemListStyled = styled.div`
 background-color: #171717;
 padding: 20px 16px;
 border-radius: 8px;
 cursor: pointer;
 &:hover {
  background-color: #282727;
 }
`

export const CardStyled = styled(Card)`
position: relative;
background-color: transparent;
border-color: transparent;
.ant-card-body {
  margin-top: 20px;
  padding: 0;
}
.ant-card-meta-title {
  color: white;
  font-weight: 700;
}
.ant-card-meta-description {
  color: #8d8989;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.icon-play {
  display: none;
}
&:hover .icon-play {
  display: block;
  animation: iconFadeIn ease 0.5s;
}
`

