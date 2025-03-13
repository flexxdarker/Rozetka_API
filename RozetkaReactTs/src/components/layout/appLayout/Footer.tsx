import React from 'react';
// import { Layout as LayoutAntd } from 'antd';
// const { Footer: FooterAntd } = LayoutAntd;
import {Grid} from "@mui/joy";
import Stack from '@mui/material/Stack';
// import LinkMui from "@mui/material/Link";
import { Link } from 'react-router-dom';





const Footer: React.FC = () => {

    return (
        <>
            {/*<Grid*/}
            {/*    container*/}
            {/*    spacing={0}*/}
            {/*    columns={4}*/}
            {/*    // direction="column"*/}
            {/*    alignItems="center"*/}
            {/*    justifyContent="center"*/}
            {/*    sx={{minHeight: '10vh'}}*/}
            {/*>*/}
            {/*        <Stack style={{minWidth: '20%'}}>*/}
            {/*            <h3 style={{textAlign: "center"}}>Company information</h3>*/}
            {/*            <Link to="about-us">About us</Link>*/}
            {/*            <Link to="contacts">Contacts</Link>*/}
            {/*            /!*<LinkMui href="/aboutus">22</LinkMui>*!/*/}
            {/*        </Stack>*/}

            {/*        <Stack style={{minWidth: '20%'}}>*/}
            {/*            <h3 style={{textAlign: "center"}}>Help</h3>*/}
            {/*            <Link to="delivery-and-payment">Delivery and payment</Link>*/}
            {/*            <Link to="return-of-goods">Return of goods</Link>*/}
            {/*        </Stack>*/}

            {/*        <Stack style={{minWidth: '20%'}}>*/}
            {/*            <h3 style={{textAlign: "center"}}>Services</h3>*/}
            {/*            <Link to="for-corporate-client">For corporate client</Link>*/}
            {/*        </Stack>*/}

            {/*        <Stack style={{minWidth: '20%'}}>*/}
            {/*            <h3 style={{textAlign: "center"}}>For partners</h3>*/}
            {/*            <Link to="franchising">Franchising</Link>*/}
            {/*        </Stack>*/}
            {/*</Grid>*/}

            <div
                className="main-container flex w-[1920px] h-[380px] pt-[40px] pr-[180px] pb-[40px] pl-[180px] gap-[50px] items-center flex-nowrap relative mx-auto my-0 bg-gradient-to-b from-[#000] to-[#381753]">
                <div
                    className="flex w-[320px] pt-0 pr-0 pb-[20px] pl-0 flex-col gap-[40px] justify-center items-start shrink-0 flex-nowrap relative">
                    <div
                        className="w-[120px] h-[76.802px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/db3e7727-229f-465b-9a9c-30179f7961a8.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[1]"/>
                    <div
                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] flex-col gap-[26px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span
              className="h-[15px] self-stretch shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[3]">
            Ми в соціальних мережах
          </span>
                        <div
                            className="flex w-[249px] gap-[20px] justify-center items-center shrink-0 flex-nowrap relative z-[4]">
                            <div
                                className="w-[32px] h-[32px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/c625e40b-a5d6-416e-b72d-371d23ae2e29.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[5]"/>
                            <div
                                className="w-[32px] h-[32px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/5d328386-c960-4bea-8f44-c6fd283a4ae7.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[6]"/>
                            <div
                                className="w-[32px] h-[32px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/899b217f-1a51-424e-9730-86e43b7a902e.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[7]"/>
                            <div
                                className="w-[32px] h-[32px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/4ead6e6b-e39d-4b54-bdf0-ec52bc459b39.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[8]"/>
                            <div
                                className="w-[32px] h-[32px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-13/22391cd4-efee-45dc-8925-0aa818069b36.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[9]"/>
                        </div>
                    </div>
                </div>
                <div
                    className="flex w-[1219px] pt-[40px] pr-0 pb-[40px] pl-0 gap-[20px] items-start shrink-0 flex-nowrap relative z-10">

                    <div className="flex w-[320px] flex-col items-start shrink-0 flex-nowrap relative z-[11]">
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[12]">
                            <div
                                className="w-[192px] shrink-0 font-['Inter'] text-[24px] font-semibold leading-[58px] relative text-left z-[13]">
              <span
                  className="font-['Inter'] text-[24px] font-semibold leading-[29.045px] text-[#fff] relative text-left">
                Інфор
              </span>
                                <span
                                    className="font-['Inter'] text-[24px] font-semibold leading-[29.045px] text-[#fff] relative text-left">
                маці
              </span>
                                <span
                                    className="font-['Inter'] text-[24px] font-semibold leading-[29.045px] text-[#fff] relative text-left">
                я про <br/>
                компанію
              </span>
                            </div>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[14]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[15]">
              Про нас
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[16]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[17]">
              Умови використання сайту
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[18]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[19]">
              Контакти
            </span>
                        </div>
                    </div>
                    <div className="flex w-[320px] flex-col items-start shrink-0 flex-nowrap relative z-20">
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[21]">
            <span
                className="h-[29px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[29px] text-[#fff] relative text-left whitespace-nowrap z-[22]">
              Допомога
            </span>
                        </div>
                        <div className="flex w-[320px] items-start shrink-0 flex-nowrap relative z-[23]">
                            <div
                                className="flex w-[320px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[24]">
              <span
                  className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[25]">
                Доставка та оплата
              </span>
                            </div>
                        </div>
                        <div className="flex w-[320px] items-start shrink-0 flex-nowrap relative z-[26]">
                            <div
                                className="flex w-[320px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[27]">
              <span
                  className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[28]">
                Гарантія
              </span>
                            </div>
                        </div>
                        <div className="flex w-[320px] items-start shrink-0 flex-nowrap relative z-[29]">
                            <div
                                className="flex w-[320px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-30">
              <span
                  className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[31]">
                Повернення товару
              </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[320px] flex-col items-start shrink-0 flex-nowrap relative z-[32]">
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[33]">
            <span
                className="h-[29px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[29px] text-[#fff] relative text-left whitespace-nowrap z-[34]">
              Сервіси
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[35]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[36]">
              Бонусний рахунок
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[38]">
              Подарункові сертифікати
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[39]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-40">
              Співпраця з нами
            </span>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[41]">
            <span
                className="h-[24px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[42]">
              Сервісні центри
            </span>
                        </div>
                    </div>
                    <div
                        className="flex w-[199px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative z-[43]">
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[44]">
                            <div
                                className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]">
              <span
                  className="h-[29px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[29px] text-[#fff] relative text-left whitespace-nowrap z-[46]">
                Контакти
              </span>
                            </div>
                            <div
                                className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[47]">
              <span
                  className="h-[29px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[29px] text-[#fff] relative text-left whitespace-nowrap z-[48]">
                0 800 555 678
              </span>
                            </div>
                            <div
                                className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[49]">
              <span
                  className="flex w-[174px] h-[30px] justify-start items-center shrink-0 font-['Inter'] text-[12px] font-normal leading-[14.523px] text-[#fff] relative text-left overflow-hidden z-50">
                безкоштовно з усіх номерів <br/>з 09.00 до 20.00 без вихідних
              </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Footer;