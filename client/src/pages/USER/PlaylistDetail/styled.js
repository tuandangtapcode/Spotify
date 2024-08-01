import styled from "styled-components"

export const TitleStyled = styled.span`

@media only screen and (min-width: 1600px) {
  font-size: 80px;
}

@media only screen and (max-width: 1600px) and (min-width: 1200px) {
  font-size: 60px;
}

@media only screen and (max-width: 1200px) and (min-width: 992px) {
  font-size: 50px;
}

@media only screen and (max-width: 992px) and (min-width: 768px) {
  font-size: 40px;
}

@media only screen and (max-width: 768px) {
  font-size: 30px;
}
`