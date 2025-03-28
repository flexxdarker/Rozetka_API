import { useState, useEffect } from 'react';
import {IOrderStatus} from "../models/orderModel.ts";
import {OrderServices} from "../services/orderServices.ts";

const useStatuses = () => {
    const [statuses, setStatuses] = useState<IOrderStatus[]>([]);

    const loadStatuses = async () => {
        const res = await OrderServices.getAllStatuses();
        if(res.status === 200){
            setStatuses(res.data);
        } else {
            console.log("error download statuses")
        }
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    return {statuses, setStatuses};
};

export default useStatuses;
