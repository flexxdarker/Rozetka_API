import React, {useEffect, useState} from 'react';
import SocialNetworks from "./SocialNetworks.tsx";
import MenuByCategory from "./MenuByCategory.tsx";
import {TokenService} from "../../../services/tokenService.ts";
import AccountMenu from "../../account/AccountMenu.tsx";


const MainMenu: React.FC = () => {

    const [isLoggin, setIsLoggin] = useState<boolean>();

    const isExistToken = () =>{
        setIsLoggin(TokenService.isExists());
    }

    useEffect(() => {
        isExistToken();
        window.addEventListener('storageChangeToken', isExistToken);
        // Очищаємо слухача при демонтажі компонента

        return () => {
            window.removeEventListener('storageChangeToken', isExistToken);
        };
    }, []);

    return (
        <>
                <div className={"flex flex-col gap-[4px] overflow-visible"}>
                    <MenuByCategory/>

                    {isLoggin && (
                        <AccountMenu/>
                    )}

                    <SocialNetworks/>
                </div>

        </>
    );
};

export default MainMenu;