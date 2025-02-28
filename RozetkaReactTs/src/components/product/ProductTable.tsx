import React, {useEffect, useState, useRef} from 'react';
import {Link} from "react-router-dom";
import ButtonMui from "@mui/material/Button";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import {InputRef, TableColumnType, Input, Button, Space, Table, Popconfirm, message} from "antd";
import Highlighter from 'react-highlight-words';
//npm install @types/react-highlight-words --save-dev
import {SearchOutlined} from '@ant-design/icons';
import type {FilterDropdownProps} from 'antd/es/table/interface';
import dayjs from "dayjs";
// import {Highlight} from "@mui/icons-material";


type DataIndex = keyof IProductModel;

const ProductTable: React.FC = () => {

    const [products, setProducts] = useState<IProductModel[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IProductModel> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const [columns] = useState([
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps('title'),
            render: (text: string) => <div
                style={{
                    minWidth: 100,
                    maxWidth: '30ch',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    whiteSpace: 'normal',
                    textOverflow: 'ellipsis'
                }}>{
                text}</div>
        },
        {
            title: "CategoryId",
            dataIndex: "categoryId",
            key: "categoryId",
        },
        {
            title: "date",
            dataIndex: "date",
            key: "date",
            ...getColumnSearchProps('date'),
            render: (text: string) =>{
                const formattedDate = dayjs(text).format('DD-MM-YYYY'); // Форматуємо дату до "рік-місяць-день"
                return <p>{formattedDate}</p>;
                // <div>{dayjs(text).format('YYYY-MM-DD')}</div>
                }
            ,

        },
        // {
        //     title: "Description",
        //     dataIndex: "description",
        //     key: "description",
        //     // maxWidth: 20,
        //     // ellipsis:true,
        // },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "FirstImage",
            dataIndex: "firstImage",
            key: "firstImage",
        },
        {
            title: "Action",
            key: "action",
            // render: () => <a>Delete</a>
            render: (record: any) => (
                <Space size="middle">
                    {/* <Button>Show</Button> */}

                    <Link to={`/product-page/${record.id}`}>
                        <Button>Show</Button>
                    </Link>

                    <Link to={`edit/${record.id}`}>
                        <Button>Edit</Button>
                    </Link>

                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete this ${record.name}?`}
                        onConfirm={() => deleteHandler(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]);

    const deleteHandler = async (id: number) => {
        const res = await ProductServices.delete(id);
        if (res.status === 200) {
            message.success("Product deleted");
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } else {
            message.error("Something wrong");
        }
    };

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Product table for admin</h1>
                <Link to="create">
                    <ButtonMui variant="contained" style={{maxHeight: "25px"}}>Add</ButtonMui>
                </Link>
            </div>

            <Table<IProductModel>
                tableLayout="auto"
                bordered
                columns={columns}
                dataSource={products.map((product) => ({...product, key: product.id}))}
                expandable={{
                    expandedRowRender: (record) => {
                        // Якщо description існує, не є порожнім і не дорівнює "undefined", відобразимо його
                        if (record.description && record.description.trim().length > 0 && record.description !== "undefined") {
                            return <p style={{ margin: 0 }}>{record.description}</p>;
                        }
                        // Якщо description відсутній або порожній, нічого не передаватимемо
                        else {
                            return null;
                        }
                    },
                    rowExpandable: (record: IProductModel) => {
                        // Повертаємо лише булеве значення
                        return !!(record.description && record.description !== "undefined" && record.description.trim().length > 0);
                    },
                }}
            />
        </>
    )
        ;
};

export default ProductTable;