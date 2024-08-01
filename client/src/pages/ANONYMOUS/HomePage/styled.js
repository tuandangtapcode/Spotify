import styled from "styled-components"

export const ContentStyled = styled.div`
padding: 8px 30px 16px 30px;
hr {
  margin: 70px 0;
  border-image: initial;
  border-top: 1px solid gray;
}
.ant-table, 
.ant-table-thead, 
.ant-table-wrapper, 
.ant-table-thead >tr>th,
.ant-table-wrapper, 
.ant-table-thead >tr>th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
  background-color: rgb(20, 19, 19) !important;
}

.ant-table-row >.ant-table-cell-row-hover {
  background-color: #6a6a6a !important;
}

.ant-table-thead >tr>th {
  border-bottom: 1px solid #6a6a6a !important;
}

.ant-table-tbody >tr >td {
  border-bottom: transparent !important;
}
`