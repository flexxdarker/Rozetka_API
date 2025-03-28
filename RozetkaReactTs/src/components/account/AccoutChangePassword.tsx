import React, {useState} from 'react';
import arrowUp from '../../assets/icons/nav-arrow-up.svg'
import {IUserChangePassword} from "../../models/accountsModel.ts";
import {Form, type FormProps, Input} from "antd";
import {AccountsService} from "../../services/accountsService.ts";
import {toast} from "react-toastify";


const AccountChangePassword: React.FC = () => {

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const [isDisable, setIsDisable] = useState<boolean>(true);

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);// перемикаємо стан обертання
    };

    const onFinish: FormProps['onFinish'] = async (values: IUserChangePassword) => {

        if (!isDisable) {
            console.log('Form values: good', {...values}); // Обробка відправки форми з додатковими даними редактора
            const res = await AccountsService.changePassword(values);
            console.log("res:",res)
            if (res.status == 200) {
                toast('Пароль успішно змінено!', {
                    position: 'bottom-right',
                    autoClose: 4000, // Auto close after 3 seconds
                    closeButton: true,  // Add close button to the toast
                });
            } else {
                toast('Пароль не змінено!', {
                    position: 'bottom-right',
                    autoClose: 4000, // Auto close after 3 seconds
                    closeButton: true,  // Add close button to the toast
                });
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
            Зміна пароля
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
                            name="passwordChange"
                            initialValues={{remember: true}}
                            style={{margin: "20px", width: "full"}}
                            onFinish={onFinish}
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
                              Пароль
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap w-full">
                                            <Form.Item
                                                name="currentPassword"
                                                rules={[{required: true, message: 'Please input current password!'}]}
                                                className="w-full"
                                            >
                                                <Input type="password" placeholder="Current password" className="w-full" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Новий пароль
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="newPassword"
                                                rules={[{required: true, message: 'Please input new password!'},
                                                    {min: 8, message: 'Password must be at least 8 characters long!'}]}
                                            >
                                                <Input type="password" placeholder="New password" disabled={isDisable}/>
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex p-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                              Підтвердіть новий пароль
                            </span>
                                        </div>
                                        <div
                                            className="flex p-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                            <Form.Item
                                                name="confirm"
                                                dependencies={['newPassword']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your new password!',
                                                    },
                                                    ({getFieldValue}) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('newPassword') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input type="password" placeholder="Confirm new password" disabled={isDisable}/>
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

export default AccountChangePassword;