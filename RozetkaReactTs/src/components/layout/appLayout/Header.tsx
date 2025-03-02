import React, {useEffect, useState} from 'react';
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
import settingWhite from "./../../../assets/icons/setting-white.svg"
import Basket from "../../basket/Basket.tsx";
import Modal from "../../other/Modal.tsx";
import {TokenService} from "../../../services/tokenService.ts";
import {AccountsService} from "../../../services/accountsService.ts";
import {AutoComplete,} from 'antd';
import type {AutoCompleteProps} from 'antd';
import {IProductModel} from "../../../models/productsModel.ts";
import {ProductServices} from "../../../services/productService.ts";
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../../store";
import {calculateTotalPrice} from "../../../store/actions/basketActions.ts";
import {IBasketModel} from "../../../models/basketModel.ts";
import {BasketService} from "../../../services/basketService.ts";
import formatPrice from "../../../functions/formatPrice.ts";


const Header = () => {

    const dispatch = useDispatch<AppDispatch>();
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice);
    const [basket, setBasket] = useState<IBasketModel>({});
    const [products, setProducts] = useState<IProductModel[]>([]);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };


    useEffect(() => {
        loadProducts();
        handleBasketUpdate();
    }, []);

    const handleBasketUpdate = () => {
        const savedBasket = BasketService.getItems();
        if (savedBasket) {
            setBasket(savedBasket);
        }
    };


    useEffect(() => {
        if (products.length > 0) {
            dispatch(calculateTotalPrice(products, basket));
        }
    }, [products, basket, dispatch]);

    const searchResult = (query: string) => {
        const filteredProducts = products.filter(
            (product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            //|| product.category.toLowerCase().includes(query.toLowerCase())
        );

        return filteredProducts.map((product) => ({
            value: product.title,
            label: (
                <Link to={`product-page/${product.id}`}>


                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>{product.title}</span>
                        {/*<span>{product.category}</span>*/}
                        <span>category</span>
                    </div>
                </Link>
            ),
        }));
    };

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


    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };


    return (
        <>
            <Box className="bg-gradient-to-b from-[#000] to-[#381753]"
                 sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <div
                    className="main-container flex w-auto h-[90px] pt-0 pb-0 items-center flex-nowrap mx-auto my-0 justify-center">
                    <div className="flex gap-[102px] items-center shrink-0 flex-nowrap">

                        <div className="flex w-[378px] gap-[46px] items-center shrink-0 flex-nowrap">
                            <Link to="/">
                                <div
                                    className="flex w-[100px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap">
                                    <div
                                        className="w-[80px] h-[51.202px] shrink-0 bg-cover bg-no-repeat overflow-hidden">
                                        <img src={logo}/>
                                    </div>
                                </div>
                            </Link>
                            <button
                                className="flex w-[232px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
            <span
                className="flex w-[158px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] text-center whitespace-nowrap">
              Каталог товарів
            </span>
                                <div
                                    className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                    <img src={viewGrid}/>
                                </div>
                            </button>
                        </div>

                        <div className="relative flex">
                            <AutoComplete
                                className="h-[40px] flex w-[600px] pt-0 pr-0 pb-0 pl-[10px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#000] overflow-hidden z-[1]"
                                options={options}
                                onSelect={onSelect}
                                onSearch={handleSearch}
                                allowClear={false}
                                notFoundContent={"Товар не знайдено"}
                                size="large"
                            >
                                {/*<Input.Search size="large" placeholder="input here" enterButton/>*/}
                                <input placeholder="Я шукаю...(наприклад, смартфон)" className="grow"/>
                            </AutoComplete>
                            <img src={search}
                                 className="absolute right-[10px] top-[50%] transform -translate-y-1/2 z-[2]"/>
                        </div>


                        {/*<div*/}
                        {/*    className="h-[40px] flex w-[600px] pt-0 pr-0 pb-0 pl-[10px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#000] overflow-hidden">*/}
                        {/*    <input placeholder="Я шукаю...(наприклад, смартфон)" className="grow">*/}
                        {/*    </input>*/}

                        {/*    <div*/}
                        {/*        className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">*/}
                        {/*        <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap">*/}
                        {/*        <div*/}
                        {/*                className="h-[24px] grow shrink-0 basis-0 overflow-hidden">*/}
                        {/*                <img src={search}/>*/}
                        {/*                /!*<search></search>*!/*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="flex gap-[24px] items-center shrink-0 flex-nowrap">
                            <button
                                className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px]">
                                <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap">
                                    <div
                                        className="h-[24px] grow shrink-0 basis-0 overflow-hidden text-blue-500">
                                        <img src={heartWhite}/>
                                    </div>
                                </div>
                            </button>
                            <button
                                className="flex w-[40px] h-[40px] flex-col justify-center items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex h-[40px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[4px] overflow-hidden">
                                    <div
                                        className="w-[22.5px] h-[19.125px] shrink-0">
                                        <img src={balanceWhite}/>
                                    </div>
                                </div>
                            </button>
                            {isLogin ?
                                <>
                                    <Link to="account/data"
                                          className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px]">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                            <img src={settingWhite}/>
                                        </div>
                                    </Link>
                                    <button onClick={logout}
                                            className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px]">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                            <img src={logoutWhite}/>
                                        </div>
                                    </button>
                                </>
                                :
                                <Link to={"/signIn"}
                                      className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px]">
                                    <div
                                        className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                        <img src={userWhite}/>
                                    </div>
                                </Link>
                            }
                        </div>
                        {/*<Link to={"basket"}>*/}
                        <div>
                            <button onClick={openModal}
                                    className="flex pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
                                <div
                                    className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                    <img src={cartWhite}/>

                                </div>
                                <span
                                    className="flex h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] text-center whitespace-nowrap">
            {totalPrice <= 0 ?
                "Кошик"
                :
                (<div
                    className="main-container h-[32px] font-['Inter'] text-[12px] font-medium leading-[16px] text-[#fff] relative mx-auto my-0 flex flex-col justify-center items-start">
                    <div>Сума</div>
                    <div>{formatPrice(totalPrice)} грн</div>
                </div>)
            }
          </span>
                            </button>
                        </div>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <Basket onClose={closeModal}/>
                        </Modal>
                        {/*</Link>*/}
                    </div>
                </div>
            </Box>

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

                <Link to="/product-filter">
                    <Button sx={{my: 2, color: 'white', display: 'block'}}>
                        filters
                    </Button>
                </Link>


            </Box>
        </>
    );

}

export default Header;