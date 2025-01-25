import React, {useEffect, useState, useRef} from 'react';
import {Link} from "react-router-dom";
import ButtonMui from "@mui/material/Button";
import {ProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import {InputRef, TableColumnType, Input, Button, Space, Table} from "antd";
import Highlighter from 'react-highlight-words';
//npm install @types/react-highlight-words --save-dev
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
// import {Highlight} from "@mui/icons-material";



type DataIndex = keyof ProductModel;

const ProductTable: React.FC = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);
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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ProductModel> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
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
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            // maxWidth: 20,
            // ellipsis:true,
            ...getColumnSearchProps('description'),
            render: (text: string) => <div
                style={{
                    maxWidth: '15ch',
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
    ]);

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Product table for admin</h1>
                <Link to="/product-create">
                    <ButtonMui variant="contained" style={{maxHeight: "25px"}}>Add</ButtonMui>
                </Link>
            </div>

            <Table
                tableLayout="auto"
                bordered
                columns={columns}
                dataSource={products.map((product) => ({...product, key: product.id}))}
            />
        </>
    )
        ;
};

export default ProductTable;