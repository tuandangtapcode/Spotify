import { Col, Dropdown, Row, Table, message } from "antd"
import { useState } from "react"
import { BsFillPlayFill } from "react-icons/bs"
import { handleSetCurrentMusic } from "src/lib/commonFunction"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { convertSecondsToMinutesAndSeconds, formatNumber } from "src/lib/stringUtils"
import ListIcons from "../../ListIcons"
import { globalSelector } from "src/redux/selector"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import UserService from "src/services/UserService"
import globalSlice from "src/redux/globalSlice"
import { MainTableHeader, SubTableHeader } from "../styled"
import TableCustom from ".."
import moment from "moment"

const TableListSong = ({ songs, getDetailPlaylist }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const global = useSelector(globalSelector)
  const location = useLocation()
  const [showPlayIcon, setShowPlayIcon] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkStatusFollow = (SongID) => {
    let playlist
    let listSongFollow = []
    global?.user?.Playlists?.forEach(i => {
      listSongFollow.push(...i?.Songs)
    })
    const song = listSongFollow?.find(i => i?._id === SongID)
    global?.user?.Playlists?.forEach(i => {
      if (!!i?.Songs?.find(i => i?._id === song?._id)) {
        playlist = i
      }
    })
    if (!!song) return playlist
    else return false
  }

  const checkStatusFollowInLovePlaylist = (SongID) => {
    const playlist = global?.user?.Playlists?.find(i => i?.Title === "Bài hát yêu thích")
    if (playlist?.Songs?.find(i => i?._id === SongID)) return true
    else return false
  }

  const handleAddOrDeleteLoveSong = async (Song, IsNewPlaylist, Playlist) => {
    try {
      setLoading(true)
      const res = await UserService.addOrDeleteLoveSong({ Song, IsNewPlaylist, PlaylistID: Playlist?._id })
      if (res?.isError) return
      dispatch(globalSlice.actions.setUser(res?.data))
      if (location?.pathname?.includes("playlist")) {
        getDetailPlaylist()
      } else {
        checkStatusFollow(Song?._id)
        checkStatusFollowInLovePlaylist(Song?._id)
      }
      message.success(`${res?.msg} ${!!Playlist ? Playlist?.Title : "Bài hát yêu thích"}`)
    } finally {
      setLoading(false)
    }
  }

  const subItems = (record) => (
    [
      {
        key: 0,
        label: (
          <Row onClick={() => handleAddOrDeleteLoveSong(record, true)}>
            <Col span={4}>
              <ButtonCircle
                className='noBackgroundColor miniCircle fs-15 p-0'
                icon={ListIcons.ICON_PLUS}
              />
            </Col>
            <Col span={20}>
              <span>Danh sách phát mới</span>
            </Col>
          </Row >
        )
      },
      ...global?.user?.Playlists?.map((i, idx) => (
        {
          key: idx + 1,
          label: (
            <Row
              onClick={() => handleAddOrDeleteLoveSong(record, false, i)}
            >
              {(i?.Songs?.find(i => i?._id === record?._id)) &&
                <Col span={4}>
                  <ButtonCircle
                    className="greendBackgroundColor miniCircle fs-15 p-0"
                    icon={ListIcons.ICON_CHECK}
                    loading={loading}
                  />
                </Col>}
              <Col span={20}>{i?.Title}</Col>
            </Row>
          )
        }
      ))
    ]
  )

  const items = (record) => [
    {
      key: 1,
      label: (
        <Dropdown
          trigger={["contextMenu"]}
          menu={{ items: subItems(record) }}
          placement="bottomLeft"
        >
          <Row >
            <Col span={4}>
              <ButtonCircle
                className='noBackgroundColor miniCircle fs-15 p-0'
                icon={ListIcons.ICON_PLUS}
              />
            </Col>
            <Col span={20}>
              <span>Thêm vào danh sách phát</span>
            </Col>
          </Row>
        </Dropdown>
      )
    },
    {
      key: 2,
      label: (
        <Row onClick={() => handleAddOrDeleteLoveSong(record)}>
          <Col span={4}>
            <ButtonCircle
              className={
                !!checkStatusFollowInLovePlaylist(record?._id)
                  ? "greendBackgroundColor miniCircle fs-15 p-0"
                  : "noBackgroundColor miniCircle fs-15 p-0"
              }
              icon={!!checkStatusFollowInLovePlaylist(record?._id) ? ListIcons.ICON_CHECK : ListIcons.ICON_PLUS_CIRCLE}
              loading={loading}
            />
          </Col>
          <Col span={20}>
            <span>
              {!!checkStatusFollowInLovePlaylist(record?._id)
                ? "Xóa khỏi Bài hát yêu thích của bạn"
                : "Lưu vào Bài hát yêu thích của bạn"}
            </span>
          </Col>
        </Row>
      )
    }
  ]

  const column = [
    {
      title: <span className="text">#</span>,
      isView: true,
      width: 40,
      render: (_, record, index) => (
        (!!showPlayIcon && showPlayIcon === record?._id) ?
          <BsFillPlayFill
            className="text"
            style={{
              height: '16px',
              width: '20px'
            }}
            onClick={() => handleSetCurrentMusic(global?.user?._id, record, dispatch, navigate)}
          />
          :
          <div
            className={record?._id === global?.currentSong?._id ? "text-green" : "text"}
            style={{
              height: '16px',
              width: '20px'
            }}
          >
            {index + 1}
          </div>
      )
    },
    {
      title: <span className="text">Tiêu đề</span>,
      isView: true,
      dataIndex: "Title",
      width: !!location?.pathname?.includes("playlist") && 230,
      render: (value, record, index) => (
        <div>
          <MainTableHeader onClick={() => navigate(`/song/${record?._id}`)}>{value}</MainTableHeader>
          {
            !location?.pathname?.includes("artist") &&
            <div className="d-flex">
              {
                record?.Artist?.map((i, idx) =>
                  <SubTableHeader
                    className="sub-table-header"
                    onClick={() => navigate(`/artist/${i?._id}`)}
                  >
                    {i?.FullName}
                    {idx !== record?.Artist?.length - 1 ? ", " : ""}
                  </SubTableHeader>
                )
              }
            </div>
          }
        </div>
      )
    },
    {
      title: <span className="text">Album</span>,
      width: 150,
      isView: !!location?.pathname?.includes("playlist"),
      render: (_, record, index) => (
        <div className="text">{record?.Album?.Title}</div>
      )
    },
    {
      title: <span className="text">Ngày thêm</span>,
      width: 150,
      isView: !!location?.pathname?.includes("playlist"),
      render: (_, record, index) => (
        <div className="text">{moment(record?.AddedAt).format("DD/MM/YYYY")}</div>
      )
    },
    {
      title: <span className="text">Lượt nghe</span>,
      isView: !!location?.pathname?.includes("artist"),
      dataIndex: "Listens",
      render: (value, record, index) => (
        <div className={record?._id === global?.currentSong?._id ? "text-green" : "text"}>
          {formatNumber(value)}
        </div>
      )
    },
    {
      title: ListIcons.ICON_CLOCK,
      isView: true,
      width: !!location?.pathname?.includes("playlist") ? 130 : 180,
      dataIndex: "Time",
      align: "center",
      key: "Time",
      render: (_, record, index) => (
        <div className="text d-flex-sb">
          {
            (!!record?.Artist?.every(i => i?._id !== global?.user?._id) ||
              location?.pathname?.includes("playlist")) &&
              (!!showPlayIcon &&
                showPlayIcon === record?._id) ?
              <div>
                <ButtonCircle
                  className={
                    !!checkStatusFollow(record?._id)
                      ? "greendBackgroundColor miniCircle fs-15 p-0"
                      : "noBackgroundColor miniCircle fs-15 p-0"
                  }
                  icon={!!checkStatusFollow(record?._id) ? ListIcons.ICON_CHECK : ListIcons.ICON_PLUS_CIRCLE}
                  onClick={() => {
                    const playlist = checkStatusFollow(record?._id)
                    if (!!playlist) {
                      handleAddOrDeleteLoveSong(record, false, playlist)
                    } else {
                      handleAddOrDeleteLoveSong(record)
                    }
                  }}
                  loading={loading}
                />
              </div>
              : <div style={{ width: "32px", height: "32px" }}></div>
          }
          <div>{convertSecondsToMinutesAndSeconds(record?.Time)}</div>
          {
            (!!record?.Artist?.every(i => i?._id !== global?.user?._id) ||
              location?.pathname?.includes("playlist")) &&
              (!!showPlayIcon &&
                showPlayIcon === record?._id) ?
              <div>
                <Dropdown
                  trigger={["click"]}
                  menu={{ items: items(record) }}
                >
                  <ButtonCircle
                    className="miniCircle noBackgroundColor"
                    icon={ListIcons.ICON_ELLIPSIS}
                  />
                </Dropdown>
              </div>
              : <div style={{ width: "32px", height: "32px" }}></div>
          }
        </div >
      )
    },
  ]


  return (
    <TableCustom
      columns={column?.filter(i => !!i?.isView)}
      dataSource={songs}
      pagination={false}
      rowKey="_id"
      onRow={(record, index) => {
        return {
          onMouseOver: () => {
            setShowPlayIcon(record?._id)
          },
          onMouseOut: () => {
            setShowPlayIcon(false)
          }
        }
      }}
    />
  )
}

export default TableListSong