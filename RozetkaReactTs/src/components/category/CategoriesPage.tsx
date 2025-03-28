import React from 'react';
import CategoryCardList from "./CategoryCardList.tsx";


const CategoriesPage: React.FC = () => {

    return (
        <>
            <div className={"flex"}>

                <CategoryCardList/>

            </div>
        </>
    )
        ;
};

export default CategoriesPage;