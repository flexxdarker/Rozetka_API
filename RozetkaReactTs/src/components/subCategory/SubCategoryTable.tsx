import React from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";


const SubCategoryTable: React.FC = () => {



    return (
        <>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>SubCategory Table for admin</h1>
                <Link to="create">
                    <Button variant="contained" style={{maxHeight: "25px"}}>Add</Button>
                </Link>
            </div>

        </>
    );
};

export default SubCategoryTable;