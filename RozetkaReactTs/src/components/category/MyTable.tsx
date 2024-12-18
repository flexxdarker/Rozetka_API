import "../../styles.css";
import { Button, Table } from "antd";
import { Resizable } from "react-resizable";
import React, { useState } from "react";
const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};


const onChange = function(...args) {
        console.log(...args);
    },
    dataSource = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push({
                title: {
                    name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
                },
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a href={`#${index}`}>Remove({record.id})</a>;
    },
    rowSelection = {
        onChange: onChange,
        getProps: record => {
            return {
                disabled: record.id === 100306660942
            };
        }
    };


const MyTable : React.FC = () => {
    const [columns, setColumns] = useState([
        {
            title: "Name",
            dataIndex: "name",
            width: 300,
            shouldCellUpdate: (record, prevRecord) => record.name !== prevRecord.name,
        },
        {
            title: "Age",
            dataIndex: "age",
            width: 300,
        },
        {
            title: "Address",
            dataIndex: "address",
            width: 250,
        },
        // Add more columns as needed
    ]);
    console.log(columns);
    const handleResize =
        (index: number) =>
            (e, { size }) => {
                setColumns((prevColumns) => {
                    const nextColumns = [...prevColumns];
                    nextColumns[index] = { ...nextColumns[index], width: size.width };
                    return nextColumns;
                });
            };

    const components = {
        header: {
            cell: ResizableTitle,
        },
    };

    const tableColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column: { width: number; }) => ({
            width: column.width,
            onResize: handleResize(index),
        }),
    }));

    // Sample data for the table
    const data = [
        {
            key: "1",
            name: "John Doe",
            age: 32,
            address: "New York No. 1 Lake Park",
        },
        // More data here
    ];
    return (
        <div>
            <Table
                bordered
                components={components}
                columns={tableColumns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
};

export default MyTable;





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