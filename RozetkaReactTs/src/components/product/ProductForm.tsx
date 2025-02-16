import React, {useEffect, useState} from 'react';
import {Button, Form, type FormProps, Input, message, Modal, Select, Upload, UploadFile} from "antd";
import EditorTiny from "../other/EditorTiny.tsx";
import {useParams} from "react-router-dom";
import {ProductServices} from "../../services/productService.ts";
import {ICreateProductModel, IProductModel} from "../../models/productsModel.ts";
import { useNavigate } from "react-router-dom";
import {ICategoryName} from "../../models/categoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";
import { PlusOutlined } from '@ant-design/icons';
import {RcFile, UploadChangeParam} from "antd/es/upload";


const ProductForm: React.FC = () => {

    const params = useParams();
    const [editMode, setEditeMode] = useState(false);
    const [product, setProduct] = useState<IProductModel | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<ICategoryName[]>([]);

    const [description, setEditorContent] = useState('');

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // const normFile = (e: any) => {
    //     if (Array.isArray(e)) {
    //         return e.map(file => file.originFileObj);  // Extract originFileObj from each file
    //     }
    //     return e?.fileList.map((file: any) => file.originFileObj);  // Extract originFileObj from the fileList
    // };


    const onFinish: FormProps<ICreateProductModel>['onFinish'] = async (values) => {
            console.log('Form values:', {...values, description}); // Обробка відправки форм
            // const imageFiles = values.imageFiles;
        if (editMode) {
            console.log("Success edit mode:", {...values, description});
            // values.image = values.image.originFileObj;//???????

            // const res = await ProductServices.edit(values);
            // console.log(res);
            // if (res.status == 200) {
            //     message.success("Update");
            //     navigate(-1);
            // } else {
            //     message.alert("Wrong");
            // }
        } else {
            console.log("Success create:", {...values, description});
            // values.image = values.image.originFileObj;
            const res = await ProductServices.create(values);
            console.log(res);
            if (res.status == 200) {
                message.success("Created");
                navigate(-1);
            } else {
                message.warning("Warning");
            }// и
        }// з додатковими даними редактора
    };

    const onFinishFailed: FormProps<ICreateProductModel>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        loadProduct();

        loadSubCategories();
    }, []);

    const loadSubCategories = async () => {
        const res = await  CategoriesServices.getAll();
        setCategories(res.data);
    }

    const loadProduct = async () => {
        if (params.id) {
            setEditeMode(true);
            const res = await ProductServices.getById(params.id);
            console.log(params.id);
            console.log(res.data);
            setProduct(res.data);
            form.setFieldsValue(res.data);
            //form.setFieldsValue({ name: "name", value: "name" });
        }
    }


    return (
        <>
            <h1>Product form</h1>
            <Form
                form={form}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {editMode ? (
                    <Form.Item
                        name="id"
                        label={"Id:"}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                ) : null}

                <Form.Item
                    name="title"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your product name!'}]}
                >
                    <Input placeholder="Product name"/>
                </Form.Item>

                <Form.Item name="categoryId" label="Category" hasFeedback
                           rules={[{required: true, message: 'Please choose the category.'}]}>
                    <Select placeholder="Select a category">
                        {categories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label={"Катеорія:"}
                    rules={[{required: true, message: 'Please input your product category!'}]}
                >
                    <Input placeholder="Category" type={"number"}/>
                </Form.Item>

                <Form.Item
                    name="price"
                    label={"Ціна:"}
                    rules={[{required: true, message: 'Please input your product price!'}]}
                >
                    {/*<InputNumber decimalSeparator={","} placeholder='0,00'/>*/}
                    <Input type={"double"} placeholder='0,00'/>
                </Form.Item>

                <Form.Item
                    name="discount"
                    label={"Знижка:"}
                    rules={[{required: true, message: 'Please input your product discount!'}]}
                >
                    <Input placeholder="Discount" type={"number"}/>
                </Form.Item>


                <Form.Item name="imageFiles" label="Зображення" valuePropName="Image"
                           rules={[{required: true, message: "Please choose a photo for the product."}]}
                           getValueFromEvent={(e: UploadChangeParam) => {
                               return e?.fileList.map(file => file.originFileObj);
                           }}>

                    <Upload beforeUpload={() => false} accept="image/*" maxCount={10} listType="picture-card" multiple
                            onPreview={(file: UploadFile) => {
                                if (!file.url && !file.preview) {
                                    file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                                }

                                setPreviewImage(file.url || (file.preview as string));
                                setPreviewOpen(true);
                                setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                            }}>

                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/*<Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>*/}
                {/*    <Upload action="/upload.do" listType="picture-card">*/}
                {/*        <button style={{ border: 0, background: 'none' }} type="button">*/}
                {/*            <PlusOutlined />*/}
                {/*            <div style={{ marginTop: 8 }}>Upload</div>*/}
                {/*        </button>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}


                <Form.Item wrapperCol={{span: 24}} name="description">
                    <EditorTiny
                        //content={editMode && product !== null? product.description : ""}
                        initialValue={editMode && product !== null ? product.description : ""}
                        onEditorChange={handleEditorChange}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                    <Button block type="primary" htmlType="submit">
                        Створити оголошення
                    </Button>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );
};

export default ProductForm;
