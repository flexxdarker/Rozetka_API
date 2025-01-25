import React, {useEffect, useState} from "react";
import {Popconfirm, Space, Table} from "antd";
import Button from "@mui/material/Button";
// import { Resizable } from "react-resizable";
import {CategoryModel} from "../../models/categoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";
import {Link} from "react-router-dom";

// const style = {
//     // position: "absolute",
//     right: "-5px",
//     bottom: 0,
//     zIndex: 1,
//     width: "10px",
//     height: "100%",
//     cursor: "ew-resize",
//     display: "grid",
//     placeContent: "center"
// }

// const ResizableTitle = (props: { [x: string]: any; onResize: any; width: any; }) => {
//     const { onResize, width, ...restProps } = props;
//
//     if (!width) {
//         return <th {...restProps} />;
//     }
//
//     return (
//         <Resizable
//             width={width}
//             height={0}
//             handle={
//                 <span
//                     style={{...style,...{position: "absolute"}}}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                     }}
//                 />
//             }
//             onResize={onResize}
//             draggableOpts={{ enableUserSelectHack: false }}
//         >
//             <th {...restProps} />
//         </Resizable>
//     );
// };

const CategoryTable : React.FC = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    // // const [item, setItem] = useState("");
    // const [CategoriesId, setCategoriesId] = useState<CategoryModel>();
    //
    //
    const loadCategories = async () => {
        const res = await CategoriesServices.getAll();
        console.log(res);
        setCategories(res.data);
        // fetch("http://localhost:5119/api/Categories/getparentcategories")
        // fetch("http://rapi.itstep.click/api/Categories/getparentcategories")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("start data");
        //         console.log(data);
        //         setCategories(data);
        //     });
    };
    //
    // const loadCategoriesId = (async (id: number) => {
    //     const res = await CategoriesServices.getById(id);
    //     setCategoriesId(res.data);
    //     console.log(res);
    // });
    //
    useEffect(() => {
        loadCategories();
        // loadCategoriesId(1);
    }, []);
    //
    // // const listItems = categories.map((cat) =>
    // //     <li key={cat.id}>
    // //         {cat.name}
    // //     </li>
    // // );
    //
    // // useEffect(() => {
    // //     if (CategoriesId != undefined) {
    // //         setItem(CategoriesId.name)
    // //     }
    // // }, [CategoriesId]);
    //
    // const [columns, setColumns] = useState([
     const [columns] = useState([
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: 75
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 150
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 150
        },
        {
            title: "Category ID",
            dataIndex: "parentCategoryId",
            key: "parentCategoryId",
            width: 150,
            sorter: (a: { parentCategoryId: number; }, b: { parentCategoryId: number; }) => a.parentCategoryId - b.parentCategoryId
        },
        {
            title: "Category Name",
            dataIndex: "parentCategoryName",
            key: "parentCategoryName",
            width: 150,
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            // render: () => <a>Delete</a>
             render: (record:any) => (
                 <Space size="middle">
                              {/* <Button>Show</Button> */}

                              <Link to={`../show/${record.id}`}>
                                  <Button>Show</Button>
                              </Link>

                              <Link to={`edit/${record.id}`}>
                                  <Button>Edit</Button>
                              </Link>

                              <Popconfirm
                                  title="Delete the hotel room"
                                  description={`Are you sure to delete this ${record.name}?`}
                                  // onConfirm={() => deleteHandler(record.id)}
                                  okText="Yes"
                                  cancelText="No"
                              >
                                 <Button>Delete</Button>
                              </Popconfirm>

                              {/* <a>Delete</a> */}
                          </Space>
             )
            // render: (_, record) => (
            //     <Space size="middle">
            //         {/* <Button>Show</Button> */}
            //
            //         <Link to={`../show/${record.id}`}>
            //             <Button>Show</Button>
            //         </Link>
            //
            //         <Link to={`edit/${record.id}`}>
            //             <Button>Edit</Button>
            //         </Link>
            //
            //         <Popconfirm
            //             title="Delete the hotel room"
            //             description={`Are you sure to delete this ${record.name}?`}
            //             // onConfirm={() => deleteHandler(record.id)}
            //             okText="Yes"
            //             cancelText="No"
            //         >
            //             <Button>Delete</Button>
            //         </Popconfirm>
            //
            //         {/* <a>Delete</a> */}
            //     </Space>
            // ),
        }
    ]);
    //
    // const components = {
    //     header: {
    //         cell: ResizableTitle
    //     }
    // };
    //
    //
    // const handleResize =
    //     (index: number) =>
    //         (e, { size }) => {
    //             setColumns((prevColumns) => {
    //                 const nextColumns = [...prevColumns];
    //                 nextColumns[index] = {...nextColumns[index], width: size.width};
    //                 return nextColumns;
    //             });
    //         };

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Category Table for admin</h1>
                <Link to="/category-create">
                    <Button variant="contained" style={{maxHeight: "25px"}}>Add</Button>
                </Link>
            </div>

            <Table
                bordered
                // components={components}
                // columns={columns.map((col, index) => ({
                //     ...col,
                //     onHeaderCell: (column: { width: number; }) => ({
                //         width: column.width,
                //         onResize: handleResize(index)
                //     })
                // }))}
                columns={columns}
                dataSource={categories.map((category) => ({...category,key: category.id}))}
            />
        </>
    );


};
export default CategoryTable;






// import "../../styles.css";
// .react-resizable-handle {
//     position: absolute;
//     right: -5px;
//     bottom: 0;
//     z-index: 1;
//     width: 10px;
//     height: 100%;
//     cursor: ew-resize;
//     display: grid;
//     place-content: center;
// }
// import React, {useState} from "react";
// import { Button, Table } from "antd";
// import { Resizable } from "react-resizable";
//
//
// const ResizableTitle = (props) => {
//     const { onResize, width, ...restProps } = props;
//
//     if (!width) {
//         return <th {...restProps} />;
//     }
//
//     return (
//         <Resizable
//             width={width}
//             height={0}
//             handle={
//                 <span
//                     className="react-resizable-handle"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                     }}
//                 />
//             }
//             onResize={onResize}
//             draggableOpts={{ enableUserSelectHack: false }}
//         >
//             <th {...restProps} />
//         </Resizable>
//     );
// };
//
// const MyTable : React.FC = () => {
//     const [columns, setColumns] = useState([
//         {
//             title: "Date",
//             dataIndex: "date",
//             width: 200
//         },
//         {
//             title: "Amount",
//             dataIndex: "amount",
//             width: 100,
//             sorter: (a: { amount: number; }, b: { amount: number; }) => a.amount - b.amount
//         },
//         {
//             title: "Type",
//             dataIndex: "type",
//             width: 100
//         },
//         {
//             title: "Note",
//             dataIndex: "note",
//             width: 100
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: () => <a>Delete</a>
//         }
//     ]);
//
//     const components = {
//         header: {
//             cell: ResizableTitle
//         }
//     };
//
//     const data = [
//         {
//             key: 0,
//             date: "2018-02-11",
//             amount: 120,
//             type: "income",
//             note: "transfer"
//         },
//         {
//             key: 1,
//             date: "2018-03-11",
//             amount: 243,
//             type: "income",
//             note: "transfer"
//         },
//         {
//             key: 2,
//             date: "2018-04-11",
//             amount: 98,
//             type: "income",
//             note: "transfer"
//         }
//     ];
//
//     const handleResize =
//         (index: number) =>
//             (e, { size }) => {
//                 setColumns((prevColumns) => {
//                     const nextColumns = [...prevColumns];
//                     nextColumns[index] = {...nextColumns[index], width: size.width};
//                     return nextColumns;
//                 });
//             };
//
//
//     const columns2 = columns.map((col, index) => ({
//         ...col,
//         onHeaderCell: (column: { width: number; }) => ({
//             width: column.width,
//             onResize: handleResize(index)
//         })
//     }));
//
//
//
//     return (
//         <>
//             <Table
//                 bordered
//                 components={components}
//                 columns={columns2}
//                 dataSource={data}
//             />
//         </>
//     );
//
//
// };
//
//
// export default MyTable;
//
//
//
//



// import React from "react";
// import { Button, Table } from "antd";
// import { Resizable } from "react-resizable";
//
// const ResizableTitle = (props) => {
//     const { onResize, width, ...restProps } = props;
//
//     if (!width) {
//         return <th {...restProps} />;
//     }
//
//     return (
//         <Resizable
//             width={width}
//             height={0}
//             handle={
//                 <span
//                     className="react-resizable-handle"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                     }}
//                 />
//             }
//             onResize={onResize}
//             draggableOpts={{ enableUserSelectHack: false }}
//         >
//             <th {...restProps} />
//         </Resizable>
//     );
// };
//
// class Demo extends React.Component {
//     state = {
//         columns: [
//             {
//                 title: "Date",
//                 dataIndex: "date",
//                 width: 200
//             },
//             {
//                 title: "Amount",
//                 dataIndex: "amount",
//                 width: 100,
//                 sorter: (a, b) => a.amount - b.amount
//             },
//             {
//                 title: "Type",
//                 dataIndex: "type",
//                 width: 100
//             },
//             {
//                 title: "Note",
//                 dataIndex: "note",
//                 width: 100
//             },
//             {
//                 title: "Action",
//                 key: "action",
//                 render: () => <a>Delete</a>
//             }
//         ]
//     };
//
//     components = {
//         header: {
//             cell: ResizableTitle
//         }
//     };
//
//     data = [
//         {
//             key: 0,
//             date: "2018-02-11",
//             amount: 120,
//             type: "income",
//             note: "transfer"
//         },
//         {
//             key: 1,
//             date: "2018-03-11",
//             amount: 243,
//             type: "income",
//             note: "transfer"
//         },
//         {
//             key: 2,
//             date: "2018-04-11",
//             amount: 98,
//             type: "income",
//             note: "transfer"
//         }
//     ];
//
//     handleResize = (index: number) => (e, { size }) => {
//         this.setState(({ columns }) => {
//             const nextColumns = [...columns];
//             nextColumns[index] = {
//                 ...nextColumns[index],
//                 width: size.width
//             };
//             return { columns: nextColumns };
//         });
//     };
//
//     render() {
//         const columns = this.state.columns.map((col, index) => ({
//             ...col,
//             onHeaderCell: (column: { width: number; }) => ({
//                 width: column.width,
//                 onResize: this.handleResize(index)
//             })
//         }));
//
//         return (
//             <Table
//                 bordered
//                 components={this.components}
//                 columns={columns}
//                 dataSource={this.data}
//             />
//         );
//     }
// }
//
// export class MyTable2 extends React.Component {
//     render() {
//         return (
//             <>
//                 <Demo />
//             </>
//         );
//     }
// }






// import "../../styles.css";
// import { Button, Table } from "antd";
// import { Resizable } from "react-resizable";
// import React, { useState } from "react";
//
// const ResizableTitle = (props) => {
//     const { onResize, width, ...restProps } = props;
//
//     if (!width) {
//         return <th {...restProps} />;
//     }
//
//     return (
//         <Resizable
//             width={width}
//             height={0}
//             handle={
//                 <span
//                     className="react-resizable-handle"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                     }}
//                 />
//             }
//             onResize={onResize}
//             draggableOpts={{ enableUserSelectHack: false }}
//         >
//             <th {...restProps} />
//         </Resizable>
//     );
// };
//
//
// const onChange = function(...args) {
//         console.log(...args);
//     },
//     dataSource = () => {
//         const result = [];
//         for (let i = 0; i < 5; i++) {
//             result.push({
//                 title: {
//                     name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
//                 },
//                 id: 100306660940 + i,
//                 time: 2000 + i
//             });
//         }
//         return result;
//     },
//     render = (value, index, record) => {
//         return <a href={`#${index}`}>Remove({record.id})</a>;
//     },
//     rowSelection = {
//         onChange: onChange,
//         getProps: record => {
//             return {
//                 disabled: record.id === 100306660942
//             };
//         }
//     };
//
//
// const MyTable : React.FC = () => {
//     const [columns, setColumns] = useState([
//         {
//             title: "Name",
//             dataIndex: "name",
//             width: 300,
//             shouldCellUpdate: (record, prevRecord) => record.name !== prevRecord.name,
//         },
//         {
//             title: "Age",
//             dataIndex: "age",
//             width: 300,
//         },
//         {
//             title: "Address",
//             dataIndex: "address",
//             width: 250,
//         },
//         // Add more columns as needed
//     ]);
//
//     const handleResize =
//         (index: number) =>
//             (e, { size }) => {
//                 setColumns((prevColumns) => {
//                     const nextColumns = [...prevColumns];
//                     nextColumns[index] = { ...nextColumns[index], width: size.width };
//                     return nextColumns;
//                 });
//             };
//
//     const components = {
//         header: {
//             cell: ResizableTitle,
//         },
//     };
//
//     const tableColumns = columns.map((col, index) => ({
//         ...col,
//         onHeaderCell: (column: { width: number; }) => ({
//             width: column.width,
//             onResize: handleResize(index),
//         }),
//     }));
//
//     // Sample data for the table
//     const data = [
//         {
//             key: "1",
//             name: "John Doe",
//             age: 32,
//             address: "New York No. 1 Lake Park",
//         },
//         // More data here
//     ];
//
//     return (
//         <div>
//             <Table
//                 bordered
//                 components={components}
//                 columns={tableColumns}
//                 dataSource={data}
//                 pagination={false}
//             />
//         </div>
//     );
// };
//
// export default MyTable;








// import { Table } from "antd";
// import React from "react";
// import { Resizable } from "react-resizable";
// import "react-resizable/css/styles.css";
// //import "/node_modules/react-resizable/css/styles.css";
//
// const dataSource = [
//     {
//         key: "1",
//         name: "张三",
//         age: 32,
//         address: "西湖区湖底公园1号"
//     },
//     {
//         key: "2",
//         name: "李四",
//         age: 42,
//         address: "西湖区湖底公园1号"
//     }
// ];
//
// const columns = [
//     {
//         title: "姓名",
//         dataIndex: "name",
//         key: "name",
//         width: 110
//     },
//     {
//         title: "年龄",
//         dataIndex: "age",
//         key: "age",
//         width: 90
//     },
//     {
//         title: "住址",
//         dataIndex: "address",
//         key: "address",
//         width: 220
//     },
//     {}
// ];
//
// const ResizableTitle = (props) => {
//     const { onResize, width, ...restProps } = props;
//     if (width === undefined) {
//         return <td {...restProps}></td>;
//     }
//     return (
//         <Resizable width={width} height={0} onResize={onResize}>
//             <td {...restProps}></td>
//         </Resizable>
//     );
// };
// class MyTable extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataSource,
//             columns: columns.map((col) => {
//                 col.onHeaderCell = () => ({
//                     width: col.width,
//                     onResize: this.handleResize(col)
//                 });
//                 col.onCell = () => ({
//                     width: col.width,
//                     onResize: this.handleResize(col)
//                 })
//                 return col;
//             })
//         };
//     }
//     components = {
//         header: {
//           cell: ResizableTitle
//         },
//         // body: {
//         //     cell: ResizableTitle
//         // }
//     };
//     handleResize = (column) => (e, { size }) => {
//         this.setState(({ columns }) => {
//             columns.forEach((item) => {
//                 if (item === column) {
//                     item.width = size.width;
//                 }
//             });
//             return { columns };
//         });
//     };
//     render() {
//         return (
//             <div>
//                 <Table
//                     bordered
//                     dataSource={dataSource}
//                     columns={columns}
//                     components={this.components}
//                 />
//             </div>
//         );
//     }
// }
// export default MyTable;