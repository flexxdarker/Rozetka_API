import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
// import viewGrid from "./../../../assets/icons/view-grid.svg?react"
import viewGrid from "./../../../assets/icons/view-grid.svg"
import search from "./../../../assets/icons/search.svg"
import heartWhite from "./../../../assets/icons/heart-white.svg"
import balanceWhite from "./../../../assets/icons/balanceWhite.svg"
import logo from "./../../../assets/icons/Logo_SVG_white 1.svg"
import userWhite from "./../../../assets/icons/user-white.svg"
import cartWhite from "./../../../assets/icons/cart-white.svg"
import logoutWhite from "./../../../assets/icons/logoutWhite.svg"
import Basket from "../../basket/Basket.tsx";
import Modal from "../../other/Modal.tsx";
import {TokenService} from "../../../services/tokenService.ts";
import {AccountsService} from "../../../services/accountsService.ts";


const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(TokenService.isExists());

    const logout = () => {
        AccountsService.logout(TokenService.getRefreshToken() || "")
        setIsLogin(false);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <div
                className="main-container flex w-[1920px] h-[90px] pt-0 pr-[180px] pb-0 pl-[180px] gap-[122px] items-center flex-nowrap relative mx-auto my-0 bg-gradient-to-b from-[#000] to-[#381753]">
                <div className="flex w-[1080px] gap-[102px] items-center shrink-0 flex-nowrap relative">

                    <div className="flex w-[378px] gap-[46px] items-center shrink-0 flex-nowrap relative z-[1]">
                        <Link to="/">
                            <div
                                className="flex w-[100px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative z-[2]">
                                <div
                                    className="w-[80px] h-[51.202px] shrink-0 bg-cover bg-no-repeat relative overflow-hidden z-[3]">
                                    <img src={logo}/>
                                </div>
                            </div>
                        </Link>
                        <button
                            className="flex w-[232px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[4] pointer">
            <span
                className="flex w-[158px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[5]">
              Каталог товарів
            </span>
                            <div
                                className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[6]">
                                <img src={viewGrid}/>
                            </div>
                        </button>
                    </div>
                    <div
                        className="flex w-[600px] pt-0 pr-0 pb-0 pl-[10px] gap-[320px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#000] relative overflow-hidden z-[7]">
                        <input
                            className="w-[600px] h-[40px] shrink-0 bg-transparent border-none absolute top-[-1px] left-[-1px] z-[12]"/>
                        <span
                            className="flex w-[227px] h-[10px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] relative text-center whitespace-nowrap z-[8]">
            Я шукаю...(наприклад, смартфон)
          </span>
                        <div
                            className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[9]">
                            <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap relative z-10">
                                <div
                                    className="h-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[11]">
                                    <img src={search}/>
                                    {/*<search></search>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-[357px] gap-[46px] items-center shrink-0 flex-nowrap relative z-[13]">
                    <div className="flex w-[172px] gap-[24px] items-center shrink-0 flex-nowrap relative z-[14]">
                        <button
                            className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[15]">
                            <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[16]">
                                <div
                                    className="h-[24px] grow shrink-0 basis-0 relative overflow-hidden text-blue-500 z-[17]">
                                    <img src={heartWhite}/>
                                </div>
                            </div>
                        </button>
                        <button
                            className="flex w-[40px] h-[40px] flex-col justify-center items-center shrink-0 flex-nowrap relative z-[18]">
                            <div
                                className="flex h-[40px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative overflow-hidden z-[19]">
                                <div
                                    className="w-[22.5px] h-[19.125px] shrink-0 relative z-20">
                                    <img src={balanceWhite}/>
                                </div>
                            </div>
                        </button>
                        {isLogin ?
                            <button onClick={logout}
                                className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] relative z-[21]">
                                <div
                                    className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[22]">
                                        <img src={logoutWhite}/>
                                </div>
                            </button>
                            :
                            <Link to={"/signIn"}
                                className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] relative z-[21]">
                                <div
                                    className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[22]">
                                        <img src={userWhite}/>
                                </div>
                            </Link>
                        }
                    </div>
                    {/*<Link to={"basket"}>*/}
                    <button onClick={openModal}
                            className="flex w-[139px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[23] pointer">
                        <div
                            className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[24]">
                            <img src={cartWhite}/>

                        </div>
                        <span
                            className="flex w-[65px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[25]">
            Кошик
          </span>
                    </button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <Basket onClose={closeModal}/>
                    </Modal>
                    {/*</Link>*/}
                </div>
            </div>

            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, backgroundColor: 'blue'}}>


                <Link to="categories">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        Categories
                    </Button>
                </Link>

                <Link to="products">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        Products
                    </Button>
                </Link>

                <Link to="subcategories">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        Subcategories
                    </Button>
                </Link>

                <Link to="signin">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        SignIn
                    </Button>
                </Link>

                <Link to="signup">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        SignUp
                    </Button>
                </Link>


            </Box>
        </>
    );

}

export default Header;