import React, {useEffect, useState} from 'react';
import {Button, Form, type FormProps, Input, message, Modal, Select, Upload, UploadFile} from "antd";
import {CategoriesServices} from "../../services/categoriesService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ICategoryModel, ICategoryName, ICreateCategoryModel} from "../../models/categoriesModel.ts";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";


const CategoryForm: React.FC = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();

    const [category, setCategory] = useState<ICategoryModel | null>(null);
    const [categories, setCategories] = useState<ICategoryName[]>([]);

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onFinish: FormProps['onFinish'] = async (values:ICreateCategoryModel) => {
        console.log('Form values:', {...values}); // Обробка відправки форми з додатковими даними редактора
        const res = await CategoriesServices.create(values);
        console.log(res);
        if (res.status == 200) {
            message.success("Created");
            navigate(-1);
        } else {
            message.warning("Warning");
        }
    };

    const onFinishFailed: FormProps<ICreateCategoryModel>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loadCategory = async () => {
        if (params.id) {
            setEditMode(true);
            const res = await CategoriesServices.getById(params.id);
            console.log(params.id);
            console.log(res.data);
            setCategory(res.data);
            form.setFieldsValue(res.data);
            //form.setFieldsValue({ name: "name", value: "name" });
        }
    };

    useEffect(() => {
        loadCategory();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const res = await  CategoriesServices.getAll();
        setCategories(res.data);
    }


    return (
        <>

            <h1>Category form</h1>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {editMode && (
                <Form.Item

                    name="id"
                    label={"Id"}
                    rules={[{required: true, message: 'Please input id!'}]}
                >
                    <Input disabled={true}/>
                </Form.Item>
                )}

                <Form.Item
                    name="name"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your category name!'}]}
                >
                    <Input placeholder="Category name"/>
                </Form.Item>

                <Form.Item name="parentCategoryId" label="Категорія" hasFeedback
                           rules={[{required: false, message: 'Please choose the category.'}]}>
                    <Select placeholder="Select a category">
                        {categories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="image" label="Зображення" valuePropName="Image"
                           rules={[{required: true, message: "Please choose a photo for the category."}]}
                           getValueFromEvent={(e: UploadChangeParam) => {
                               return e.fileList[0]?.originFileObj;
                           }}>

                    <Upload
                        beforeUpload={() => false} // Забороняємо автоматичне завантаження
                        accept="image/*"
                        maxCount={1} // Лише один файл
                        listType="picture-card"
                        onPreview={(file: UploadFile) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }
                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>

                </Form.Item>


                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button block type="primary" htmlType="submit" disabled={editMode}>
                        {editMode ? `Змінити категорію ${category?.name}` : "Створити категорію"}
                    </Button>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );
};

export default CategoryForm;