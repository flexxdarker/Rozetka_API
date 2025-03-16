import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {IOrderModel} from "../../models/orderModel.ts";
import {OrderServices} from "../../services/orderServices.ts";
import dayjs from "dayjs";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const OrdersTable: React.FC = () => {

    const [orders, setOrders] = useState<IOrderModel[]>([]);


    const loadOrders = async () => {
        const res = await OrderServices.getAll();
        console.log(res);
        setOrders(res.data);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const [columns] = useState([
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "First Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Sur Name",
            dataIndex: "surName",
            key: "surName",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Order status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Total price",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Date",
            dataIndex: "dateCrated",
            key: "dateCrated",
            render: (text: string) =>{
                const formattedDate = dayjs(text).format('YYYY-MM-DD'); // Форматуємо дату до "рік-місяць-день"
                return <p>{formattedDate}</p>;
                // <div>{dayjs(text).format('YYYY-MM-DD')}</div>
            }
        },
        {
            title: "Image user",
            dataIndex: "imageUser",
            key: "imageUser",
            render: (record: string) => {
                const imageUrl = `${uploadings + "200_" + record}`;
                return <img src={imageUrl} alt="no image" className={"w-[100px] h-[100px]"}/>;
            }
        },
    ]);

    const [columnsItems] = useState([
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Image",
            dataIndex: "imagePath",
            key: "imagePath",
            render: (record: string) => {
                const imageUrl = `${uploadings + "200_" + record}`;
                return <img src={imageUrl} alt="no image" className={"w-[100px] h-[100px]"}/>;
            }
        },
    ])

    return (
        <>
            <Table<IOrderModel>
                tableLayout="auto"
                bordered
                columns={columns}
                dataSource={orders.map((order) => ({...order, key: order.id}))}
                expandable={{
                    expandedRowRender: (record: IOrderModel) => {
                        if(record.items.length>0) {
                            return (
                                <Table
                                    bordered
                                    columns={columnsItems}
                                    dataSource={record.items}
                                    />
                            )
                        }
                        return null;
                    },

                        rowExpandable: (record: IOrderModel) => {
                        return record.items.length>0;
                    }}
                }
            />
        </>
    )
        ;
}

export default  OrdersTable;