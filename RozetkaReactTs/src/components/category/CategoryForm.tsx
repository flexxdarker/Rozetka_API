import React from 'react';
import {Button, Form, type FormProps, Input, message} from "antd";
import {CategoriesServices} from "../../services/categoriesService.ts";
import { useNavigate } from "react-router-dom";
import {ICreateCategoryModel} from "../../models/categoriesModel.ts";


// type FieldTypeCreateCategory = {
//     name?: string;
//     parentCategoryId?: number;
// };

const CategoryForm: React.FC = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();

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
                <Form.Item
                    name="name"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your category name!'}]}
                >
                    <Input placeholder="Category name"/>
                </Form.Item>

                <Form.Item
                    name="parentCategoryId"
                    label={"parentCategoryId"}
                    rules={[{required: true, message: 'Please input id!'}]}
                >
                    <Input type="number" placeholder="Number"/>
                </Form.Item>


                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button block type="primary" htmlType="submit">
                        Створити категорію
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CategoryForm;