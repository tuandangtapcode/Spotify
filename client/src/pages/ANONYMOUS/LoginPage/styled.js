import { Button } from "antd"
import styled from "styled-components"

export const LoginStyled = styled.div`
background: #000000; 
min-height: 100vh;
background: -webkit-linear-gradient(to bottom, #434343, #000000); 
background: linear-gradient(to bottom, #434343, #000000); 
`

export const LogoStyled = styled.img`
border-radius: 50%;
width: 45px;
height: 45px;
margin-right: 4px;
`

export const HeaderLoginStyled = styled.div`
background-color: black;
padding: 30px 50px;
`
export const LoginFormStyled = styled.div`
max-width: 100vw;
width: 750px;
padding: 0 20px;
background-color: black;
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
hr {
  margin: 32px 100px;
  border-image: initial;
  border-top: 1px solid rgb(41, 41, 41);
}
`

export const OptionLoginStyled = styled(Button)`
background-color: transparent !important;
margin: 8px auto;
height: 50px;
width: 300px;
border-radius: 40px !important;
border-color: gray;
&:hover {
  border-color: white !important;
  background-color: transparent !important;  
}
.title-login {
  margin-left: 24px;
  margin: auto;
  font-size: 15px;
  font-weight: 600;
}
`
