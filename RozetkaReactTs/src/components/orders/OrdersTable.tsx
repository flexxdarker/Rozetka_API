import React, {useEffect, useState} from "react";
import {Button, Form, message, Select, Table} from "antd";
import {IOrderModel} from "../../models/orderModel.ts";
import dayjs from "dayjs";
import useOrders from "../../hooks/useOrders.ts";
import {OrderServices} from "../../services/orderServices.ts";
import useStatuses from "../../hooks/useStatuses.ts";


const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const OrdersTable: React.FC = () => {

    const {orders, setOrders} = useOrders();

    const {statuses} = useStatuses();

    const [columns,setColumns] = useState([{}]);


    useEffect(() => {
        setColumns([
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
            {
                title: "Change status",
                key: "changeStatus",
                render: (_: unknown,record: IOrderModel) => (

                    <Form
                        onFinish={(values) => onFinish(values.value, record.id)}
                    >
                        <Form.Item
                            name="value"
                            label={"Значення:"}
                            rules={[{required: true, message: 'Please input your filter value!'}]}
                        >
                            {/*<Input placeholder="Filter value"/>*/}
                            <Select placeholder="Select a category" loading={statuses.length === 0}>
                                {statuses.length > 0 ? (
                                    statuses.map(c => (
                                        <Select.Option key={c.id} value={c.id} >
                                            {c.status}
                                        </Select.Option>
                                    ))
                                ) : (
                                    <Select.Option value={undefined} disabled>
                                        No categories available
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 24}}>
                            <Button block type="primary" htmlType="submit">
                                Змінити статус
                            </Button>
                        </Form.Item>
                    </Form>

                )
            },
        ])
    }, [statuses]);

    const onFinish = async (value: number, id: number) => {
        const res = await OrderServices.changeStatus(id,value);
        if (res.status == 200) {
            message.success("Success");
            setOrders(prevOrders => prevOrders.map(order =>{
                if(order.id === id)
                {
                    const selectedStatus = statuses.find(status => status.id === value)?.status;
                    if (selectedStatus) {
                        return {
                            ...order,
                            status: selectedStatus // оновлюємо статус
                        };
                    }
                }
                return order;
            }))
        } else {
            message.warning("Warning");
        }
    };

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