import React from 'react';
import Paper from '@mui/material/Paper';
import SocialNetworks from "./SocialNetworks.tsx";
import MenuByCategory from "./MenuByCategory.tsx";


const MainMenu: React.FC = () => {
    return (
        <>
            <Paper sx={{ maxWidth: '100%'}}>

                <div className={"flex flex-col gap-[4px] overflow-visible"}>
                    <MenuByCategory/>
                    <SocialNetworks/>
                </div>
            </Paper>
        </>
    );
};

export default MainMenu;