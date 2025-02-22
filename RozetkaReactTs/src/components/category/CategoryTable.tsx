import React, {useEffect, useState} from "react";
import {message, Popconfirm, Space, Table} from "antd";
import Button from "@mui/material/Button";
import {ICategoryModel} from "../../models/categoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";
import {Link} from "react-router-dom";

const CategoryTable: React.FC = () => {

    const [categories, setCategories] = useState<ICategoryModel[]>([]);

    const loadCategories = async () => {
        const res = await CategoriesServices.getAll();
        console.log(res);
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

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
            title: "Image",
            dataIndex: "image",
            key: "image"
        },
        {
            title: "Category ID",
            dataIndex: "parentCategoryId",
            key: "parentCategoryId"
            // ,
            // sorter: (a: ICategoryModel, b: ICategoryModel) =>
            //     a.parentCategoryId! - b.parentCategoryId!,
        },
        {
            title: "Action",
            key: "action",
            // render: () => <a>Delete</a>
            render: (record: ICategoryModel) => (
                <Space size="middle">
                    {/* <Button>Show</Button> */}

                    <Link to={`edit/${record.id}`}>
                        <Button>Edit</Button>
                    </Link>

                    <Popconfirm
                        title="Delete the category"
                        description={`Are you sure to delete this ${record.name}?`}
                        onConfirm={() => deleteHandler(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]);

    const deleteHandler = async (id: number) => {
        const res = await CategoriesServices.delete(id);
        if (res.status === 200) {
            message.success("Category deleted");
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
        } else {
            message.error("Something wrong");
        }
    };

    const getExpandable = (categories: ICategoryModel[], columns: any) => ({
        expandedRowRender: (record: ICategoryModel) => {
            const filteredCategories = categories.filter(x =>
                x.parentCategoryId === record.id);

            // Якщо є підкатегорії, рендеримо їх у вкладеній таблиці
            if (filteredCategories.length > 0) {
                return (
                    <Table
                        bordered={true}
                        columns={columns} // Ви можете налаштувати стовпці для цієї підтаблиці
                        dataSource={filteredCategories.map((category) =>
                            ({...category, key: category.id})
                        )}
                        expandable={getExpandable(categories, columns)}
                        pagination={false} // Відключаємо пагінацію для вкладених таблиць
                    />
                );
            }
            // Якщо підкатегорій немає, повертаємо null або порожній елемент
            return null;
        },
        // Умова для того, щоб рядок був розгорнутий тільки якщо є підкатегорії
        rowExpandable: (record: ICategoryModel) => {
            const filteredCategories = categories.filter(x => x.parentCategoryId === record.id);
            return filteredCategories.length > 0; // Розгортаємо тільки якщо є підкатегорії
        }
    });

    // const getData = (categories: ICategoryModel[], id:number) => {
    //     return categories
    //         .filter(x => x.parentCategoryId === id) // Фільтруємо категорії
    //         .map((category) => ({
    //             ...category,
    //             key: category.id,
    //             // Умова для зміни кольору фону
    //             rowClassName: category.parentCategoryId === null ? "bg-green-200" : "bg-blue-200"
    //         }));
    // };


    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Category Table for admin</h1>
                <Link to="create">
                    <Button variant="contained" style={{maxHeight: "25px"}}>Add</Button>
                </Link>
            </div>

            <Table
                bordered={true}
                columns={columns}
                dataSource={categories
                    .filter(x => x.parentCategoryId === null) // Фільтруємо категорії
                    .map((category) => ({
                        ...category,
                        key: category.id,
                        // Умова для зміни кольору фону
                        rowClassName: category.parentCategoryId === null ? "bg-green-200" : "bg-blue-200"
                    }))}
                expandable={getExpandable(categories, columns)}
                rowClassName={(record) => {
                    // Замість rowClassName ви можете перевіряти будь-яку іншу умову, залежно від вашого випадку
                    return record.parentCategoryId === null ? "bg-green-200" : "bg-blue-200"; // Заміна кольору фону
                }}
            />


        </>
    );


};
export default CategoryTable;