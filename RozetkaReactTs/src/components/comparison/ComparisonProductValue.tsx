import React from 'react';

interface GroupedValues {
    filterName: string;
    valueName: string[];
}

interface GroupedValuesProps {
    groupedValues: GroupedValues;
}

const ComparisonProductValue: React.FC<GroupedValuesProps> = ({groupedValues}) => {

    return (
        <div className="main-container flex w-full flex-col gap-[2px] items-start flex-nowrap mx-auto my-0 mb-[4px]">
            <div className="flex pt-[20px] pr-[20px] pb-[20px] pl-[20px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span className="flex w-[170px] h-[15px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] text-center whitespace-nowrap">
          {groupedValues?.filterName}
        </span>
            </div>
            <div className="main-container flex gap-[2px] items-center self-stretch shrink-0 flex-nowrap">
                {groupedValues?.valueName ?

                    groupedValues.valueName.map((name, index) =>
                <div className="flex  pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] flex-1" key={index}>
          <span className="flex h-[84px] justify-start items-center shrink-0 font-['Inter'] text-[16px] font-medium leading-[24px] text-[#3b3b3b] text-left">
            {name}
          </span>
                </div>)
               :
                    null
                }
            </div>
        </div>

    );
}

export default ComparisonProductValue;