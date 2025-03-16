import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Select, Space } from 'antd';
import { IFilterModel } from "../../models/filterModel.ts";

interface FilterFormProps {
    filters: IFilterModel[]; // Array of filters passed as props
    onChange: (updatedFilterRows: { filterId: number, valueId: number }[]) => void; // Callback function to update parent
}

const { Option } = Select;

const FilterForm: React.FC<FilterFormProps> = ({ filters, onChange }) => {
    const [filterRows, setFilterRows] = useState<{ filterId: number, valueId: number }[]>([]);
    const [usedFilters, setUsedFilters] = useState<Set<number>>(new Set()); // Track used filters

    const [form] = Form.useForm();

    // Add a new row if the number of rows is less than filters array length
    const addRow = () => {
        const newRow = { filterId: 0, valueId: 0 };
        const newFilterRows = [...filterRows, newRow];
        setFilterRows(newFilterRows);
        onChange(newFilterRows); // Оновлюємо дані в батьківському компоненті
    };

    const handleFilterChange = (value: number, index: number, type: 'filter' | 'value') => {
        const newRows = [...filterRows];
        if (type === 'filter') {
            // When filter is changed, reset the value
            newRows[index].filterId = value;
            newRows[index].valueId = 0;
        } else if (type === 'value') {
            newRows[index].valueId = value;
        }
        setFilterRows(newRows);
        onChange(newRows); // Update the parent component
    };

    // Remove a row and free the filter for re-selection
    const removeRow = (index: number) => {
        const newRows = filterRows.filter((_, i) => i !== index);
        const removedFilter = filterRows[index].filterId;
        setUsedFilters((prev) => {
            const newUsedFilters = new Set(prev);
            newUsedFilters.delete(removedFilter); // Remove the filter from used filters
            return newUsedFilters;
        });
        setFilterRows(newRows);
        onChange(newRows);
    };

    // Filter out already selected filters in the first Select
    const getAvailableFilters = () => {
        return filters.filter((filter) => !usedFilters.has(filter.id)); // Exclude already used filters
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_form_complex"
            autoComplete="off"
            initialValues={{ items: [{}] }}
        >
            <Form.List name="items">
                {(fields) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field) => (
                            <Form.Item label="List" key={field.key}>
                                <Form.List name={[field.name, 'list']}>
                                    {(subFields, subOpt) => (
                                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                            {subFields.map((subField, index) => (
                                                <Space key={subField.key}>
                                                    {/* Replace Input with Select */}
                                                    <Form.Item noStyle name={[subField.name, 'first']}>
                                                        <Select
                                                            placeholder="Select Filter"
                                                            style={{ width: "200px" }}
                                                            value={filterRows[index]?.filterId || undefined}
                                                            onChange={(value) => {
                                                                handleFilterChange(value, index, 'filter');
                                                                setUsedFilters((prev) => {
                                                                    const newUsedFilters = new Set(prev);
                                                                    newUsedFilters.add(value); // Add filter to used filters
                                                                    return newUsedFilters;
                                                                });
                                                            }}
                                                        >
                                                            {getAvailableFilters().map((filter) => (
                                                                <Option key={filter.id} value={filter.id}>
                                                                    {filter.name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>

                                                    <Form.Item noStyle name={[subField.name, 'second']}>
                                                        <Select
                                                            placeholder="Select Value"
                                                            style={{ width: "200px" }}
                                                            value={filterRows[index]?.valueId || undefined}
                                                            onChange={(value) => handleFilterChange(value, index, 'value')}
                                                            disabled={filterRows[index]?.filterId === 0}
                                                        >
                                                            {/* Render values based on the selected filter */}
                                                            {filters
                                                                .filter((filter) => filter.id === filterRows[index]?.filterId)
                                                                .flatMap((filter) =>
                                                                    filter.values.map((value) => (
                                                                        <Option key={value.id} value={value.id}>
                                                                            {value.value}
                                                                        </Option>
                                                                    ))
                                                                )}
                                                        </Select>
                                                    </Form.Item>

                                                    <CloseOutlined onClick={() => {removeRow(index); subOpt.remove(index);}} />
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => {
                                                subOpt.add();
                                                addRow();}}
                                                    block>
                                                + Add Sub Item
                                            </Button>
                                        </div>
                                    )}
                                </Form.List>
                            </Form.Item>
                        ))}
                    </div>
                )}
            </Form.List>

        </Form>
    );
};

export default FilterForm;






//
// import React, {useState} from 'react';
// import {Select, Button, Form} from 'antd';
// import {IFilterModel} from "../../models/filterModel.ts";
//
//
// interface FilterFormProps {
//     filters: IFilterModel[]; // Масив фільтрів передається як пропс
//     onChange: (updatedFilterRows: { filterId: number, valueId: number }[]) => void; // Функція зворотного зв'язку
// }
//
// const {Option} = Select;
//
// const FilterForm: React.FC<FilterFormProps> = ({filters, onChange}) => {
//     const [filterRows, setFilterRows] = useState<{ filterId: number, valueId: number }[]>([]);
//
//     // Функція для додавання нового рядка
//     const addRow = () => {
//         const newRow = {filterId: 0, valueId: 0};
//         const newFilterRows = [...filterRows, newRow];
//         setFilterRows(newFilterRows);
//         onChange(newFilterRows); // Оновлюємо дані в батьківському компоненті
//     };
//
//     // Функція для видалення рядка
//     const removeRow = (index: number) => {
//         const newRows = filterRows.filter((_, i) => i !== index);
//         setFilterRows(newRows);
//         onChange(newRows); // Оновлюємо дані в батьківському компоненті
//     };
//
//     // Функція для обробки зміни в селекторах
//     const handleFilterChange = (value: number, index: number, type: 'filter' | 'value') => {
//         const newRows = [...filterRows];
//         if (type === 'filter') {
//             newRows[index].filterId = value;
//             newRows[index].valueId = 0; // Скидаємо значення value, коли змінюється filter
//         } else if (type === 'value') {
//             newRows[index].valueId = value;
//         }
//         setFilterRows(newRows);
//         onChange(newRows); // Оновлюємо дані в батьківському компоненті
//     };
//
//     // Створення списку доступних фільтрів без вже вибраних
//     const getAvailableFilters = () => {
//         return filters.filter(filter =>
//             !filterRows.some(row => row.filterId === filter.id) // Фільтруємо вже вибрані
//         );
//     };
//
//     return (
//         <div>
//             <Form layout="vertical">
//                 {filterRows.map((row, index) => {
//                     const selectedFilter = filters.find(filter => filter.id === row.filterId);
//                     const availableValues = selectedFilter ? selectedFilter.values : [];
//                     return (
//                         <div key={index} style={{display: 'flex', marginBottom: 8}}>
//                             <Form.Item name="filterid">
//                                 <Select
//                                     style={{width: '200px', marginRight: '8px'}}
//                                     value={row.filterId || undefined}
//                                     onChange={(value) => handleFilterChange(value, index, 'filter')}
//                                     placeholder="Виберіть фільтр"
//                                 >
//                                     {getAvailableFilters().map((filter) => (
//                                         <Option key={filter.id} value={filter.id} label={filter.name}>
//                                             {filter.name}
//                                         </Option>
//                                     ))}
//                                 </Select>
//                             </Form.Item>
//
//                             <Form.Item name="valueid">
//                                 <Select
//                                     style={{width: '200px'}}
//                                     value={row.valueId || undefined}
//                                     onChange={(value) => handleFilterChange(value, index, 'value')}
//                                     placeholder="Виберіть значення"
//                                     disabled={row.filterId === 0}
//                                 >
//                                     {availableValues.map((value) => (
//                                         <Option key={value.id} value={value.id}>
//                                             {value.value}
//                                         </Option>
//                                     ))}
//                                 </Select>
//                             </Form.Item>
//                             <Button
//                                 type="danger"
//                                 onClick={() => removeRow(index)}
//                                 style={{marginLeft: '8px'}}
//                             >
//                                 Видалити
//                             </Button>
//                         </div>
//                     );
//                 })}
//                 <Button onClick={addRow} type="primary" style={{marginBottom: 16}}>
//                     Додати фільтр
//                 </Button>
//             </Form>
//         </div>
//     );
// };
//
// export default FilterForm;


// // import React, {useEffect, useState} from 'react';
// // import { Select, Button, Form, message } from 'antd';
// // import {FilterServices} from "../../services/filterService.ts";
// //
// // interface IFilterModel {
// //     id: number;
// //     name: string;
// //     values: IFilterValueModel[];
// // }
// //
// // interface IFilterValueModel {
// //     id: number;
// //     value: string;
// //     filterId: number;
// //     filterName: string;
// // }
// //
// // const { Option } = Select;
// //
// // const FilterForm: React.FC = () => {
// //     // Ініціалізація масивів даних для фільтрів
// //     const [filters, setFilters] = useState<IFilterModel[]>();
// //
// //
// //     // Стан для збереження вибраних значень у формах
// //     const [filterRows, setFilterRows] = useState<{ filterId: number, valueId: number }[]>([]);
// //
// //     // Функція для додавання нового рядка
// //     const addRow = () => {
// //         setFilterRows([...filterRows, { filterId: 0, valueId: 0 }]);
// //     };
// //
// //     // Функція для видалення рядка
// //     const removeRow = (index: number) => {
// //         const newRows = filterRows.filter((_, i) => i !== index);
// //         setFilterRows(newRows);
// //     };
// //
// //     // Функція для обробки зміни в селекторах
// //     const handleFilterChange = (value: number, index: number, type: 'filter' | 'value') => {
// //         const newRows = [...filterRows];
// //         if (type === 'filter') {
// //             newRows[index].filterId = value;
// //             newRows[index].valueId = 0; // Скидаємо значення value, коли змінюється filter
// //         } else if (type === 'value') {
// //             newRows[index].valueId = value;
// //         }
// //         setFilterRows(newRows);
// //     };
// //     const loadFilters = async () => {
// //         const res = await FilterServices.getAll();
// //         console.log(res);
// //         setFilters(res.data);
// //     };
// //
// //
// //     useEffect(() => {
// //         loadFilters();
// //     }, []);
// //
// //     // Створення списку доступних фільтрів без вже вибраних
// //     const getAvailableFilters = () => {
// //         return filters?.filter(filter =>
// //             !filterRows.some(row => row.filterId === filter.id) // Фільтруємо вже вибрані
// //         );
// //     };
// //
// //     return (
// //         <div>
// //
// //             <Form layout="vertical">
// //                 {filterRows.map((row, index) => {
// //                     const selectedFilter = filters?.find(filter => filter.id === row.filterId);
// //                     const availableValues = selectedFilter ? selectedFilter.values : [];
// //                     return (
// //                         <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
// //                             <Select
// //                                 style={{ width: '200px', marginRight: '8px' }}
// //                                 value={row.filterId || undefined}
// //                                 onChange={(value) => handleFilterChange(value, index, 'filter')}
// //                                 placeholder="Виберіть фільтр"
// //                             >
// //                                 {getAvailableFilters()?.map((filter) => (
// //                                     <Option key={filter.id} value={filter.id}>
// //                                         {filter.name}
// //                                     </Option>
// //                                 ))}
// //                             </Select>
// //                             <Select
// //                                 style={{ width: '200px' }}
// //                                 value={row.valueId || undefined}
// //                                 onChange={(value) => handleFilterChange(value, index, 'value')}
// //                                 placeholder="Виберіть значення"
// //                                 disabled={row.filterId === 0}
// //                             >
// //                                 {availableValues.map((value) => (
// //                                     <Option key={value.id} value={value.id}>
// //                                         {value.value}
// //                                     </Option>
// //                                 ))}
// //                             </Select>
// //                             <Button
// //                                 type="danger"
// //                                 onClick={() => removeRow(index)}
// //                                 style={{ marginLeft: '8px' }}
// //                             >
// //                                 Видалити
// //                             </Button>
// //                         </div>
// //                     );
// //                 })}
// //             </Form>
// //             <Button onClick={addRow} type="primary" style={{ marginBottom: 16 }}>
// //                 Додати фільтр
// //             </Button>
// //         </div>
// //     );
// // };
// //
// // export default FilterForm;
