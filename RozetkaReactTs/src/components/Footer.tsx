import React from 'react';

// import { Layout as LayoutAntd } from 'antd';
// const { Footer: FooterAntd } = LayoutAntd;

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Grid} from "@mui/joy";


import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LinkMui from "@mui/material/Link";
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


const Footer: React.FC = () => {

    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
        {/*// <>*/}
        {/*//     <h1>Footer</h1>*/}
        {/*// </>*/}


        {/*// <FooterAntd style={{ textAlign: 'center' }}>*/}
        {/*//     Ant Design ©{new Date().getFullYear()} Created by Ant UED*/}
        {/*// </FooterAntd>*/}
        <div>
            <h1 style={{textAlign: "center"}}>Footer</h1>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: '10vh'}}
            >

                <h1>Footer</h1>
                <BottomNavigation sx={{width: 500}} value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Recents"
                        value="recents"
                        icon={<RestoreIcon/>}
                    />
                    <BottomNavigationAction
                        label="Favorites"
                        value="favorites"
                        icon={<FavoriteIcon/>}
                    />
                    <BottomNavigationAction
                        label="Nearby"
                        value="nearby"
                        icon={<LocationOnIcon/>}
                    />
                    <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon/>}/>
                </BottomNavigation>

                <div className="flex" style={{width:'100%' , backgroundColor: 'red'}}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>

                <Stack
                    spacing={2}
                    // spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    // useFlexGap
                    style={{width: 400, justifyContent: 'space-around', backgroundColor: 'red'}}
                    // width="500 px"
                >

                    <Stack>
                        <Link to="/test">About us</Link>
                        <Link to="/aboutus">About us</Link>
                        <LinkMui href="/aboutus">22</LinkMui>
                        <Link href="/">3</Link>
                    </Stack>

                    <Stack>
                        <Link href="/">111</Link>
                        <Link href="/">22</Link>
                        <Link href="/">3</Link>
                    </Stack>

                    <Stack>
                        <Item>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                        <Item>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                    </Stack>

                </Stack>

            </Grid>


        </div>


        </>
    );
};

export default Footer;