import React, {useEffect, useState} from "react";
import {Button, message, Popconfirm, Space, Table} from "antd";
import {IUserModel} from "../../models/accountsModel.ts";
import useUsers from "../../hooks/useUsers.ts";
import {AccountsService} from "../../services/accountsService.ts";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const UsersTable: React.FC = () => {

    const {users, setUsers} = useUsers();


    const [columns,setColumns] = useState([{}]);

    useEffect(() => {

        setColumns([
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Birth Date",
            dataIndex: "birthDate",
            key: "birthDate",
        },
        {
            title: "lockoutEnabled",
            dataIndex: "lockoutEnabled",
            key: "lockoutEnabled",
            render: (record: boolean) => {
                if(record){
                    return <p>Yes</p>
                } else {
                    return <p>No</p>
                }
            }
        },
        {
            title: "Lockout End",
            dataIndex: "lockoutEnd",
            key: "lockoutEnd",
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
        },
        {
            title: "Change role",
            key: "changeRoles",
            render: (record: IUserModel) => (
                <Space size="middle">



                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to change role?`}
                        onConfirm={() => changeRoleHandler(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Змінити роль</Button>
                    </Popconfirm>
                </Space>
            )
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (record: string) => {
                const imageUrl = `${uploadings + "200_" + record}`;
                return <img src={imageUrl} alt="no image" className={"w-[100px] h-[100px] object-contain"}/>;
            }
        },
    ])
    }, [users]);



    const changeRoleHandler = async (id: string) => {
        const res = await AccountsService.changeRole(id);
        if (res.status === 200) {
            message.success("Role changed successfully");
            setUsers(
                users.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            roles: user.roles === "user" ? "admin" : "user",
                        };
                    }
                    return user;
                })
            );
        } else {
            message.error("Something went wrong");
        }

    };

    return (
        <>
            <Table<IUserModel>
                tableLayout="auto"
                bordered
                columns={columns}
                dataSource={users}
                rowKey="id"
                // dataSource={users.map((order) => ({...user, key: user.id}))}
            />
        </>
    )
        ;
}

export default  UsersTable;