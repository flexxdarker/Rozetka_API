import React, {useState} from "react";
import arrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import arrowRightCircle from "../../assets/icons/arrow-right-circle.svg";



const ImageSlider: React.FC = () => {
    const images = [
        './assets/contemplative-reptile1.jpg',
        './assets/contemplative-reptile2.jpg',

    ];

    //slider

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div
            className="main-container flex w-[740px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-center mx-auto bg-[#fff]">
            {/* Main Slider */}
            <div className="flex h-[720px] items-center self-stretch shrink-0 flex-nowrap">
                {/* Left Arrow */}
                <div
                    onClick={goToPrevImage}
                    className="flex w-[70px] h-[740px] justify-center items-center relative cursor-pointer"
                >
                    <div className="w-[50px] h-[50px]">
                        <img src={arrowLeftCircle} alt="Previous"/>
                    </div>
                </div>

                {/* Main Image */}
                <div
                    className="h-[640px] grow bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${images[currentImageIndex]})`,
                    }}
                ></div>

                {/* Right Arrow */}
                <div
                    onClick={goToNextImage}
                    className="flex w-[70px] h-[740px] justify-center items-center relative cursor-pointer"
                >
                    <div className="w-[50px] h-[50px]">
                        <img src={arrowRightCircle} alt="Next"/>
                    </div>
                </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex w-[724px] gap-[12px] items-center">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-[80px] h-[80px] cursor-pointer ${
                            index === currentImageIndex ? 'border-2 border-blue-500' : ''
                        }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;