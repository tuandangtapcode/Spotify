import styled from "styled-components"

export const AvatarArtistStyled = styled.img`
width: 20px;
height: 20px;
border-radius: 50%;
`

export const BackgroundItem = styled.div`
width: 35px;
height: 35px;
border-radius: 50%;
background: ${props => (props?.background)};
border: ${props => !!props?.isBackground ? "2px solid white" : ""};
`