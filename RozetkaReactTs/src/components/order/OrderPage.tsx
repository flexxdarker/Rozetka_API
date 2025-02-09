import React, {useState} from 'react';
import ContactDetailsOrder from "./СontactDetailsOrder.tsx";
import DeliveryOrder from "./DeliveryOrder.tsx";
import PaymentOrder from "./PaymentOrder.tsx";
import Dropdown from "./DeliveryOrder.tsx";



const OrderPage: React.FC = () => {

        const [selectedOption, setSelectedOption] = useState<string | null>(null);

        const handleSelect = (option: string) => {
            setSelectedOption(option);
            console.log(`Вибрана опція: ${option}`);
        };


    return (
        <>
            <h1>order page</h1>
            <ContactDetailsOrder/>
            <DeliveryOrder/>
            {/*<div className="flex justify-center items-center h-screen">*/}
            {/*    <div className="w-1/4">*/}
            {/*        <Dropdown*/}
            {/*            options={['Опція 1', 'Опція 2', 'Опція 3', 'Опція 4']}*/}
            {/*            onSelect={handleSelect}*/}
            {/*        />*/}
            {/*        {selectedOption && <p className="mt-4">Ви вибрали: {selectedOption}</p>}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <PaymentOrder/>
        </>
    );
    };

    export default OrderPage;
