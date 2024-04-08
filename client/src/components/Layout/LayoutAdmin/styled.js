import styled from "styled-components"

export const LayoutAdminStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
.menu-container {
  margin-right: 12px;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
}
.ant-menu-item {
  color: white;
}
.ant-menu-light, .ant-menu-item-selected {
  background-color: black;
  color: white;
  &:hover {
    background-color: black;
  }   
}
.ant-menu-light .ant-menu-item {
  &:hover {
    color: white !important;
    background-color: black !important;
  }
}
.ant-menu-item-selected .ant-menu-item-icon {
    color: blue;
}
.ant-menu-title-content {
  color: white;
}
.content-container {
  padding: 12px;
  overflow: scroll;
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
.collapsed-menu {
  padding: 12px 20px;
}
.anticon {
  color: white;
}
`