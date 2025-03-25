import React from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom";

const NotFoundPage: React.FC = () => {


    const navigate = useNavigate();

    return (
        <>

            <div className={"flex flex-col gap-[40px] h-[auto] p-[20px] rounded-[8px] bg-[#fff] border-solid border border-[#9cc319]"}>
                <div className={"flex items-center justify-center"}>
                    <span>Сторінку не знайдено!</span>
                </div>

                <div className={"flex  gap-[40px]  "}>
                    <div className={"flex"}>
                        <Button variant="contained"  className={"h-[30px]"} onClick={() => {
                            navigate(-1)
                        }}>
                            Back
                        </Button>
                    </div>

                    <div className={"flex"}>
                        <Link to={"/"}>
                            <Button variant="contained"  color="success" className={"h-[30px]"}>
                                Main
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
