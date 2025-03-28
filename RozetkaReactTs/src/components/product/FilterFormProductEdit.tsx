import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Button, Form, Select, Space} from 'antd';
import {IFilterModel} from "../../models/filterModel.ts";
import {IFilterValueProductForm} from "../../models/filterValueModel.ts";

interface FilterFormProps {
    filters: IFilterModel[]; // Array of filters passed as props
    initValue: IFilterValueProductForm[]; // Initial values for the form
    onChange: (updatedFilterRows: IFilterValueProductForm[]) => void; // Callback function to update parent
}

const {Option} = Select;

const FilterFormProductEdit: React.FC<FilterFormProps> = ({filters, onChange, initValue}) => {
    const [filterRows, setFilterRows] = useState<IFilterValueProductForm[]>(initValue);
    const [usedFilters, setUsedFilters] = useState<Set<number>>(new Set()); // Track used filters
    const [loading, setLoading] = useState<boolean>(true); // New loading state


    const [form] = Form.useForm();

    // Add a new row if the number of rows is less than filters array length
    const addRow = () => {
        const newRow = {filterId: 0, valueId: 0};
        if (!filterRows) {
            setFilterRows([newRow]);
            onChange([newRow]);
        } else {
            const newFilterRows = [...filterRows, newRow];
            setFilterRows(newFilterRows);
            onChange([...filterRows, newRow]);
        }

    };

    const handleFilterChange = (value: number, index: number, type: 'filter' | 'value') => {
        const newRows = [...filterRows!];
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
        const newRows = filterRows!.filter((_, i) => i !== index);
        const removedFilter = filterRows![index].filterId;
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

    useEffect(() => {
        // Set the form values only when initValue is available
        if (initValue) {
            console.log("initValue", initValue);
            setFilterRows(initValue);
            // Set loading to false once data is available
            setLoading(false);
        }
    }, [initValue]);


    return (<>

        {loading ? (
            <div>Loading...</div>
        ) : (
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                form={form}
                name="dynamic_form_complex"
                autoComplete="off"
                initialValues={{items: [{list: initValue!}]}}
            >
                {/* Check if the data is loaded before rendering the form */}

                <Form.List name="items">
                    {(fields) => (
                        <div style={{display: 'flex', rowGap: 16, flexDirection: 'column'}}>
                            {fields.map((field) => (
                                <Form.Item label="List" key={field.key}>
                                    <Form.List name={[field.name, 'list']}>
                                        {(subFields, subOpt) => (
                                            <div style={{display: 'flex', flexDirection: 'column', rowGap: 16}}>
                                                {subFields.map((subField, index) => (
                                                    <Space key={subField.key}>
                                                        {/* Filter selection */}
                                                        <Form.Item noStyle name={[subField.name, 'filterId']}>
                                                            <Select
                                                                placeholder="Select Filter"
                                                                style={{width: '200px'}}
                                                                value={filterRows![index]?.filterId || undefined}
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

                                                        {/* Value selection */}
                                                        <Form.Item noStyle name={[subField.name, 'valueId']}>
                                                            <Select
                                                                placeholder="Select Value"
                                                                style={{width: '200px'}}
                                                                value={filterRows![index]?.valueId || undefined}
                                                                onChange={(value) => handleFilterChange(value, index, 'value')}
                                                                disabled={filterRows![index]?.filterId === 0}
                                                            >
                                                                {filters
                                                                    .filter((filter) => filter.id === filterRows![index]?.filterId)
                                                                    .flatMap((filter) =>
                                                                        filter.values.map((value) => (
                                                                            <Option key={value.id} value={value.id}>
                                                                                {value.value}
                                                                            </Option>
                                                                        ))
                                                                    )}
                                                            </Select>
                                                        </Form.Item>

                                                        <CloseOutlined onClick={() => {
                                                            removeRow(index);
                                                            subOpt.remove(index);
                                                        }}/>
                                                    </Space>
                                                ))}
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        subOpt.add();
                                                        addRow();
                                                    }}
                                                    block
                                                >
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
        )};
    </>);
};

export default FilterFormProductEdit;
