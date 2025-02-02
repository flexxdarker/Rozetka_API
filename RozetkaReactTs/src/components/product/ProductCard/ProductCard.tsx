// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import {IProductModel} from "../../../models/productsModel.ts";
import balance from "../../../assets/icons/balance.svg"
import heart from "../../../assets/icons/heart.svg"
import cart from "../../../assets/icons/cart.svg"
// import "../ProductCard/ProductCard.css"

//import Typography from '../assets/contemplative-reptile.jpg';


const ProductCard = (props: { item: IProductModel }) => {

    const {item} = props;

    return (

        <div
            className="main-container flex w-[286px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
            <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative">
                <div className="flex w-[129px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
                        <button
                            className="flex w-[93px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] border-none relative z-[3] pointer">
                            <div
                                className="w-[85px] shrink-0 font-['Inter'] text-[10px] font-normal leading-[10px] relative text-center whitespace-nowrap z-[4]">
                <span
                    className="font-['Inter'] text-[10px] font-normal leading-[10px] text-[#fff] relative text-center uppercase">
                  Найкраща ціна
                </span>
                            </div>
                        </button>
                        {item.discount > 0 ?
                        <button
                            className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#e11515] border-none relative z-[5] pointer">
              <span
                  className="flex w-[24px] h-[7px] justify-center items-center shrink-0 font-['Inter'] text-[10px] font-normal leading-[10px] text-[#fff] relative text-center uppercase whitespace-nowrap z-[6]">
                -{Math.round(item.discount/(item.price/100))}%
              </span>
                        </button>
                            :
                            ""
                        }
                    </div>
                    <div
                        className="flex w-[59px] h-[7px] gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] relative z-[7]">
            <span
                className="flex w-[59px] h-[7px] items-center shrink-0 font-['Inter'] text-[10px] font-normal leading-[7px] text-[#3b3b3b] relative text-right whitespace-nowrap z-[8]">
              Код: {item.id}
            </span>
                    </div>
                </div>
                <div className="flex w-[32px] flex-col gap-[4px] items-start shrink-0 flex-nowrap relative z-[9]">
                    <div className="flex w-[32px] items-start shrink-0 flex-nowrap relative z-10">
                        <div
                            className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border-[0.5px] border-[#3b3b3b] relative z-[11]">
                            <div
                                className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[12]">
                                {/*className="w-[24px] h-[24px] shrink-0 bg-[url(./assets/icons/balance.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[12]">*/}
                                <img src={balance}/>
                            </div>

                        </div>
                    </div>
                    <div className="flex w-[32px] flex-col items-start shrink-0 flex-nowrap relative z-[13]">
                        <div
                            className="flex h-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border-[0.5px] border-[#3b3b3b] relative overflow-hidden z-[14]">
                            <div
                                className="w-[24px] h-[24px] shrink-0 relative z-[15]">
                                <img src={heart}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[16]">
                <div
                    className="w-[220px] h-[220px] shrink-0 relative z-[17] bg-[url(./assets/69_4000.png)] bg-cover bg-no-repeat ">
                    {/*<img src={cart}/>*/}
                </div>
                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[18]">
                    <div
                        className="flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[19]">
            <span
                className="flex w-[203px] h-[26px] justify-start items-center shrink-0 font-['Inter'] text-[14px] font-normal leading-[26px] text-[#3b3b3b] relative text-left z-20">
              {/*Ноутбук DREAM MACHINES*/}
                {/*<br/>*/}
                {/*RG2050-15 (RG2050-15UA30)*/}
                {item.title}
            </span>
                    </div>
                    <div
                        className="flex flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap relative z-[21]">
                        <div
                            className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[22]">
                            <div className="flex w-[96px] gap-[4px] items-start shrink-0 flex-nowrap relative z-[23]">
                                <div className="w-[16px] h-[16px] shrink-0 relative z-[24]">
                                    <div
                                        className="w-full h-full bg-[url(../assets/images/e5ff0844-291d-4c1c-813c-bf3a1331d1fa.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[25]"/>
                                </div>
                                <div className="w-[16px] h-[16px] shrink-0 relative z-[26]">
                                    <div
                                        className="w-full h-full bg-[url(../assets/images/85051587-2fff-45f7-8b82-9c38bc07b82b.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[27]"/>
                                </div>
                                <div className="w-[16px] h-[16px] shrink-0 relative z-[28]">
                                    <div
                                        className="w-full h-full bg-[url(../assets/images/721e8328-4d88-4057-9408-b49018fbe8e4.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[29]"/>
                                </div>
                                <div className="w-[16px] h-[16px] shrink-0 relative z-30">
                                    <div
                                        className="w-full h-full bg-[url(../assets/images/4345f84a-48d2-4c08-9e47-470beb81e624.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[31]"/>
                                </div>
                                <div className="w-[16px] h-[16px] shrink-0 relative z-[32]">
                                    <div
                                        className="w-full h-full bg-[url(../assets/images/0edfdb70-89df-4dcd-9173-902df5e1d7fc.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[33]"/>
                                </div>
                            </div>
                            <div className="flex w-[46px] gap-[4px] items-start shrink-0 flex-nowrap relative z-[34]">
                <span
                    className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[10px] font-light leading-[20px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[35]">
                  9 відгуків
                </span>
                            </div>
                        </div>

                        <div
                            className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[36]">
                            {item.discount > 0 ?
                                <div
                                    className="flex w-[66px] flex-col gap-[9px] items-start shrink-0 flex-nowrap relative z-[37]">
                                <span
                                    className="h-[9px] shrink-0 font-['Inter'] text-[12px] font-medium leading-[9px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[38] line-through">
                                {item.price}₴
                                </span>
                                    <span
                                        className="flex w-[67px] h-[12px] items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-semibold leading-[12px] text-[#e11515] relative text-center whitespace-nowrap z-[39]">
                                    {item.price-item.discount}₴
                                </span>
                                </div>
                                : <div
                                    className="flex w-[66px] flex-col gap-[9px] items-start shrink-0 flex-nowrap relative z-[35]">
                <span
                    className="flex w-[68px] h-[12px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-semibold leading-[12px] text-[#3b3b3b] relative text-center whitespace-nowrap z-[36]">
                  {item.price}₴
                </span>
                                </div>
                            }
                            <div
                                className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border-2 border-[#9cc319] relative z-40">
                                <div
                                    className="w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[41] bg-[url(./assets/icons/cart.svg)] bg-cover bg-no-repeat ">
                                    {/*<img src={cart} className="bg-cover"/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="cardBox">
        //     <div className="card-head">
        //         <div className="card-title">
        //             <div className="card-special-offer">
        //                 <div className="title-special-offer">
        //                     <div className="typography">
        //                         <span>Акція</span>
        //                     </div>
        //                 </div>
        //
        //                 <div className="value-special-offer">
        //                     <div className="typography">
        //                         10%
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <div className="card-id">
        //                 <div className="typography">Код: {item.id}</div>
        //             </div>
        //         </div>
        //
        //         <div className="icon-box">
        //             <img src={heart} alt="heart"/>
        //             <img src={balance} alt="balance"/>
        //         </div>
        //     </div>
        // </div>

        // <div className="main-container">
        //     <div className="frame">
        //         <div className="frame-1">
        //             <div className="frame-2">
        //                 <button className="button-frame">
        //                     <div className="best-price">
        //                         <span className="best-price-3">Н</span>
        //                         <span className="best-price-4">айкраща ціна</span>
        //                     </div>
        //                 </button>
        //                 <button className="red-rectangle">
        //                     <span className="minus-twelve-percent">-12%</span>
        //                 </button>
        //             </div>
        //             <div className="frame-5">
        //                 <span className="code-597169">Код: 597169</span>
        //             </div>
        //         </div>
        //         <div className="frame-6">
        //             <div className="ic-like">
        //                 <div className="frame-7">
        //                     <div className="heart"/>
        //                 </div>
        //             </div>
        //             <div className="ic-balance">
        //                 <div className="cil-balance-scale">
        //                     <div className="group"/>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="frame-8">
        //         <div className="default"/>
        //         <div className="frame-9">
        //             <div className="frame-a">
        //     <span className="notebook-dream-machines">
        //       Ноутбук DREAM MACHINES
        //       <br/>
        //       RG2050-15 (RG2050-15UA30)
        //     </span>
        //             </div>
        //             <div className="frame-b">
        //                 <div className="rating-read-only">
        //                     <div className="rating-interactive">
        //                         <div className="rating-star">
        //                             <div className="full"/>
        //                         </div>
        //                         <div className="rating-star-c">
        //                             <div className="full-d"/>
        //                         </div>
        //                         <div className="rating-star-e">
        //                             <div className="full-f"/>
        //                         </div>
        //                         <div className="rating-star-10">
        //                             <div className="full-11"/>
        //                         </div>
        //                         <div className="rating-star-12">
        //                             <div className="full-13"/>
        //                         </div>
        //                     </div>
        //                     <div className="note">
        //                         <span className="reviews">9 відгуків</span>
        //                     </div>
        //                 </div>
        //                 <div className="frame-14">
        //                     <div className="frame-15">
        //                         <span className="price-1">32 999₴</span>
        //                         <span className="price-2">28 999₴</span>
        //                     </div>
        //                     <div className="btn-basket-small">
        //                         <div className="cart"/>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        // <Card sx={{ maxWidth: 345 }} style={{ margin: '20px' }}>
        //     <CardMedia
        //         component="img"
        //         alt="green iguana"
        //         height="140"
        //         image="../static/images/cards/contemplative-reptile.jpg"
        //     />
        //     <CardContent>
        //         <Typography gutterBottom variant="h5" component="div">
        //             Lizard
        //         </Typography>
        //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //             Lizards are a widespread group of squamate reptiles, with over 6,000
        //             species, ranging across all continents except Antarctica
        //         </Typography>
        //     </CardContent>
        //     <CardActions>
        //         <Button size="small">Share</Button>
        //         <Button size="small">Learn More</Button>
        //     </CardActions>
        // </Card>
    );
};

export default ProductCard;
