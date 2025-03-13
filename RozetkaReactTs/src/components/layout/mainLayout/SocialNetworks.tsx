import React from 'react';
import telegram from '../../../assets/icons/socialNetworks/telegram.svg'
import facebook from '../../../assets/icons/socialNetworks/facebook.svg'
import tiktok from '../../../assets/icons/socialNetworks/tiktok.svg'
import instagram from '../../../assets/icons/socialNetworks/instagram.svg'
import youtube from '../../../assets/icons/socialNetworks/youtube.svg'

const SocialNetworks:React.FC = () => {



    return (
        <div className="main-container flex w-[370px] pt-[24px] pr-0 pb-[24px] pl-0 flex-col gap-[20px] justify-center items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto">
            <div className="flex w-[181px] h-[14px] justify-center items-center shrink-0 flex-nowrap">
        <span className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
          Ми в соціальних мережах
        </span>
            </div>
            <div className="flex gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap">
                <div className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img src={telegram} className="w-[24px] h-[24px] shrink-0 overflow-hidden" />
                </div>
                <div
                    className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img src={facebook} className="w-[24px] h-[24px] shrink-0 overflow-hidden"/>
                </div>
                <div
                    className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img src={tiktok} className="w-[24px] h-[24px] shrink-0 overflow-hidden"/>
                </div>
                <div
                    className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img src={instagram} className="w-[24px] h-[24px] shrink-0 overflow-hidden"/>
                </div>
                <div
                    className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img src={youtube} className="w-[24px] h-[24px] shrink-0 overflow-hidden"/>
                </div>
            </div>
        </div>
    );
}

export default SocialNetworks;