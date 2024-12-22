import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select, SelectProps, Space, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
//import { EditProductModel, ProductModel } from '../models/products.model';
//import { productsService } from '../services/products.service';

type FieldType = {
    name: string;
    price: number;
    discount: number;
    categoryId: number;
    description?: string;
    inStock: boolean;
    image: File;
};

export interface ProductModel {
    id: number;
    name: string;
    categoryName: string;
    discount: number;
    price: number;
    imageUrl: string;
}

export interface CreateProductModel {
    name: string;
    categoryId: number;
    discount: number;
    price: number;
    image: File;
    description?: string;
    inStock: boolean;
}

export interface EditProductModel {
    id: number;
    name: string;
    categoryId: number;
    discount: number;
    price: number;
    imageUrl: string;
    newImage?: File;
    description?: string;
    inStock: boolean;
}

const ProductForm: React.FC = () => {

    const [categories, setCategories] = useState<SelectProps['options']>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductModel | null>(null);

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();

    const loadCategories = async () => {
        // const res = await productsService.getCategories();
        // const options = res.data.map(i => { return { value: i.id, label: i.name } });
        //  setCategories(options);
    }

    const loadProduct = async () => {
        // const id = Number(params.id);
        // const res = await productsService.get(id);
        // setProduct(res.data);
        // form.setFieldsValue(res.data);
    }

    useEffect(() => {
        if (params.id) {
            setEditMode(true);
            loadProduct();
        }

        loadCategories();
        // eslint-disable-next-line
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log(values);

        if (editMode) {

            // use original values
            // TODO: use hidden inputs
            if (product === null) return;

            const requestModel: EditProductModel = {
                ...values,
                id: product.id,
                imageUrl: product.imageUrl,
                newImage: values.image
            }

            // const response = await productsService.edit(requestModel);
            //
            // if (response.status === 200) {
            //     message.success(`Product edited successfully!`);
            // }
        }
        // else {
        //     //const response = await productsService.create(values);
        //
        //     if (response.status === 200) {
        //         message.success(`Product created successfully!`);
        //     }
        // }

        // go back
        navigate(-1);
    };
    const onReset = () => {
        form.resetFields();
    };

    const normFile = (e: any) => {
        // if (Array.isArray(e)) {
        //     return e;
        // }
        return e?.file.originFileObj;
    };

    const normDescription = (e: any) => {
        return e.target.value === "" ? null : e.target.value;
    }

    return (
        <>
            <Button type="text" onClick={() => navigate(-1)}>
                <ArrowLeftOutlined />
            </Button>
            <h1 style={{ textAlign: "center" }}>{editMode ? "Edit" : "Create"} Product</h1>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "auto"
                }}
                layout="vertical"
            >
                <Form.Item<FieldType>
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <div style={col2}>

                    <Form.Item<FieldType>
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            flexGrow: 1
                        }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="$"
                            placeholder="Enter product price"
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="discount"
                        label="Discount"
                        initialValue={0}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            flexGrow: 1
                        }}
                    >
                        <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="%"
                            placeholder="Enter product discount"
                        />
                    </Form.Item>
                </div>

                <Form.Item<FieldType>
                    name="categoryId"
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a product category"
                        allowClear
                        options={categories}>
                    </Select>
                </Form.Item>

                <Form.Item<FieldType>
                    name="image"
                    label="Image"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: editMode ? false : true,
                        },
                    ]}
                >
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    name="description"
                    label="Description"
                    getValueFromEvent={normDescription}
                    initialValue={null}>
                    <TextArea rows={4}
                              placeholder="Enter product description"
                              minLength={10} maxLength={3000} showCount />
                </Form.Item>

                <Form.Item<FieldType>
                    name="inStock"
                    valuePropName="checked"
                    initialValue={false}
                    label="In Stock">
                    <Checkbox>
                        In Stock
                    </Checkbox>
                </Form.Item>
                <Form.Item style={{
                    textAlign: "center"
                }}>

                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? "Edit" : "Create"}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default ProductForm;

const col2: React.CSSProperties = {
    display: "flex",
    gap: 10
}