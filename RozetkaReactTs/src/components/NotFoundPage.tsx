import React from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom";

const NotFoundPage: React.FC = () => {


    const navigate = useNavigate();

    return (
        <>
        <h1>Not found page</h1>

        <Button variant="contained" size="large" onClick={() => {navigate(-1)}} style={{background: 'grey'}}>
            Back
        </Button>

            <Link to={"/"}>
            <Button variant="contained" size="large" color="success">
                Main
            </Button>
            </Link>
        </>
    );
};

export default NotFoundPage;
