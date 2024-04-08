import { Col, Row } from "antd"
import ItemList from "src/components/ItemList"
import { ContentStyled } from "./styled"

const HomePage = () => {

  const playlists = [
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f00000002eaa44a568d7c409188d72afd',
      Title: "Today's Top Hits",
      Description: 'Dua Lipa is on top of the Hottest 50!'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f00000002cd0b355b4d64916ddf088de2',
      Title: "RapCaviar",
      description: 'New music from Drake, Lil Wayne and 2 Chainz'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f000000027bcd851d16216fae85f63a28',
      Title: "All Out 2010s",
      description: 'The biggest songs of the 2010s'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e',
      Title: "Rock Classics",
      description: 'Rock legends & epic songs that continue to inspire generations. Cover: Foo Fighters'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe',
      Title: "Chill Hits",
      description: 'Kick back to the best new and recent chill hits.'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f000000023ee89c19df387d93c7cb0ae9',
      Title: "Viva Latino",
      description: "Today's top Latin hits, elevando nuestra música. Cover: Maria Becerra"
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f00000002db32a17c1f5291b19317b62e',
      Title: "Mega Hit Mix",
      description: 'A mega mix of 75 favorites from the last few years!'
    },
    {
      AvatarPath: 'https://i.scdn.co/image/ab67706f000000027876fe166a29b8e6b8db14da',
      Title: 'All Out 80s',
      description: 'The biggest songs of the 1980s. Cover: Michael Jackson.'
    }
  ]

  return (
    <>
      <ContentStyled className=" text">
        <p className="fs-23 fw-800 mb-20">Danh sách phát trên Spotify</p>
        <Row gutter={[16, 16]}>
          {
            playlists?.map(playlist =>
              <Col span={4}>
                <ItemList item={playlist} />
              </Col>
            )
          }
        </Row>
      </ContentStyled>
    </ >
  )
}

export default HomePage