import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import ImageSliderProductImages from "../other/ImageSliderProductImages.tsx";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;


const ProductPage: React.FC = () => {


    const params = useParams();

    const [product, setProduct] = useState<IProductModel | undefined>(); // Start with null or a loading state

    const loadProduct = async() => {
        if(params.id) {
            const res = await ProductServices.getById(params.id);
            console.log(res);
            if(res.status === 200 && res.data != undefined){
                setProduct(res.data);
            }
        }
    }

    const images: string[] = Array.isArray(product?.images)
        ? product.images.map(image => `${uploadings}`+ "1200_" + image.name)
        : [];
console.log("image: ", images)

    useEffect(() => {
        loadProduct();
        },[]);

    return(
        <>
            {product == undefined ?
                <h1>Product Page {params.id}</h1>
                    :
                <div className="flex-col">
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
                        <div className="flex-col">
                            <ImageSliderProductImages images={images}/>
                            <div
                                className="main-container flex w-[740px] pt-[24px] pr-[40px] pb-[24px] pl-[40px] gap-[40px] justify-center items-center flex-nowrap bg-[#fff] border-solid border-b border-b-[#f0f0f0] mx-auto my-0 mt-[4px]">
                                <div
                                    className="w-[48px] h-[48px] shrink-0 bg-[url(../assets/images/a447b99685eefdf3420ee24977a467af0fe17eff.png)] bg-cover bg-no-repeat"/>
                                <span
                                    className="flex w-[572px] h-[75px] justify-start items-center grow shrink-0 basis-0 font-['Inter'] text-[13px] font-normal leading-[22px] text-[#000] text-left">
        Екран (6.67", AMOLED, 2712x1220) / MediaTek Dimensity 8300 <br/>
        Ultra (1 x 3.35 ГГц + 3 x 3.2 ГГц + 4 x 2.2 ГГц) / потрійна основна
        камера: <br/>
        50 Мп + 50 Мп + 12 Мп, фронтальна 32 Мп / RAM 12 ГБ / 256 ГБ вбудованої
        пам'яті / <br/>
        3G / LTE / 5G / GPS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 /
        5000 мА*год
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
              Смартфон Xiaomi 14T 12/256 GB Lemon Green
            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[4]">
                                            <div
                                                className="flex w-[265px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[5]">
                                                <div
                                                    className="flex w-[176px] pt-[8px] pr-0 pb-[8px] pl-0 gap-[4px] items-start shrink-0 flex-nowrap relative z-[6]">
                                                    <div className="w-[32px] h-[32px] shrink-0 relative z-[7]">
                                                        <div
                                                            className="w-full h-full bg-[url(../assets/images/e372cfc8-5991-41a3-bb03-0537ac51d8fe.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[8]"/>
                                                    </div>
                                                    <div className="w-[32px] h-[32px] shrink-0 relative z-[9]">
                                                        <div
                                                            className="w-full h-full bg-[url(../assets/images/2b07bad3-0cea-433f-904d-d2b2f3e941ec.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-10"/>
                                                    </div>
                                                    <div className="w-[32px] h-[32px] shrink-0 relative z-[11]">
                                                        <div
                                                            className="w-full h-full bg-[url(../assets/images/b39fc46b-3270-488b-bf06-ac460a6d7f29.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[12]"/>
                                                    </div>
                                                    <div className="w-[32px] h-[32px] shrink-0 relative z-[13]">
                                                        <div
                                                            className="w-full h-full bg-[url(../assets/images/12b327d9-4ad3-4427-bc8a-6acdc65218af.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[14]"/>
                                                    </div>
                                                    <div className="w-[32px] h-[32px] shrink-0 relative z-[15]">
                                                        <div
                                                            className="w-full h-full bg-[url(../assets/images/9171c875-55b4-4822-9582-5aa64b4c9926.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[16]"/>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex w-[77px] gap-[4px] items-start shrink-0 flex-nowrap relative z-[17]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[18]">
                  6 відгуків
                </span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex w-[151px] h-[12px] gap-[10px] items-start shrink-0 flex-nowrap relative z-[19]">
              <span
                  className="flex w-[151px] h-[12px] justify-end items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-right whitespace-nowrap z-20">
                Код товару: 621516
              </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex w-[262px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative z-[21]">
                                        <div
                                            className="flex w-[197px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative z-[22]">
                                            <div
                                                className="w-[197px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] relative text-left whitespace-nowrap z-[23]">
              <span className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] relative text-left">
                Колір:
              </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#3b3b3b] relative text-left">
                {" "}
                                                    Lemon Green{" "}
              </span>
                                            </div>
                                            <div
                                                className="flex w-[143px] gap-[9px] items-center shrink-0 flex-nowrap relative z-[24]">
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
                                            className="flex flex-col gap-[20px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[29]">
                                            <div
                                                className="w-[262px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] relative text-left whitespace-nowrap z-30">
              <span className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] relative text-left">
                Вбудована пам’ять:
              </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#3b3b3b] relative text-left">
                {" "}
                                                    256 ГБ{" "}
              </span>
                                            </div>
                                            <div
                                                className="flex w-[196px] gap-[24px] items-center shrink-0 flex-nowrap relative z-[31]">
                                                <button
                                                    className="flex w-[84px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[32] pointer">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-light leading-[15px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[33]">
                  512 ГБ
                </span>
                                                </button>
                                                <button
                                                    className="flex w-[88px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#3b3b3b] relative z-[34] pointer">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[35]">
                  256 ГБ
                </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-[28px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]">
                                    <div
                                        className="flex justify-between items-end self-stretch shrink-0 flex-nowrap relative z-[37]">
                                        <div
                                            className="flex w-[166px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative z-[38]">
                                            <div
                                                className="flex w-[106px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[39]">
              <span
                  className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#608a26] relative text-left whitespace-nowrap z-40">
                Є в наявності
              </span>
                                            </div>
                                            <div
                                                className="flex flex-col gap-[12px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[41]">
              <span
                  className="h-[15px] self-stretch shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[42]">
                25 999 грн
              </span>
                                                <span
                                                    className="flex w-[166px] h-[23px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[32px] font-medium leading-[20px] text-[#e11515] relative text-center whitespace-nowrap z-[43]">
                21 999 грн
              </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex w-[120px] gap-[28px] items-end shrink-0 flex-nowrap relative z-[44]">
                                            <div
                                                className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[45]">
                                                <div
                                                    className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[46]">
                                                    <div
                                                        className="h-[24px] grow shrink-0 basis-0 bg-[url(../assets/images/245d9d06-891d-4ace-a1d2-287cabc60ca6.png)] bg-cover bg-no-repeat relative overflow-hidden z-[47]"/>
                                                </div>
                                            </div>
                                            <div
                                                className="flex w-[40px] h-[40px] flex-col justify-center items-center shrink-0 flex-nowrap relative z-[48]">
                                                <div
                                                    className="flex h-[40px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative overflow-hidden z-[49]">
                                                    <div
                                                        className="w-[22.5px] h-[19.125px] shrink-0 bg-[url(../assets/images/8c1994ec-5437-40f7-8840-e0ae1094acaf.png)] bg-[length:100%_100%] bg-no-repeat relative z-50"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap relative z-[51]">
                                        <div
                                            className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[52]">
                                            <button
                                                className="flex w-[340px] h-[50px] pt-0 pr-[40px] pb-0 pl-[40px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[53] pointer">
                                                <div
                                                    className="flex w-[44px] h-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[54]">
                                                    <div
                                                        className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/20b40ac1-7ce2-4da6-95ae-a83a20a56064.png)] bg-cover bg-no-repeat relative overflow-hidden z-[55]"/>
                                                </div>
                                                <div
                                                    className="flex w-[90px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[56]">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[57]">
                  Купити
                </span>
                                                </div>
                                            </button>
                                            <button
                                                className="flex w-[340px] h-[50px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border-2 border-[#9cc319] relative z-[58] pointer">
                                                <div
                                                    className="flex w-[350px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[59]">
                                                    <div
                                                        className="w-[208px] shrink-0 font-['Inter'] text-[14px] font-light leading-[26px] relative text-center z-[60]">
                  <span
                      className="font-['Inter'] text-[14px] font-normal leading-[16.8px] text-[#3b3b3b] relative text-center">
                    Кредит або оплата частинами
                    <br/>
                  </span>
                                                        <span
                                                            className="font-['Inter'] text-[14px] font-medium leading-[16.8px] text-[#9cc319] relative text-center">
                    від 1335 грн в місяць
                  </span>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                        <div
                                            className="flex gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[61]">
                                            <div
                                                className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[62]">
                                                <div
                                                    className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/628d66bd-7f27-435c-8225-76634fe1f2da.png)] bg-cover bg-no-repeat relative overflow-hidden z-[63]"/>
                                            </div>
                                            <div
                                                className="w-[467px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] relative text-left whitespace-nowrap z-[64]">
              <span className="font-['Inter'] text-[16px] font-medium leading-[20px] text-[#3b3b3b] relative text-left">
                +500 бонусних ₴
              </span>
                                                <span
                                                    className="font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] relative text-left">
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
                                className="main-container flex w-[808px] pt-[40px] pr-[28px] pb-[40px] pl-[28px] flex-col gap-[8px] items-start flex-nowrap bg-[#fff] relative mx-auto my-0 mt-[4px]">
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative">
                                    <div
                                        className="flex w-[264px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative z-[1]">
                                        <div
                                            className="flex w-[40px] h-[40px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[2]">
                                            <div
                                                className="w-[17.415px] h-[20px] shrink-0 bg-[url(../assets/images/3537509e-992f-4492-bbf0-fb108af2b044.png)] bg-[length:100%_100%] bg-no-repeat relative z-[3]"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[4]">
            Самовивіз з магазинів BuyZone
          </span>
                                    </div>
                                    <div
                                        className="flex w-[111px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[5]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[6]">
            Безкоштовно
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[7]">
                                    <div
                                        className="flex w-[362px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[8]">
                                        <div
                                            className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[9]">
                                            <div
                                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/8b975302-2f0c-4ce7-89b3-0f654a820a37.png)] bg-cover bg-no-repeat relative overflow-hidden z-10"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[11]">
            Доставка кур’єром Нова Пошта, Meest Пошта
          </span>
                                    </div>
                                    <div
                                        className="flex w-[106px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[12]">
          <span
              className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[13]">
            99₴ - 259₴
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[14]">
                                    <div
                                        className="flex w-[349px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[15]">
                                        <div
                                            className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[16]">
                                            <div
                                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/6c310935-7402-4bab-b95b-7fea23c559a1.png)] bg-cover bg-no-repeat relative overflow-hidden z-[17]"/>
                                        </div>
                                        <span
                                            className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[18]">
            Самовивіз з відділень поштових операторів
          </span>
                                    </div>
                                    <div
                                        className="flex w-[104px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[19]">
          <span
              className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-20">
            55₴ - 139₴
          </span>
                                    </div>
                                </div>
                                <div
                                    className="flex pt-[20px] pr-0 pb-[14px] pl-0 gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[21]">
                                    <div
                                        className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-start shrink-0 flex-nowrap relative z-[22]">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/bbd3ded2-1630-406c-8ba4-cda9a0ed002c.png)] bg-cover bg-no-repeat relative overflow-hidden z-[23]"/>
                                    </div>
                                    <div
                                        className="flex w-[656px] gap-[10px] justify-center items-end shrink-0 flex-nowrap relative z-[24]">
          <span
              className="flex w-[656px] h-[30px] justify-start items-center grow shrink-0 basis-0 font-['Inter'] text-[14px] font-normal leading-[30px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[25]">
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