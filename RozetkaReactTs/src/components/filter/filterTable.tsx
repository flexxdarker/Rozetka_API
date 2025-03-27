import React, {useEffect, useState} from "react";
import {Button, Form, type FormProps, Input, message, Popconfirm, Table} from "antd";
import {FilterServices} from "../../services/filterService.ts";
import {IFilterCreateModel, IFilterModel, IFilterValueModel} from "../../models/filterModel.ts";
import {IFilterValueCreateModel} from "../../models/filterValueModel.ts";
import {FilterValueServices} from "../../services/filterValueService.ts";

const FilterTable: React.FC = () => {

    const [filters, setFilters] = useState<IFilterModel[]>([]);
    const loadFilters = async () => {
        const res = await FilterServices.getAll();
        setFilters(res.data);
    };

    useEffect(() => {
        loadFilters();
    }, []);


    useEffect(() => {

    }, [filters]);


    const [columns] = useState([
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Values",
            dataIndex: "values",
            key: "values",
            render: (record: IFilterValueModel[]) => {
                return record.map((item) => (
                    <div className="flex justify-between" key={item.id}>
                        <div className="flex">{item.value}</div>
                        <div className="flex">
                            <Popconfirm
                                title="Delete the category"
                                description={`Are you sure to delete this value?`}
                                onConfirm={() => deleteHandler(item.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button
                                    //onClick={() => FilterValueServices.delete(item.id)}
                                    className="bg-blue-500 hover:bg-red-500 text-white p-1 m-1 rounded transition-colors duration-300"
                                >
                                    Delete
                                </button>
                            </Popconfirm>

                        </div>
                    </div>
                ));
            }


        },
        {
            title: "Create",
            dataIndex: "create",
            key: "create",
            render: (_: unknown, record: IFilterModel) => (
                <Form
                    onFinish={(values) => onFinish(values, record.id)}
                >
                    <Form.Item
                        name="value"
                        label={"Значення:"}
                        rules={[{required: true, message: 'Please input your filter value!'}]}
                    >
                        <Input placeholder="Filter value"/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 24}}>
                        <Button block type="primary" htmlType="submit">
                            Створити параметр
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_: unknown, record: IFilterModel) => (
                <Popconfirm
                    title="Delete the category"
                    description={`Are you sure to delete this value?`}
                    onConfirm={() => deleteHandlerFilter(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button
                        //onClick={() => FilterValueServices.delete(item.id)}
                        className="bg-blue-500 hover:bg-red-500 text-white p-1 m-1 rounded transition-colors duration-300"
                    >
                        Delete
                    </button>
                </Popconfirm>
            ),
        },
    ]);

    const onFinish = async (values: IFilterValueCreateModel, id: number) => {
        values.filterId = id;// Обробка відправки форми з додатковими даними редактора
        const res = await FilterValueServices.create(values);
        console.log(res);
        if (res.status == 200) {
            message.success("Create");

            setFilters(prevFilters =>
                prevFilters.map(filter => {
                    if (filter.id === id) {
                        return {
                            ...filter,
                            values: [...filter.values, res.data] // Додаємо нове значення до відповідного фільтра
                        };
                    }
                    return filter;
                })
            );

        } else {
            message.warning("Warning");
        }
    };

    const deleteHandler = async (id: number) => {
        const res = await FilterValueServices.delete(id)
        if (res.status === 200) {
            message.success("Value deleted");
            setFilters(prevFilters =>
                prevFilters.map(filter => ({
                    ...filter,
                    values: filter.values.filter(value => value.id !== id) // Фільтруємо масив values по id
                }))
            );
        } else {
            message.error("Something wrong");
        }
    };


    const deleteHandlerFilter = async (id: number) => {
        const res = await FilterServices.delete(id)
        if (res.status === 200) {
            message.success("Value deleted");
            setFilters(prevFilters => prevFilters.filter(item => item.id !== id));
        } else {
            message.error("Something wrong");
        }
    };



    const onFinishFilter: FormProps<IFilterCreateModel>['onFinish'] = async (values) => {

            console.log("Success create:", {...values,});
            const res = await FilterServices.create({...values});
            console.log(res);
            if (res.status == 200) {
                message.success("Created");
                setFilters(prevFilters => [...prevFilters, res.data]);
            } else {
                message.warning("Warning");
            }
    };



    return (
        <>
            <Form
                onFinish={onFinishFilter}
            >
                <Form.Item
                    name="name"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your filter name!'}]}
                >
                    <Input placeholder="Filter name"/>
                </Form.Item>

                <Form.Item
                    name="filerValues"
                    label={"Значення:"}
                    rules={[{required: true, message: 'Please input your filter value!'}]}
                >
                    <Input placeholder="Filter value"/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                    <Button block type="primary" htmlType="submit">
                        Створити фільтр
                    </Button>
                </Form.Item>
            </Form>

            <Table
                bordered={true}
                columns={columns}
                dataSource={filters.map((category) => ({...category, key: category.id,}))}
            />


        </>
    );


};
export default FilterTable;