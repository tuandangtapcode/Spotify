import { Space } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import ButtonCircle from "src/components/ButtonCustom/ButtonCircle"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import ListIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import { roles } from "src/lib/constant"
import UserService from "src/services/UserService"
import ModalInsertUpdateAccoutArtist from "./components/ModalInsertUpdateAccoutArtist"

const UserManagement = () => {

  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 5,
  })
  const [openInsertUpdateAccoutArtist, setOpenInsertUpdateAccountArtist] = useState(false)

  const getListUser = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListUser(pagination)
      if (res?.isError) return
      setUsers(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListUser()
  }, [pagination])

  const lstBtn = (record) => (
    [
      {
        name: 'Cấm',
        disabled: record?.IsActive ? false : true,
        isEnabled: true,
        icon: ListIcons.ICON_BLOCK,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Bạn có muốn cấm tài khoản này không?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              // handleBannedOrUnban(record?._id)
              close()
            },
          })
        }
      },
      {
        name: 'Bỏ cấm',
        disabled: record?.IsActive ? true : false,
        isEnabled: true,
        icon: ListIcons.ICON_UNBLOCK,
        onClick: () => {
          ConfirmModal({
            record,
            title: `Bạn có muốn bỏ cấm tài khoản này không?`,
            okText: "Yes",
            cancelText: "No",
            onOk: async close => {
              // handleBannedOrUnban(record?._id)
              close()
            },
          })
        }
      },
      {
        name: "Chỉnh sửa",
        icon: ListIcons.ICON_EDIt,
        isEnabled: record?.RoleID === 2,
        onClick: () => setOpenInsertUpdateAccountArtist(record)
      }
    ]
  )

  const column = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => (
        <div>{index + 1}</div>
      ),
    },
    {
      title: "Tên",
      align: "center",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Role",
      align: "center",
      render: (_, record, index) => (
        <span>
          {roles?.find(i => i?.RoleID === record?.RoleID)?.RoleName}
        </span>
      ),
    },
    {
      title: "Ngày đăng ký",
      align: "center",
      render: (_, record, index) => (
        <div>{moment(record?.createdAt).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Trạng thái",
      align: "center",
      render: (_, record, index) => (
        <>
          {
            record?.IsActive
              ? <div className="text-green">Active</div>
              : <div className="text-red">In-active</div>
          }
        </>
      ),
    },
    {
      title: "Cấm/ Bỏ cấm",
      align: "center",
      render: (_, record) => (
        <Space>
          {lstBtn(record).map(i =>
            i?.isEnabled &&
            <ButtonCircle
              disabled={i?.disabled}
              className="normal"
              title={i?.name}
              icon={i?.icon}
              onClick={i?.onClick}
            />
          )}
        </Space>
      )
    }
  ]

  return (
    <SpinCustom spinning={loading}>
      <div className="mb-20 mt-12 d-flex-sb">
        <h2>Quản lý người dùng</h2>
        <ButtonCustom
          className="borderGreen medium"
          onClick={() => setOpenInsertUpdateAccountArtist(true)}
        >
          Thêm tài khoản nghệ sĩ
        </ButtonCustom>
      </div>
      <TableCustom
        columns={column}
        dataSource={users}
        pagination={{
          hideOnSinglePage: total <= 5,
          current: pagination?.CurrentPage,
          pageSize: pagination?.PageSize,
          responsive: true,
          total: total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (CurrentPage, PageSize) =>
            setPagination({
              ...pagination,
              CurrentPage,
              PageSize,
            }),
        }}
      />

      {
        !!openInsertUpdateAccoutArtist &&
        <ModalInsertUpdateAccoutArtist
          open={openInsertUpdateAccoutArtist}
          onCancel={() => setOpenInsertUpdateAccountArtist(false)}
          onOk={() => getListUser()}
        />
      }
    </SpinCustom>
  )
}

export default UserManagement