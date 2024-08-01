import Header from "src/components/Header"
import { ContentStyled } from "src/pages/ANONYMOUS/HomePage/styled"

const HeaderLayout = ({ background, children }) => {

  return (
    <ContentStyled style={{
      background: background
    }}>
      <Header />
      <div className="text">
        {children}
      </div>
    </ContentStyled>
  )
}

export default HeaderLayout