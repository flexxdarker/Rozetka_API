import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
// import {Button, Checkbox, Form, Input, Flex, type FormProps} from 'antd';
import {Button, Form, Input, Flex, type FormProps, message} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {ILoginModel} from "../../models/accountsModel.ts";
import {AccountsService} from "../../services/accountsService.ts";
import {TokenService} from "../../services/tokenService.ts";
import {toast} from "react-toastify";
import './SignIn.css';
// type FieldTypeSignIn = {
//     username?: string;
//     password?: string;
//     remember?: string;
// };

const SignIn: React.FC = () => {

    const navigate = useNavigate();

        const onFinish: FormProps<ILoginModel>['onFinish'] = async (values) => {
                console.log('Form values:', {...values}); // Обробка відправки форми з додатковими даними редактора
             const res = await AccountsService.login(values);
             console.log("res ",res);
             if(res.status === 200 && res.data.accessToken != null) {
                 TokenService.save(res.data);
                 if (res.status == 200) {
                     message.success("login success");
                     navigate("/");
                 } else {
                     message.warning("Warning");
                 }
             }
             else{
                 toast('Помилка користувача', {
                     position: 'bottom-right',
                     autoClose: 4000, // Auto close after 3 seconds
                     closeButton: true,  // Add close button to the toast
                 });
             }
        };

        const onFinishFailed: FormProps<ILoginModel>['onFinishFailed'] = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const GoogleSignIn = () => {
            console.log('Google SignIn');
        };


        return (
            <>
                <div style={{
                    minWidth: "300px",
                    maxWidth: "fit-content",
                    height: "fit-content",
                    alignItems: "center",
                    margin: "auto",
                    display: 'flex',
                    flexDirection: 'column',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
                     className={"rounded-[8px] bg-[#fff] border-solid border border-[#9cc319]"}>
                    <h1>SignIn page</h1>
                    <Form
                        name="login"
                        initialValues={{remember: true}}
                        style={{maxWidth: 360, margin: "20px", width: "300px"}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Email"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your Password!'}]}
                        >
                            <Input prefix={<LockOutlined/>} type="password" placeholder="Password"/>
                        </Form.Item>

                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                                {/*    <Checkbox>Remember me</Checkbox>*/}
                                {/*</Form.Item>*/}
                                <a href="">Forgot password</a>
                            </Flex>
                        </Form.Item>


                        {/* const [description, setDescription] = useState<string>("");*/}
                        {/* const editorRef = useRef<Editor | null>(null);*/}

                    {/*    const onFinish: FormProps<FieldTypeSignIn>['onFinish'] = (values) => {*/}
                    {/*    // if (editorRef.current) {*/}
                    {/*    const description = editorContent;*/}
                    {/*    // const description = editorRef.current.getContent();*/}
                    {/*    console.log('Form values:', {...values, description}); // Обробка відправки форми з додатковими даними редактора*/}
                    {/*    // }*/}
                    {/*};*/}

                        {/*// const handleEditorChange = (content, editor) => { setEditorContent(content); console.log('Content was updated:', content); };*/}

                        {/*<Form.Item name="description">*/}
                        {/*    <Editor*/}
                        {/*        apiKey="l4ipj5d2e673xkfnuw4xjsxgaqqu4f45uf8qoh4az9o28mzr"*/}
                        {/*        tinymceScriptSrc='/src/components/tinymce/js/tinymce/tinymce.min.js'*/}
                        {/*        onInit={(_evt, editor) => editorRef.current = editor}*/}
                        {/*        initialValue="<p>This is the initial content of the editor.</p>"*/}
                        {/*        init={{*/}
                        {/*            height: 500, //висота самого інтупа*/}
                        {/*            language: "en", //мова панелі*/}
                        {/*            menubar: true, //показувать меню*/}
                        {/*            images_file_types: "jpg,jpeg", //формати файлі, які можна обирать - фото*/}
                        {/*            plugins: [*/}
                        {/*                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',*/}
                        {/*                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',*/}
                        {/*                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'*/}
                        {/*            ],*/}
                        {/*            toolbar: 'undo redo | blocks | ' +*/}
                        {/*                'bold italic forecolor | alignleft aligncenter ' +*/}
                        {/*                'alignright alignjustify | bullist numlist outdent indent | ' +*/}
                        {/*                'removeformat | help',*/}
                        {/*            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Form.Item>*/}


                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                SignIn
                            </Button>
                            <div className="signup-link">
              <Link to="/signup">SignUp!</Link>
            </div>
                        </Form.Item>


                        <Button block type="primary" htmlType="button" onClick={GoogleSignIn}>
                            SignIn with Google
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
;

export default SignIn;