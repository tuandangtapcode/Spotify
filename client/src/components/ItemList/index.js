import { Card } from 'antd'
import { CardStyled, ItemListStyled } from "./styled"
import { ButtonCicleStyled } from 'src/components/ButtonCustom/ButtonCircle/styled'
import ListIcons from '../ListIcons'

const { Meta } = Card

const ItemList = ({ item }) => {
  return (
    <ItemListStyled>
      <CardStyled
        cover={<img style={{ borderRadius: '8px' }} alt="example" src={item?.AvatarPath} />}
      >
        <Meta title={item?.Title} description={item?.Description} />
        <ButtonCicleStyled
          style={{
            position: 'absolute',
            right: '8px',
            bottom: '50%'
          }}
          className='mediumCircle greendBackgroundColor icon-play'
          icon={ListIcons.ICON_PLAY_FS_30}
        />
      </CardStyled>
    </ItemListStyled>
  )
}

export default ItemList