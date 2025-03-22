import { useState, useEffect } from 'react';
import {IOrderModel} from "../models/orderModel.ts";
import {OrderServices} from "../services/orderServices.ts";

const useOrders = () => {
    const [orders, setOrders] = useState<IOrderModel[]>([]);

    const loadOrders = async () => {
        const res = await OrderServices.getAll();
        if(res.status === 200){
            setOrders(res.data);
        } else {
            console.log("error download orders")
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return {orders, setOrders};
};

export default useOrders;
