import React, {useEffect, useState} from 'react';
import arrowUp from '../../assets/icons/nav-arrow-up.svg'
import {IEditUserModel, IUserModel} from "../../models/accountsModel.ts";
import {AccountsService} from "../../services/accountsService.ts";
import {DatePicker, Form, type FormProps, Input, message, Upload, UploadFile} from "antd";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {TokenService} from "../../services/tokenService.ts";

// interface UserDataListItemProps {
//     lable: string;
//     data: Record<string, string>;
// }

// const AccountDataUserInfo: React.FC<UserDataListItemProps> = ({lable, data}) => {

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const AccountDataUserInfo: React.FC = () => {

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const [form] = Form.useForm();

    //@ts-ignore
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    //@ts-ignore
    const [previewImage, setPreviewImage] = useState('');
    //@ts-ignore
    const [previewTitle, setPreviewTitle] = useState('');
    const [isImage, setIsImage] = useState<boolean>(false);

    const [isDisable, setIsDisable] = useState<boolean>(true);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);// перемикаємо стан обертання
    };

    const [userInfo, setUserInfo] = useState<IUserModel | undefined>(undefined);
    const loadUser = async () => {
        const res = await AccountsService.getUserById();
        if (res.status === 200) {
            setUserInfo(res.data);
            setFileList([{uid: String(res.data.id),name: res.data.avatar,status:"done",url:uploadings + `/200_${res.data.avatar}`}])
            form.setFieldsValue({
                ...res.data,
                birthdate: dayjs(res.data.birthDate)// передаємо всі інші дані// додаємо дату у відповідне поле
            });
        }
    }

    useEffect(() => {
        if (userInfo === undefined) {
            loadUser();
        }
    }, [isOpen]);


    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => prevList.filter(item => item.uid !== file.uid));
    };


    // Обробник зміни файлів
    const handleChange = (info: UploadChangeParam) => {
        let newFileList = [...info.fileList];

        // Оновлюємо статус кожного файлу (успішне завантаження або помилка)
        newFileList = newFileList.map((file) => {
            if (file.status === 'done') {
                file.url = uploadings + '/200_' + file.name;
            }
            return file;
        });

        setFileList(newFileList);
    };

    const onFinish: FormProps['onFinish'] = async (values: IEditUserModel) => {

        if (!isDisable) {


            console.log('Form values: good', {...values}); // Обробка відправки форми з додатковими даними редактора
            const res = await AccountsService.editUser(values);
            console.log("res:",res)
            if (res.status == 200) {
                message.success("Edited");
                TokenService.saveTokenString(res.data.token);
                //navigate(-1);
            } else {
                message.warning("Warning");
            }
        }
    };


    const onFormEdit = () => {
            setIsDisable(!isDisable);
    };


    return (
        <div
            className="main-container flex w-[1160px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col justify-end items-end flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0 mt-[4px]">
            <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                <div
                    className="flex w-[281px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
            Мої дані
          </span>
                </div>
                <button
                    className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                    <img
                        src={arrowUp}
                        className={`w-10 h-10 transition-transform duration-300 ${isRotated ? 'rotate-0' : 'rotate-180'}`}
                        onClick={handleClick}
                    />
                </button>
            </div>

            <div
                className={`items-center self-stretch shrink-0 flex-nowrap overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`} // Максимальна висота для відкриття
            >
                {isOpen && (
                    <>
                        <Form
                            form={form}
                            // labelCol={{span: 6}}
                            // wrapperCol={{span: 18}}
                            name="login"
                            initialValues={{remember: true}}
                            style={{margin: "20px", width: "full"}}
                            onFinish={onFinish}
                            //onFinishFailed={onFinishFail}
                        >
                            <div className={"flex flex-col"}>
                                <div
                                    className="flex pt-[10px] pr-0 pb-[10px] pl-0 justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap w-auto">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap w-full">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap w-full">
                              Прізвище
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap w-full">
                                            <Form.Item
                                                name="lastName"
                                                rules={[{required: true, message: 'Please input lastname!'}]}
                                                className="w-full"
                                            >
                                                <Input placeholder="Lastname" className="w-full" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Ім'я
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="firstName"
                                                rules={[{required: true, message: 'Please input firstname!'}]}
                                            >
                                                <Input placeholder="Firstname" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Email
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="email"
                                                rules={[{required: true, message: 'Please input email!'}]}
                                            >
                                                <Input placeholder="Email" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Номер телефону
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="phoneNumber"
                                                rules={[{required: true, message: 'Please input phone number'}]}
                                            >
                                                <Input placeholder="Phone number" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                </div>


                                <div
                                    className="flex pt-[10px] pr-0 pb-[10px] pl-0 justify-around items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap w-auto">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap w-full">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap w-full">
                              Дата народження
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap w-full">
                                            <Form.Item
                                                name="birthdate"
                                                rules={[{required: true, message: 'Please input your birthdate!'}]}
                                            >
                                                    <DatePicker
                                                        format="YYYY-MM-DD"
                                                        style={{ width: '100%' }}
                                                        placeholder="Birthdate"
                                                        disabled={isDisable}
                                                    />
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Аватар
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="avatar"
                                                valuePropName="avatar"
                                                rules={[{
                                                    required: true,
                                                    message: "Please avatar!"
                                                }]}
                                                getValueFromEvent={(e: UploadChangeParam) => {
                                                    setIsImage(e.fileList.length > 0);
                                                    return e.fileList[0]?.originFileObj;
                                                }}
                                            >
                                                <Upload disabled={isDisable}
                                                    beforeUpload={() => true} // Забороняємо автоматичне завантаження
                                                    accept="image/*"
                                                    maxCount={1} // Лише один файл
                                                    listType="picture-card"
                                                    fileList={fileList} // передаємо fileList, який містить вже завантажене зображення
                                                    onPreview={(file: UploadFile) => {
                                                        if (!file.url && !file.preview) {
                                                            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                                                        }
                                                        setPreviewImage(file.url || (file.preview as string));
                                                        setPreviewOpen(true);
                                                        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                                                    }}
                                                    onRemove={handleRemove} // Додаємо обробник для видалення файлів
                                                    onChange={handleChange} // Обробка зміни файлів
                                                >
                                                    {isImage || fileList.length > 0 ? null : uploadButton}
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {isDisable ? (
                                <Form.Item>
                                    <div className="flex flex-row-reverse">
                                        <button type={"button"}
                                                onClick={onFormEdit}
                                                className="flex w-[132px] h-[40px] pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
                    <span
                        className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
                    Редагувати
                    </span>
                                        </button>
                                    </div>
                                </Form.Item>) : (
                                <div className={"flex justify-end gap-[10px]"}>
                                    <div className={"flex"}>
                                        <Form.Item>
                                            <div className="flex flex-row-reverse">
                                                <button type={"button"}
                                                        onClick={onFormEdit}
                                                        className="flex w-[132px] h-[40px] pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[red] rounded-[8px] border-none pointer">
                    <span
                        className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
                    Відмінити
                    </span>
                                                </button>
                                            </div>
                                        </Form.Item>
                                    </div>
                                    <div className={"flex"}>
                                        <Form.Item>
                                            <div className="flex flex-row-reverse">
                                                <button type={"submit"}
                                                        className="flex w-[132px] h-[40px] pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
                    <span
                        className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
                    Зберегти
                    </span>
                                                </button>
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>)}

                        </Form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountDataUserInfo;