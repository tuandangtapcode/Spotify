import styled from 'styled-components'

export const SidebarStyled = styled.div`
min-width: 26%;
.sidebar-top {
  margin-bottom: 10px;
  background-color: rgb(20, 19, 19);
  border-radius: 4px;
  padding: 12px;
}
`
export const ContentSidebarStyled = styled.div`
width: 100%;
overflow: hidden;
.content-poper {
    cursor: pointer;
    color: white;
    &:hover {
      background-color: rgb(46, 43, 43);
    }
}

.sidebar-bottom {
  background-color: rgb(20, 19, 19);
  border-radius: 4px;
  padding: 12px;
  height: calc(100vh - 200px);
  .icon-plus {
    padding: 5px 7px;
    border-radius: 50%;
    background-color: transparent;
    border-color: transparent;
    color: white;
    &:hover {
      background-color: rgb(30, 29, 29);
      color: white;
      border-color: transparent;
    }
  }
}

.sidebar-bottom-content {
  overflow-y: auto; 
  height: calc(100vh - 300px);
  &::-webkit-scrollbar {
    margin-left: 30px;
    width: 13px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
  }
}

.sidebar-bottom-items {
  background-color: rgb(46, 43, 43);
  width: 100%;
  margin-top: 20px;
  padding: 12px 0px 16px 2px;
  border-radius: 8px;
}

.ant-tabs-nav {
  display: none;
}
`

export const LogoStyled = styled.img`
border-radius: 50%;
width: 25px;
height: 25px;
margin-right: 4px;
`

export const ContentPoperStyled = styled.div`
cursor: pointer;
line-height: 34px;
padding-left: 8px;
padding-right: 8px;
color: white;
&:hover {
  background-color: rgb(67, 63, 63);
}
`
export const ContentPoperLoginStyled = styled.div`
padding-right: 12px;
.text {
  color: white;
}
`
export const LibraryItemStyled = styled.div`
padding: 8px;
border-radius: 8px;
cursor: pointer;
&:hover {
  background-color: rgb(32, 30, 30);
}
`