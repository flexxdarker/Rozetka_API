import React, {useState, useRef, useEffect} from 'react';
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
import {IImageModel} from "../../models/imageModel.ts";
import useProducts from "../../hooks/useProducts.ts";
import useCategories from "../../hooks/useCategories.ts";
// import {Highlight} from "@mui/icons-material";


type DataIndex = keyof IProductModel;

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const ProductTable: React.FC = () => {

    const {products, setProducts} = useProducts();
    const {categories} = useCategories();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

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
            record[dataIndex]!
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
                render: (text: string) => {
                    const filteredCategory = categories.filter(c => c.id == +text);

                    // Якщо є категорії, повертаємо їх назву, якщо ні — порожній рядок
                    return filteredCategory.length > 0 ? filteredCategory[0].name : "Не знайдено";
                }
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
                dataIndex: "images",
                key: "images",
                render: (record: IImageModel[]) => {
                    const imageUrl = `${uploadings + "200_" + record[0]?.name}`;
                    return (
                        <div className="flex justify-center items-center">
                            <img src={imageUrl} alt="no image" className="object-contain" />
                        </div>
                    );
                }
            },
            {
                title: "Action",
                key: "action",
                // render: () => <a>Delete</a>
                render: (record: IProductModel) => (
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
                            description={`Are you sure to delete this ${record.title}?`}
                            onConfirm={() => deleteHandler(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        ])
    }, [categories]);


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
                            return <div
                                dangerouslySetInnerHTML={{__html: record?.description || '<p><em>Description is not provided yet...</em></p>'}}/>
                        }
                        else {
                            return null;
                        }
                    },
                    rowExpandable: (record: IProductModel) => {
                        return !!(record.description && record.description !== "undefined" && record.description.trim().length > 0);
                    },
                }}
            />
        </>
    )
        ;
};

export default ProductTable;