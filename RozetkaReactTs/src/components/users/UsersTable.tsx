import React, {useState} from "react";
import {Table} from "antd";
import {IUserModel} from "../../models/accountsModel.ts";
import useUsers from "../../hooks/useUsers.ts";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const UsersTable: React.FC = () => {

    const {users} = useUsers();


    const [columns] = useState([
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
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (record: string) => {
                const imageUrl = `${uploadings + "200_" + record}`;
                return <img src={imageUrl} alt="no image" className={"w-[100px] h-[100px]"}/>;
            }
        },
    ]);

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