import ListIcons from "src/components/ListIcons"

export const menuItem = () => {
  return [
    {
      icon: ListIcons.ICON_USER_DASHBOARD,
      label: "Người dùng",
      key: '/dashboard/users',
    },
    {
      icon: ListIcons.ICON_ALBUM_DASHBOARD,
      label: "Album",
      key: '/dashboard/albums',
    },
    {
      icon: ListIcons.ICON_MUSIC_DASHBOARD,
      label: "Bài hát",
      key: '/dashboard/songs',
    },
    {
      icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
      label: "Đăng xuất",
      key: 'logout',
    },
  ]
}