import {IProductModel} from "../../models/productsModel.ts";
import balance from "../../assets/icons/balance.svg"
import cart from "../../assets/icons/cart.svg"
import heart from "../../assets/icons/heart.svg"
import heartRed from "../../assets/icons/heartFillRed.svg"
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Badge, Rate} from "antd";
import {WishListService} from "../../services/wishListService.ts";
import formatPrice from "../../functions/formatPrice.ts";
import {useDispatch} from "react-redux";
import {addToComparison, removeFromComparison} from "../../store/actions/comparisonActions.ts";
import {ComparisonListService} from "../../services/comparisonService.ts";
import useBasket from "../../hooks/useBasket.ts";

interface ItemProps {
    item: IProductModel;
    forComparison?: boolean;
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const ProductCard: React.FC<ItemProps> = ({item, forComparison}) => {

    //const notify = () => toast('Wow so easy !');

    const dispatch = useDispatch();
    const [isWishList, setIsWishList] = useState(WishListService.checkId(item.id));
    const [isComparison, setIsComparison] = useState<boolean>(ComparisonListService.checkId(item.id));

    const {BasketFirstAdd} = useBasket();

    const WishListAdd = () => {
        WishListService.addId(item.id)
        setIsWishList(true); // Зміна стану відкриття/закриття
    };

    const WishListRemove = () => {
        WishListService.removeId(item.id)
        setIsWishList(false); // Зміна стану відкриття/закриття
    };

    const ComparisonListAdd = () => {
        dispatch(addToComparison(item.id));
        setIsComparison(ComparisonListService.checkId(item.id));
    };

    const ComparisonListRemove = () => {
        dispatch(removeFromComparison(item.id));
        setIsComparison(ComparisonListService.checkId(item.id));
    };

    return (
        <div
            className={`main-container flex ${forComparison ? ("w-full") : ("min-w-[250px] w-[286px]")}  p-[20px] flex-col items-start flex-nowrap bg-[#fff] mx-auto my-0`}>
            <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap">
                <div className="flex w-[129px] flex-col gap-[16px] items-start shrink-0 flex-nowrap">
                    <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap">
                        <button
                            className="flex w-[93px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] border-none pointer">
                            <div
                                className="w-[85px] shrink-0 font-['Inter'] text-[10px] font-normal leading-[10px] text-center whitespace-nowrap">
                <span
                    className="font-['Inter'] text-[10px] font-normal leading-[10px] text-[#fff] text-center uppercase">
                  Найкраща ціна
                </span>
                            </div>
                        </button>
                        {item.discount! > 0 ?
                            <button
                                className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#e11515] border-none pointer">
              <span
                  className="flex w-[24px] h-[7px] justify-center items-center shrink-0 font-['Inter'] text-[10px] font-normal leading-[10px] text-[#fff] text-center uppercase whitespace-nowrap">
                -{Math.round(item.discount! / (item.price / 100))}%
              </span>
                            </button>
                            :
                            ""
                        }
                    </div>
                    <div
                        className="flex w-[59px] h-[7px] gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff]">
            <span
                className="flex w-[59px] h-[7px] items-center shrink-0 font-['Inter'] text-[10px] font-normal leading-[7px] text-[#3b3b3b] text-right whitespace-nowrap">
              Код: {item.id}
            </span>
                    </div>
                </div>
                <div className="flex w-[32px] flex-col gap-[4px] items-start shrink-0 flex-nowrap">

                    {isComparison ? (
                        <Badge count={"✓"} size={"small"} color={"green"}>
                            <button type={"button"} className="flex w-[32px] items-start shrink-0 flex-nowrap"
                                    onClick={ComparisonListRemove}>
                                <div
                                    className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border-[0.5px] border-[#3b3b3b]">
                                    <div
                                        className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                        {/*className="w-[23px] h-[20px] bg-cover bg-no-repeat shrink-0 overflow-hidden z-[12]" style={{backgroundImage:`url(${balance})`}}>*/}
                                        {/*className="w-[24px] h-[24px] shrink-0 bg-[url(./assets/icons/balance.svg)] bg-cover bg-no-repeat overflow-hidden z-[12]">*/}
                                        <img src={balance}/>
                                    </div>

                                </div>
                            </button>
                        </Badge>
                    ) : (
                        <button type={"button"} className="flex w-[32px] items-start shrink-0 flex-nowrap"
                                onClick={ComparisonListAdd}>
                            <div
                                className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border-[0.5px] border-[#3b3b3b]">
                                <div
                                    className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                    <img src={balance}/>
                                </div>

                            </div>
                        </button>
                    )}


                    <button type="button" className="flex w-[32px] flex-col items-start shrink-0 flex-nowrap"
                            onClick={isWishList ? WishListRemove : WishListAdd}>
                        <div
                            className="flex h-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border-[0.5px] border-[#3b3b3b] overflow-hidden">
                            <div
                                // className="w-[24px] h-[24px] shrink-0">
                                className="w-[24px] h-[24px] bg-cover bg-no-repeat shrink-0 overflow-hidden">
                                {isWishList ? <img src={heartRed}/> : <img src={heart}/>}
                                {/*<img src={heart}/>*/}
                            </div>
                        </div>
                    </button>

                </div>
            </div>
            <div className="flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap">
                <Link to={`/product-page/${item.id}`}>
                    <div
                        //className={`w-[220px] h-[220px] shrink-0 bg-[url(${uploadings + "400_" + item.images[0]?.name})] bg-cover bg-no-repeat `}>
                        className={`w-[220px] h-[220px] shrink-0 w-fit h-fit`}>
                        <img src={`${uploadings + "400_" + item.images![0]?.name}`} alt="no image" className={"object-contain w-[220px] h-[220px]"}/>
                    </div>
                </Link>
                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                    <div
                        className="flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
            <span
                className="flex w-[203px] h-[26px] justify-start items-center shrink-0 font-['Inter'] text-[14px] font-normal leading-[26px] text-[#3b3b3b] text-left">
                {item.title}
            </span>
                    </div>
                    <div
                        className="flex flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap">
                        <div
                            className="flex gap-[4px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
                            <div className="flex gap-[4px] items-start shrink-0 flex-nowrap">
                                <Rate disabled defaultValue={item.averageRating}/>
                            </div>
                            <div className="flex w-[46px] gap-[4px] items-start shrink-0 flex-nowrap">
                <span
                    className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[10px] font-light leading-[20px] text-[#3b3b3b] text-left whitespace-nowrap">
                  _ відгуків
                </span>
                            </div>
                        </div>

                        <div
                            className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
                            {item.discount! > 0 ?
                                <div
                                    className="flex w-[66px] flex-col gap-[9px] items-start shrink-0 flex-nowrap">
                                <span
                                    className="h-[9px] shrink-0 font-['Inter'] text-[12px] font-medium leading-[9px] text-[#3b3b3b] text-left whitespace-nowrap line-through">
                                {formatPrice(item.price)}₴
                                </span>
                                    <span
                                        className="flex w-[67px] h-[12px] items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-semibold leading-[12px] text-[#e11515] text-center whitespace-nowrap">
                                    {formatPrice(item.price - item.discount!)}₴
                                </span>
                                </div>
                                : <div
                                    className="flex w-[66px] flex-col gap-[9px] items-start shrink-0 flex-nowrap">
                <span
                    className="flex w-[68px] h-[12px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-semibold leading-[12px] text-[#3b3b3b] text-center whitespace-nowrap">
                  {formatPrice(item.price)}₴
                </span>
                                </div>
                            }
                            <div>
                                <button type={"button"} onClick={() => BasketFirstAdd(item)}>

                                    <div
                                        className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border-2 border-[#9cc319]">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                            <img src={cart}/>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;