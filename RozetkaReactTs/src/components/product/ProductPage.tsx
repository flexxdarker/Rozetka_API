import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import ImageSliderProductImages from "../other/ImageSliderProductImages.tsx";
import {Rate} from "antd";
import formatPrice from "../../functions/formatPrice.ts";
import balance from "../../assets/icons/balance.svg"
import heart from "../../assets/icons/heart.svg"
import heartRed from "../../assets/icons/heartFillRed.svg"
import cartWhite from "../../assets/icons/cart-white.svg"
import {useDispatch} from "react-redux";
import {WishListService} from "../../services/wishListService.ts";
import {BasketService} from "../../services/basketService.ts";
import {incrementTotalPrice} from "../../store/actions/basketActions.ts";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;


const ProductPage: React.FC = () => {


    const params = useParams();

    const [product, setProduct] = useState<IProductModel | undefined>(); // Start with null or a loading state

    const dispatch = useDispatch();
    const [isWishList, setIsWishList] = useState<boolean>();

    const WishListAdd = () => {
            WishListService.addId(product!.id)
            setIsWishList(true); // Зміна стану відкриття/закриття
    };

    const WishListRemove = () => {
        WishListService.removeId(product!.id)
        setIsWishList(false); // Зміна стану відкриття/закриття
    };

    const loadProduct = async () => {
        if (params.id) {
            const res = await ProductServices.getById(params.id);
            console.log(res);
            if (res.status === 200 && res.data != undefined) {
                setProduct(res.data);
                setIsWishList(WishListService.checkId(product!.id));
            }
        }
    }



    const images: string[] = Array.isArray(product?.images)
        ? product.images.map(image => `${uploadings}` + "1200_" + image.name)
        : [];
    console.log("image: ", images)

    useEffect(() => {
        loadProduct();

    }, []);

    useEffect(() => {
        if(product !== undefined) {
            setIsWishList(WishListService.checkId(product!.id));
            console.log("setIsWishList: ", setIsWishList);
        }
    }, [product]);

    return (
        <>
            {product == undefined ?
                <h1>Product Page {params.id}</h1>
                :
                <div className="flex flex-col">
                    <div className="flex w-[1552px] bg-[#fff] rounded-[8px] p-[50px] pt-[20px] pb-[20px] mb-[4px]">
                        <div className="flex gap-[50px]">
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Все про товар</span>
                            </div>
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Характеристики</span>
                            </div>
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Відгуки</span>
                            </div>
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Відео</span>
                            </div>
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Аксесуари</span>
                            </div>
                            <div className="p-[10px]">
                                <span
                                    className="font-['Inter'] text-[16px] font-normal text-[#000]">Опис</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col h-full">
                            <ImageSliderProductImages images={images}/>
                            <div
                                className="main-container grow flex w-[740px] pt-[24px] pr-[40px] pb-[24px] pl-[40px] gap-[40px] justify-center items-center flex-nowrap bg-[#fff] border-solid border-b border-b-[#f0f0f0] mx-auto my-0 mt-[4px]">
                                <span
                                    className="min-h-[75px] justify-start items-center grow shrink-0 basis-0 font-['Inter'] text-[13px] font-normal leading-[22px] text-[#000] text-left">
                                    {
                                        product.values?.map((value, index) => (
                                            <span key={index}>{value.filterName}/{value.valueName}</span>))
                                    }
                                </span>
                            </div>
                        </div>

                        {/*second col*/}
                        <div className="flex flex-col ml-[4px]">
                            <div
                                className="main-container flex w-[808px] p-[40px] flex-col gap-[48px] items-start flex-nowrap bg-[#fff] mx-auto my-0">
                                <div
                                    className="flex flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap">
                                        <div
                                            className="flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
            <span
                className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] text-left whitespace-nowrap">
              {product.title}
            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                                            <div
                                                className="flex w-[265px] gap-[12px] items-center shrink-0 flex-nowrap">
                                                <div
                                                    className="flex w-[176px] pt-[8px] pr-0 pb-[8px] pl-0 gap-[4px] items-start shrink-0 flex-nowrap">
                                                    <Rate disabled defaultValue={2}/>
                                                </div>
                                                <div
                                                    className="flex w-[77px] gap-[4px] items-start shrink-0 flex-nowrap">
                                                    {/*<span*/}
                                                    {/*    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">*/}
                                                    {/*  6 відгуків*/}
                                                    {/*</span>*/}
                                                </div>
                                            </div>
                                            <div
                                                className="flex w-[151px] h-[12px] gap-[10px] items-start shrink-0 flex-nowrap">
              <span
                  className="flex w-[151px] h-[12px] justify-end items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-right whitespace-nowrap">
                Код товару: {product.id}
              </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex w-[262px] flex-col gap-[32px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[197px] flex-col gap-[20px] items-start shrink-0 flex-nowrap">
                                            <div
                                                className="w-[197px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] relative text-left whitespace-nowrap">
              <span className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] text-left">
                Колір:
              </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#3b3b3b] text-left">
                {" "}
                                                    Lemon Green{" "}
              </span>
                                            </div>
                                            <div
                                                className="flex w-[143px] gap-[9px] items-center shrink-0 flex-nowrap">
                                                <div
                                                    className="w-[28px] h-[28px] shrink-0 bg-[url(../assets/images/5d66012f-f1d8-449f-9855-21f917005116.png)] bg-cover bg-no-repeat rounded-[50%] relative z-[25]"/>
                                                <div
                                                    className="w-[28px] h-[28px] shrink-0 bg-[url(../assets/images/2d743017-db00-45d2-908c-16099c147af4.png)] bg-cover bg-no-repeat rounded-[50%] relative z-[26]"/>
                                                <div
                                                    className="w-[28px] h-[28px] shrink-0 bg-[url(../assets/images/66070069-2877-4657-97a1-811095a9045a.png)] bg-cover bg-no-repeat rounded-[50%] relative z-[27]"/>
                                                <div
                                                    className="w-[32px] h-[32px] shrink-0 bg-[url(../assets/images/f8ea9142-3db0-4c7c-81f3-ff8db99f4aae.png)] bg-cover bg-no-repeat relative z-[28]"/>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-col gap-[20px] justify-center items-start self-stretch shrink-0 flex-nowrap">
                                            <div
                                                className="w-[262px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-left whitespace-nowrap">
              <span className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] text-left">
                Вбудована пам’ять:
              </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#3b3b3b] text-left">
                {" "}
                                                    256 ГБ{" "}
              </span>
                                            </div>
                                            <div
                                                className="flex w-[196px] gap-[24px] items-center shrink-0 flex-nowrap">
                                                <button
                                                    className="flex w-[84px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] pointer">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-light leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
                  512 ГБ
                </span>
                                                </button>
                                                <button
                                                    className="flex w-[88px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#3b3b3b] pointer">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
                  256 ГБ
                </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-[28px] items-start self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex justify-between items-end self-stretch shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[166px] flex-col gap-[20px] items-start shrink-0 flex-nowrap">
                                            <div
                                                className="flex w-[106px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px]">
              <span
                  className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#608a26] text-left whitespace-nowrap">
                Є в наявності
              </span>
                                            </div>
                                            {product.discount! > 0 ?
                                                <div
                                                    className="flex flex-col gap-[12px] justify-center items-start self-stretch shrink-0 flex-nowrap">
              <span
                  className="h-[15px] self-stretch shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap line-through">
                {formatPrice(product.price)} грн
              </span>
                                                    <span
                                                        className="flex w-[166px] h-[23px] shrink-0 basis-auto font-['Inter'] text-[32px] font-medium leading-[20px] text-[#e11515] text-center whitespace-nowrap">
                {formatPrice(product.price - product.discount!)} грн
              </span>
                                                </div>
                                                :
                                                <div
                                                    className="flex flex-col gap-[12px] self-stretch shrink-0 flex-nowrap">
                                                    <span
                                                        className="flex w-[166px] h-[23px] shrink-0 basis-auto font-['Inter'] text-[32px] font-medium leading-[20px] text-[#3b3b3b] text-center whitespace-nowrap">
                {formatPrice(product.price)} грн грн
              </span>
                                                </div>
                                            }
                                        </div>
                                        <div
                                            className="flex w-[120px] gap-[28px] items-end shrink-0 flex-nowrap">
                                            <button type="button" onClick={isWishList ? WishListRemove : WishListAdd}
                                                className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px]">
                                                <div
                                                    className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap">
                                                    <div
                                                        className="h-[24px] grow shrink-0 basis-0 overflow-hidden">
                                                        {isWishList ? <img src={heartRed}/> : <img src={heart}/>}
                                                    </div>
                                                </div>
                                            </button>
                                            <button
                                                className="flex w-[40px] h-[40px] flex-col justify-center items-center shrink-0 flex-nowrap">
                                                <div
                                                    className="flex h-[40px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[4px] overflow-hidden">
                                                    <div
                                                        className="w-[22.5px] h-[19.125px] shrink-0">
                                                        <img src={balance}/>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap">
                                        <div
                                            className="flex justify-between items-start self-stretch shrink-0 flex-nowrap">
                                            <button type={"button"} onClick={() => {
                                                if(!BasketService.checkId(product.id)) {
                                                    BasketService.addId(product.id);
                                                    dispatch(incrementTotalPrice(Number(formatPrice(product.price - product.discount!))));
                                                }}} className="flex w-[340px] h-[50px] pt-0 pr-[40px] pb-0 pl-[40px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
                                                <div
                                                    className="flex w-[44px] h-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                                    <div
                                                        className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                                        <img src={cartWhite}/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex w-[90px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                                <span
                                                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] text-left whitespace-nowrap">
                                                Купити
                                                </span>
                                                </div>
                                            </button>
                                            <button
                                                className="flex w-[340px] h-[50px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border-2 border-[#9cc319] pointer">
                                                <div
                                                    className="flex w-[350px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                                    <div
                                                        className="w-[208px] shrink-0 font-['Inter'] text-[14px] font-light leading-[26px] text-center">
                                                <span
                                                    className="font-['Inter'] text-[14px] font-normal leading-[16.8px] text-[#3b3b3b] text-center">
                                                Кредит або оплата частинами
                                                <br/>
                                                </span>
                                                        <span
                                                            className="font-['Inter'] text-[14px] font-medium leading-[16.8px] text-[#9cc319] text-center">
                                                від 1335 грн в місяць
                                                </span>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                        <div
                                            className="flex gap-[16px] items-center self-stretch shrink-0 flex-nowrap">
                                            <div
                                                className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap">
                                                <div
                                                    className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/628d66bd-7f27-435c-8225-76634fe1f2da.png)] bg-cover bg-no-repeat overflow-hidden"/>
                                            </div>
                                            <div
                                                className="w-[467px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-left whitespace-nowrap">
                                                <span
                                                    className="font-['Inter'] text-[16px] font-medium leading-[20px] text-[#3b3b3b] text-left">
                                                +500 бонусних ₴
                                                </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] text-left">
                                            {" "}
                                                    на рахунок у разі придбання цього товару{" "}
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*delivery info*/}
                            <div
                                className="main-container flex w-[808px] pt-[40px] pr-[28px] pb-[40px] pl-[28px] flex-col gap-[8px] items-start flex-nowrap bg-[#fff] mx-auto my-0 mt-[4px]">
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[264px] gap-[8px] justify-center items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[40px] h-[40px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                            <div
                                                className="w-[17.415px] h-[20px] shrink-0 bg-[url(../assets/images/3537509e-992f-4492-bbf0-fb108af2b044.png)] bg-[length:100%_100%] bg-no-repeat"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            Самовивіз з магазинів BuyZone
          </span>
                                    </div>
                                    <div
                                        className="flex w-[111px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            Безкоштовно
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[362px] gap-[8px] items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                                            <div
                                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/8b975302-2f0c-4ce7-89b3-0f654a820a37.png)] bg-cover bg-no-repeat overflow-hidden"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            Доставка кур’єром Нова Пошта, Meest Пошта
          </span>
                                    </div>
                                    <div
                                        className="flex w-[106px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            99₴ - 259₴
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[349px] gap-[8px] items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                                            <div
                                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/6c310935-7402-4bab-b95b-7fea23c559a1.png)] bg-cover bg-no-repeat overflow-hidden"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            Самовивіз з відділень поштових операторів
          </span>
                                    </div>
                                    <div
                                        className="flex w-[104px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            55₴ - 139₴
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex pt-[20px] pr-0 pb-[14px] pl-0 gap-[8px] items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/bbd3ded2-1630-406c-8ba4-cda9a0ed002c.png)] bg-cover bg-no-repeat overflow-hidden"/>
                                    </div>
                                    <div
                                        className="flex w-[656px] gap-[10px] justify-center items-end shrink-0 flex-nowrap">
          <span
              className="flex w-[656px] h-[30px] justify-start items-center grow shrink-0 basis-0 font-['Inter'] text-[14px] font-normal leading-[30px] text-[#3b3b3b] text-left whitespace-nowrap">
            Оплата під час отримання товару. Оплата карткою у відділенні, Apple
            Pay, карткою онлайн, <br/>
            Google Pay. Безготівкова для юридичних осіб, Безготівкова для
            фізичних осіб, Mastercard, Visa.
          </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                    <h1>Product Page {params.id}</h1>
                    <h1>Product Page {product.id}</h1>
                </div>
            }
        </>
    )
}

export default ProductPage;