import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {Link} from "react-router-dom";
import {TokenService} from "../../services/tokenService.ts";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const ComparisonListItem: React.FC<{ products: IProductModel[] }> = ({products}) => {

    const [isLogin, setIsLogin] = useState<boolean>(TokenService.isExists());

    useEffect(() => {
        const res = TokenService.isExists();
        setIsLogin(res);
    }, []);

    return (
        <div
            className="main-container flex w-full flex-col gap-[2px] items-start flex-nowrap mx-auto my-0">
            <div
                className="flex pt-[20px] pr-[20px] pb-[20px] pl-[20px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
                <div
                    className="w-[154px] shrink-0 font-['Inter'] text-[20px] font-medium leading-[36px] text-left">
          <span className="font-['Inter'] text-[16px] font-medium leading-[24px] text-[#000] text-left">
            ID: {products[0]?.categoryId}
            <br/>
          </span>
                    <span
                        className="font-['Inter'] text-[16px] font-normal leading-[24px] text-[#000] text-left">
            Кількість товарів: {products.length}
          </span>
                </div>
                {/*<Link to={{pathname:"/comparison-products", state:{ products }}}*/}
                {isLogin ? (
                    <Link to={"/account/comparison-products"} state={ products }
                          className={`flex w-[141px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] ${products.length <= 1 ? "pointer opacity-50 pointer-events-none" : ""}`}>
          <span
              className="flex w-[101px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] text-center whitespace-nowrap">
            Порівняти
          </span>
                    </Link>
                    ):(
                <Link to={"/comparison-products"} state={ products }
                    className={`flex w-[141px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] ${products.length <= 1 ? "pointer opacity-50 pointer-events-none" : ""}`}>
          <span
              className="flex w-[101px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] text-center whitespace-nowrap">
            Порівняти
          </span>
                </Link>
                    )}
            </div>
            <div
                className="flex pt-[20px] pr-[40px] pb-[20px] pl-[40px] gap-[28px] items-start self-stretch shrink-0 flex-nowrap bg-[#fff]">
                {
                    products.map(product => <img src={`${uploadings + "200_" + product.images![0]?.name}`} alt={"no image"} key={product.id}/>)
                }
            </div>
        </div>
    );
}

export default ComparisonListItem;