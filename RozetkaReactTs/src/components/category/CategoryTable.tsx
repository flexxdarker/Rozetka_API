import React, {useEffect, useState} from 'react';
import {CategoriesServices} from "../../services/categoriesService.ts";
import {CategoryModel} from "../../models/categoriesModel.ts";
import MyTable from "./MyTable.tsx";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {MyTable2} from "./MyTable2.tsx";

const CategoryTable: React.FC = () => {

    const [Categories, setCategories] = useState<CategoryModel[]>([]);
    const [item, setItem] = useState("");
    const [CategoriesId, setCategoriesId] = useState<CategoryModel>();

    const loadCategories = async () => {
        const res = await CategoriesServices.getAll();
        console.log(res);
        setCategories(res.data);
        // fetch("http://localhost:5119/api/Categories/getparentcategories")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("start data");
        //         console.log(data);
        //         setCategories(data);
        //     });
    };

    const loadCategoriesId = (async (id: number) => {
        const res = await CategoriesServices.getById(id);
        setCategoriesId(res.data);
        console.log(res);
    });

    useEffect(() => {
        loadCategories();
        loadCategoriesId(1);
    }, []);

    const listItems = Categories.map((cat) =>
        <li key={cat.id}>
            {cat.name}
        </li>
    );

    useEffect(() => {
        if (CategoriesId != undefined) {
            setItem(CategoriesId.name)
        }
    }, [CategoriesId]);


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Category Table for admin</h1>
                <Link to="/categorycreate">
                    <Button variant="contained" style={{maxHeight: "25px"}}>Add</Button>
                </Link>
            </div>
            <ul>{listItems}</ul>
            <h2>{item}</h2>
            <MyTable/>
            <MyTable2/>
        </>
    );
};

export default CategoryTable;