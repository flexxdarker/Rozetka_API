import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { incrementTotalPrice } from "../store/actions/basketActions";
import { BasketService } from "../services/basketService";
import { BasketServicesApi } from "../services/basketServiceApi";
import formatPrice from "../functions/formatPrice";
import { IBasketApi } from "../models/basketModel";
import {IProductModel} from "../models/productsModel.ts";
import useIsLogin from "./useIsLogin.ts";

const useBasket = () => {
    const dispatch = useDispatch();

    const {isLogin} = useIsLogin();

    const BasketFirstAdd = async (item: IProductModel) => {
        if (!BasketService.checkId(item.id)) {
            BasketService.addId(item.id);

            if(isLogin) {
                const data: IBasketApi = {productId: item.id, amount: 1};
                const res = await BasketServicesApi.createBasketId(data);
                if (res.status === 200) {
                    toast('Товар успішно добавлено в корзину!', {
                        position: 'bottom-right',
                        autoClose: 4000, // Auto close after 3 seconds
                        closeButton: true,  // Add close button to the toast
                    });
                }
            }
            dispatch(incrementTotalPrice(Number(formatPrice(item.price - item.discount!))));
        }
    };

    const BasketClear = () =>{
        BasketServicesApi.clearBasket();
        BasketService.clearItems();
        // if(BasketService.isExists()) {
        //     const items = BasketService.getItems();
        //     const ids = Object.keys(items).map(Number);
        //     console.log("ids", ids);
        //
        //     if(isLogin) {
        //         ids.forEach(id => BasketServicesApi.deleteBasket(id));
        //     }
        //     BasketService.clearItems();
        //}
    }

    return { BasketFirstAdd , BasketClear };
};

export default useBasket;