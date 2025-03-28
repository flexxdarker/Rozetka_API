import React, {useEffect, useState} from 'react';
import CategoryCard from "./CategoryCard.tsx";
import {ICategoryModel} from "../../models/categoriesModel.ts";
import useCategories from "../../hooks/useCategories.ts";
import {ISubCategoryTreeModel} from "../../models/subCategoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";
import { Link } from 'react-router-dom';

interface CategoryCardListProps {
    categoriesInit?: ICategoryModel[];
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const CategoryCardList: React.FC<CategoryCardListProps> = ({categoriesInit}) => {
    //@ts-ignore
    const {categories, setCategories} = useCategories();
    const [categoriesTree, setCategoriesTree] = useState<ISubCategoryTreeModel[]>([]);

    useEffect(() => {
        if (categoriesInit) {
            setCategories(categoriesInit);
        }
    }, []);

    const loadCategoriesTree = async () => {
        const res = await CategoriesServices.getTree();
        console.log("tree", res);
        if (res.status === 200) {
            setCategoriesTree(res.data.sort((a, b) => a.id - b.id));
        } else {
            console.log("error download categoriestree")
        }
    };

    useEffect(() => {
        loadCategoriesTree();
    }, []);

    // const sortSubCategories = (data: ISubCategoryTreeModel[]): ISubCategoryTreeModel[] => {
    //     return data
    //         .sort((a, b) => a.id - b.id) // Сортуємо за зростанням id
    //         // .map((item) => ({
    //         //     ...item,
    //         //     subCategories: item.subCategories ? sortSubCategories(item.subCategories) : [] // Рекурсивне сортування підкатегорій
    //         // }));
    // };
    //
    // useEffect(() => {
    //     setCategoriesTree(sortSubCategories(categoriesTree));
    // }, [categoriesTree]);

    return (
        <>
            {/*<div className={"flex gap-[4px] max-w-[1300px] h-full flex-wrap"}>*/}
            {/*    {*/}
            {/*        categories.map((category, index) => <CategoryCard key={index} category={category}/>)*/}
            {/*    }*/}
            {/*</div>*/}

            <div className={"flex gap-[4px] max-w-[1300px] flex-wrap flex-col"}>
                {
                    categoriesTree.map((category) => (
                        <div key={category.id} className={"flex flex-col w-[1300px] bg-[#fff] wrap p-[20px]"}>
                            <Link state={category.id} to={"/product-filter"} className={"flex p-[10px]"}>


                                <img src={`${uploadings + "200_" + category.image}`} alt="no image"
                                     className="object-contain w-[100px] h-[100px]"/>


                                <div className={"flex pl-[20px] items-center justify-center font-['Inter'] text-[24px] font-semibold leading-[17px] text-[#9cc319] text-left uppercase whitespace-nowrap"}> {category.name}</div>

                            </Link>

                            <div className={"flex flex-wrap gap-[4px]"}>
                                {
                                    category.subCategories.map(subCat => <CategoryCard key={subCat.id} category={subCat}/>)
                            }
                            </div>
                        </div>)
                    )
                }
            </div>
        </>
    )
        ;
};

export default CategoryCardList;