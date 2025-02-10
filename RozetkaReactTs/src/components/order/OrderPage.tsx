import React from 'react';
import ContactDetailsOrder from "./СontactDetailsOrder.tsx";
import DeliveryOrder from "./DeliveryOrder.tsx";
import PaymentOrder from "./PaymentOrder.tsx";



const OrderPage: React.FC = () => {


    return (
        <>
            <h1>order page</h1>
            <ContactDetailsOrder/>
            <DeliveryOrder/>
            <PaymentOrder/>
        </>
    );
    };

    export default OrderPage;
