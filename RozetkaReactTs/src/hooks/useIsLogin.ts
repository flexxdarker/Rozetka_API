import { useState, useEffect } from 'react';
import {TokenService} from "../services/tokenService.ts";

const storageChangeToken = import.meta.env.VITE_APP_CHANGE_TOKEN_EVENT;

const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState<boolean>(TokenService.isExists());

    const isExistToken = () =>{
        setIsLogin(TokenService.isExists());
    }

    useEffect(() => {
        isExistToken();
        window.addEventListener(storageChangeToken, isExistToken);
        // Очищаємо слухача при демонтажі компонента

        return () => {
            window.removeEventListener(storageChangeToken, isExistToken);
        };
    }, []);

    return {isLogin, setIsLogin};
};

export default useIsLogin;
