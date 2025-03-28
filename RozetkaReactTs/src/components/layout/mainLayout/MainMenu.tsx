import React from 'react';
import SocialNetworks from "./SocialNetworks.tsx";
import MenuByCategory from "./MenuByCategory.tsx";
import AccountMenu from "../../account/AccountMenu.tsx";
import useIsLogin from "../../../hooks/useIsLogin.ts";

const MainMenu: React.FC = () => {

    const {isLogin} = useIsLogin();

    return (
        <>
                <div className={"flex flex-col gap-[4px] overflow-visible"}>
                    <MenuByCategory/>

                    {isLogin && (
                        <AccountMenu/>
                    )}

                    <SocialNetworks/>
                </div>
        </>
    );
};

export default MainMenu;