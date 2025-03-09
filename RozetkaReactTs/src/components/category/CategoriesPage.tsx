import React from 'react';
import CategoryCardList from "./CategoryCardList.tsx";


const CategoriesPage: React.FC = () => {

    return (
        <>
            <div className={"flex"}>
                <h1>categories</h1>

                <CategoryCardList/>

            </div>
        </>
    )
        ;
};

export default CategoriesPage;