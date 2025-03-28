import React, { useState, useEffect } from 'react';
import baner from "../../assets/mainBaner1.png"
//import baner from "../../assets/mainBaner2.jpg"

type SliderProps = {
    images?: string[]; // Масив з URL зображень для слайдера
    delay?: number; // Опціональний параметр затримки (у мілісекундах)
};

const ImageSliderMainBaner: React.FC<SliderProps> = ({ images, delay = 3000 }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Функція для зміни зображення
    const changeImage = (index: number) => {
        if (isAnimating) return; // Запобігаємо змінам під час анімації
        setIsAnimating(true);
        setCurrentIndex(index);
    };

    // Функція для переходу до наступного зображення
    const nextImage = () => {
        if (isAnimating) return; // Запобігаємо змінам під час анімації
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images!.length);
    };

    // Функція для переходу до попереднього зображення
    const prevImage = () => {
        if (isAnimating) return; // Запобігаємо змінам під час анімації
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images!.length) % images!.length);
    };

    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            nextImage();
        }, delay);

        return () => clearInterval(interval);
    }, [images, delay]);

    // Затримка анімації
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAnimating(false); // Завершуємо анімацію через певний час
        }, 500); // Час анімації (500 мс)
        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        images && images.length > 0 ? (
        <div
            className="main-container flex w-[1160px] h-[496px] pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[187px] justify-end items-center flex-nowrap bg-cover bg-no-repeat relative mx-auto my-0"
            style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translateX(right)`,
                transition: 'opacity 0.1s ease, transform 0.9s ease', // Додаємо різні швидкості для opacity і transform
            }}
        >

            <div className="flex w-[68px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-start shrink-0 flex-nowrap relative z-[3]">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-[16px] h-[16px] shrink-0 bg-cover bg-no-repeat relative overflow-hidden z-[4] cursor-pointer ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'}`}
                        onClick={() => changeImage(index)}
                    />
                ))}
            </div>

            {/* Стрілки для переходу */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-[10]" onClick={prevImage}>
                <div className="w-[50px] h-[50px] bg-[url(https://static.codia.ai/image/2025-03-09/860631dc-e2be-4e72-8654-d81e9b388468.svg)] bg-cover bg-no-repeat"></div>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-[10]" onClick={nextImage}>
                <div className="w-[50px] h-[50px] bg-[url(https://static.codia.ai/image/2025-03-09/31997dd8-5dd8-4a4e-8e10-d85584a3adfe.svg)] bg-cover bg-no-repeat"></div>
            </div>
        </div> ) : (

            <img src={baner}
                className="object-contain main-container flex w-[1160px] h-[496px] pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[187px] justify-end items-center flex-nowrap bg-cover bg-no-repeat mx-auto my-0"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateX(right)`,
                    transition: 'opacity 0.1s ease, transform 0.9s ease', // Додаємо різні швидкості для opacity і transform
                }}
            />
        )
    );
};

export default ImageSliderMainBaner;
