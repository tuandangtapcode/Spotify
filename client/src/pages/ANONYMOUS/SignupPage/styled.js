import styled from "styled-components"

export const SignupStyled = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
.ant-steps {
  width: 600px !important;
  margin: auto !important;
}
.ant-steps-icon-dot {
  display: none;
}
.ant-steps-item {
  flex: 1;
  margin: 0 !important;
  padding: 0 !important;
}
.ant-steps-item-last {
  flex: none;
}
.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail::after {
  background-color: #1ed760 !important;
} 
.ant-steps.ant-steps-dot .ant-steps-item-tail::after, .ant-steps.ant-steps-dot.ant-steps-small .ant-steps-item-tail::after {
  width: 100% !important;
}
`

export const HeaderSignupStyled = styled.div`
padding: 30px 50px;
`

export const SignupFormStyled = styled.div`
max-width: 100vw;
height: 100%;
width: 750px;
padding: 0 20px;
text-align: center;
border-radius: 8px;
.icon-google {
  background: url(https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg) center center no-repeat;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 10px;
}
.icon-facebook {
  background: url("https://accounts.scdn.co/sso/images/new-facebook-icon.eae8e1b6256f7ccf01cf81913254e70b.svg") center center no-repeat;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 10px;
}
.icon-back {
  background-color: transparent;
  border-color: transparent;
  &:hover {
    background-color: transparent !important; 
    color: white !important;
    border-color: transparent !important;
    }
}
hr {
  margin: 32px 0;
  border-image: initial;
  border-top: 1px solid rgb(41, 41, 41);
}
`