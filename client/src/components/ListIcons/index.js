import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
  BsCheck
} from "react-icons/bs"

import {
  SearchOutlined,
  CloseOutlined,
  ArrowDownOutlined,
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  BarsOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import { PiMusicNotesPlus } from "react-icons/pi"

import {
  AiFillFolder,
  AiOutlinePlusCircle,
  AiOutlineEllipsis,
  AiFillEdit,
  AiOutlineClockCircle
} from "react-icons/ai"

import {
  FaUser,
  FaMusic
} from "react-icons/fa"

import {
  BiLogIn,
} from "react-icons/bi"

import {
  TbLock,
  TbLockOpen,
} from "react-icons/tb"

import { MdLibraryMusic } from "react-icons/md"

const ListIcons = {
  ICON_PLAY: <BsFillPlayFill className='fs-24' />,
  ICON_PLAY_FS_30: <BsFillPlayFill className='fs-30' />,
  ICON_PAUSE: <BsFillPauseFill className='fs-24' />,
  ICON_PAUSE_FS_30: <BsFillPauseFill className='fs-30' style={{ marginLeft: '-4px' }} />,
  ICON_VOLUME_MUTE: <BsFillVolumeMuteFill className="text fs-20" />,
  ICON_VOLUME_DOWN: <BsFillVolumeDownFill className="text fs-20" />,
  ICON_VOLUME_UP: <BsFillVolumeUpFill className="text fs-20" />,
  ICON_SEARCH_TEXT: <SearchOutlined className="text" />,
  ICON_SEARCH_FS_25: <SearchOutlined className='fs-25' />,
  ICON_CLOSE: <CloseOutlined className="text" />,
  ICON_ARROW_DOWN: <ArrowDownOutlined />,
  ICON_BELL: < BellOutlined className="fs-18 text" />,
  ICON_BELL_DASHBOARD: < BellOutlined className="fs-18" />,
  ICON_USER: <UserOutlined className="fs-18 text" />,
  ICON_HOME: <HomeOutlined className='fs-25' />,
  ICON_BAR: <BarsOutlined className='fs-25' />,
  ICON_ARROW_RIGHT: <ArrowRightOutlined />,
  ICON_PLUS: <PlusOutlined />,
  ICON_MUSIC_NOTE: <PiMusicNotesPlus className='fs-15 mr-4' />,
  ICON_FOLDER: <AiFillFolder className='fs-15 mr-4' />,
  ICON_LOADING: <LoadingOutlined
    style={{
      color: '#1ed760'
    }}
    spin
  />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_USER_DASHBOARD: < FaUser />,
  ICON_MUSIC_DASHBOARD: <FaMusic className="text" />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_BLOCK: <TbLock className="fs-18" />,
  ICON_UNBLOCK: <TbLockOpen className="fs-18" />,
  ICON_ALBUM_DASHBOARD: <MdLibraryMusic className="fs-18" />,
  ICON_CLOCK: <AiOutlineClockCircle className="text" />,
  ICON_PLUS_CIRCLE: <AiOutlinePlusCircle />,
  ICON_ELLIPSIS: <AiOutlineEllipsis />,
  ICON_CHECK: <BsCheck className="fw-800" />,
  ICON_EDIt: <AiFillEdit className="text-green fs-18" />,
}

export default ListIcons
