import React from 'react';
import { useState } from "react";

export interface IMultipleSelectOption {
    id: number;
    name: string;
    isSelected: boolean;
}

interface IMultipleSelectProps {
    title: string;
    options: IMultipleSelectOption[];
    onOptionClick?: (id: number) => void;
}

const MultipleSelect = (props: IMultipleSelectProps) => {
    const [isHidden, setIsHidden] = useState(false);

    const switchVisibility = () => setIsHidden(oldValue => !oldValue);


    return (
        <div className="multiple-select">
            <div className="title-container pointer" onClick={switchVisibility}>
                <p className="title">{props.title}</p>
                {/*{isHidden*/}
                {/*    ? <img src={getPublicResourceUrl("icons/multipleSelect/hidden.svg")} alt="hidden" />*/}
                {/*    : <img src={getPublicResourceUrl("icons/multipleSelect/expand-down.svg")} alt="expand" />*/}
                {/*}*/}
            </div>

            {!isHidden && <>
                <div className="options-container">
                    {props.options.map((option) => {
                        return <div
                            key={option.id} className="option pointer"
                            onClick={() => props.onOptionClick?.(option.id)}>
                            {/*<img src={option.isSelected ? checkedIcon : uncheckedIcon} alt="icon" />*/}
                            <p>{option.name}</p>
                        </div>;
                    })}
                </div>

                <div className="hide-options pointer" onClick={switchVisibility}>
                    <p className="title">Сховати</p>
                    {/*<img src={getPublicResourceUrl("icons/multipleSelect/expand-up.svg")} alt="expand" />*/}
                </div>
            </>}
        </div>
    );
};

export default MultipleSelect;