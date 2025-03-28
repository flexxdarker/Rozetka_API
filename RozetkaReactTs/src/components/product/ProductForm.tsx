import React, {useEffect, useState} from 'react';
import {Button, Form, type FormProps, Input, message, Modal, Select, Upload, UploadFile} from "antd";
//import EditorTiny from "../other/EditorTiny.tsx";
import {useParams} from "react-router-dom";
import {ProductServices} from "../../services/productService.ts";
import {ICreateProductModel, IProductModel} from "../../models/productsModel.ts";
import {useNavigate} from "react-router-dom";
import {PlusOutlined} from '@ant-design/icons';
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {IFilterValueProductForm} from "../../models/filterValueModel.ts";
import FilterFormProductCreate from "./FilterFormProductCreate.tsx";
import FilterFormProductEdit from "./FilterFormProductEdit.tsx";
import useFilters from "../../hooks/useFilters.ts";
import useCategories from "../../hooks/useCategories.ts";
// import {CloseOutlined} from "@mui/icons-material";

//const KEY : string | undefined = import.meta.env.VITE_APP_TINYMCE_KEY;

const ProductForm: React.FC = () => {

    const {filters} = useFilters();
    const {categories} = useCategories();

    //const initFV: IFilterValueProductForm[] = [{filterId: 2, valueId:11}, {filterId: 3, valueId:15}];
    const [initFV, setInitFV] = useState<IFilterValueProductForm[]>([]);

    const params = useParams();
    const [editMode, setEditeMode] = useState(false);
    const [product, setProduct] = useState<IProductModel | null>(null);

    const [filterValue, setFilterValue] = useState<IFilterValueProductForm[]>([]);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    //const [description, setEditorContent] = useState('');

    // const handleEditorChange = (content: string) => {
    //     setEditorContent(content);
    //     form.setFieldsValue({ description: content });
    // };

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onFinish: FormProps<ICreateProductModel>['onFinish'] = async (values) => {
        //console.log('Form values:', {...values, description}); // Обробка відправки форм

        if(filterValue.length > 0){
            values.values = filterValue.map(item => item.valueId)
        }

        //const imageFiles = values.imageFiles;
        if (editMode) {
            // production
            // development
            //  if(import.meta.env.MODE === 'production') {

             //if(KEY === undefined) {


                console.log("Success create: values ", {values});
                const res = await ProductServices.edit(values);
                if (res.status == 200) {
                    message.success("Update");
                    navigate(-1);
                } else {
                    message.warning("Warning");
                }

            // } else {
            //
            //
            //     console.log("Success create:", {...values, description});
            //     const res = await ProductServices.edit({...values, description});
            //     if (res.status == 200) {
            //         message.success("Update");
            //         navigate(-1);
            //     } else {
            //         message.warning("Warning");
            //     }
            //  }
        } else {
             //if(KEY === /undefined) {
                console.log("Success create: values ", {values});
                const res = await ProductServices.create(values);
                if (res.status == 200) {
                    message.success("Created");
                    navigate(-1);
                } else {
                    message.warning("Warning");
                }
            // } else {
            //     console.log("Success create:", {...values, description});
            //     const res = await ProductServices.create({...values, description});
            //     if (res.status == 200) {
            //         message.success("Created");
            //         navigate(-1);
            //     } else {
            //         message.warning("Warning");
            //     }
            // }
        }// з додатковими даними редактора
    };

    const onFinishFailed: FormProps<ICreateProductModel>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        if (params.id) {
            setEditeMode(true);
            const res = await ProductServices.getById(params.id);
            if (res.status === 200) {
                setProduct(res.data);
                //setEditorContent(res.data.description);
                form.setFieldsValue(res.data);
            } else {
                message.warning("Warning");
            }
        }
        const filterValueProductForms: IFilterValueProductForm[] = [];
        setInitFV(filterValueProductForms);
        handleFilterChange(filterValueProductForms);
    }


    const handleFilterChange = (updatedFilterRows: IFilterValueProductForm[]) => {
        //console.log('Updated Filter Rows:', updatedFilterRows);
        setFilterValue(updatedFilterRows);
        // Оновлюємо масив filterRows, який зберігає вибрані значення
    };


    useEffect(() => {
        const filterValueProductForms: IFilterValueProductForm[] = [];
        console.log(product?.values);
        if (product?.values) {
            product?.values.forEach(value => {
                // Знайдемо фільтр за його name
                const filter = filters.find(f => f.name === value.filterName);

                // Якщо фільтр знайдено
                if (filter) {
                    // Знайдемо відповідне значення для цього фільтра
                    const filterValue = filter.values.find(fv => fv.value === value.valueName);

                    // Якщо значення фільтра знайдено
                    if (filterValue) {
                        filterValueProductForms.push({
                            filterId: filter.id,
                            valueId: filterValue.id
                        });
                    }
                }

            });
        }
        console.log("filterValueProductForms",filterValueProductForms);
        // Оновлюємо стейт filterValue
        setInitFV(filterValueProductForms);
        handleFilterChange(filterValueProductForms);
    }, [product]);

    // useEffect(() => {
    //     if(initFV.length > 0){
    //         handleFilterChange(initFV);
    //     }
    // }, [initFV]);


    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    return (
        <>
            <Form
                form={form}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto", minWidth: "800px"}}
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

                <Form.Item name="categoryId" label="Категорія" hasFeedback
                           rules={[{required: true, message: 'Please choose the category.'}]}>
                    <Select placeholder="Select a category">
                        {categories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="price"
                    label={"Ціна:"}
                    rules={[{required: true, message: 'Please input your product price!'}]}
                >
                    {/*<InputNumber decimalSeparator={","} placeholder='0,00'/>*/}
                    <Input type={"double"} placeholder='0,00'/>
                    {/*<Input type={"number"} placeholder='0,00'/>*/}
                </Form.Item>

                <Form.Item
                    name="discount"
                    label={"Знижка:"}
                >
                    {/*<Input placeholder="Discount" type={"number"}/>*/}
                    <Input type={"double"} placeholder='0,00'/>
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

                        {uploadButton}
                        {/*<div>*/}
                        {/*    <PlusOutlined/>*/}
                        {/*    <div style={{marginTop: 8}}>Upload</div>*/}
                        {/*</div>*/}
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

                {/*<Form.Item>*/}
                {/*<FilterForm filters={filters} onChange={handleFilterChange} />*/}
                <Form.Item
                    name="values">
                    {editMode ? (
                            <FilterFormProductEdit filters={filters} onChange={handleFilterChange} initValue={initFV} />
                    ) : (
                        <FilterFormProductCreate filters={filters} onChange={handleFilterChange} />
                    )}

            </Form.Item>
                {/*</Form.Item>*/}




                <Form.Item wrapperCol={{span: 24}} name="description"
                           rules={[{required: true, message: 'Please input your description!'},
                               {min: 50, message: 'description must be min 50 characters long!'},
                               {max: 5000, message: 'description must be max 5000 characters long!'}]}>
                    {/*{KEY === undefined ? (*/}
                        <Input.TextArea showCount allowClear autoSize={{ minRows: 10, maxRows: 100 }} />
                    {/*) : (*/}
                    {/*<EditorTiny*/}
                    {/*    //content={editMode && product !== null? product.description : ""}*/}
                    {/*    initialValue={editMode && product !== null ? product.description : ""}*/}
                    {/*    onEditorChange={handleEditorChange}*/}
                    {/*/>*/}
                    {/*)}*/}
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                    <Button block type="primary" htmlType="submit">
                        {editMode ? `Змінити продукт ${product?.title}` : "Створити оголошення"}
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
