import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// function ScrollToTop() {
const  ScrollToTop: React.FC = () =>{
const location = useLocation();

    useEffect(() => {
        // Прокручуємо сторінку до верху
        window.scrollTo(0, 0);
    }, [location]); // Залежність на зміну location

    return null; // Цей компонент не рендерить нічого
}

export default ScrollToTop;