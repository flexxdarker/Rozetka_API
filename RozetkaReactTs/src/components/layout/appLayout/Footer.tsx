import React from 'react';
// import { Layout as LayoutAntd } from 'antd';
// const { Footer: FooterAntd } = LayoutAntd;
import {Grid} from "@mui/joy";
import Stack from '@mui/material/Stack';
// import LinkMui from "@mui/material/Link";
import { Link } from 'react-router-dom';





const Footer: React.FC = () => {

    return (
        <>
            <Grid
                container
                spacing={0}
                columns={4}
                // direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: '10vh'}}
            >
                    <Stack style={{minWidth: '20%'}}>
                        <h3 style={{textAlign: "center"}}>Company information</h3>
                        <Link to="about-us">About us</Link>
                        <Link to="contacts">Contacts</Link>
                        {/*<LinkMui href="/aboutus">22</LinkMui>*/}
                    </Stack>

                    <Stack style={{minWidth: '20%'}}>
                        <h3 style={{textAlign: "center"}}>Help</h3>
                        <Link to="delivery-and-payment">Delivery and payment</Link>
                        <Link to="return-of-goods">Return of goods</Link>
                    </Stack>

                    <Stack style={{minWidth: '20%'}}>
                        <h3 style={{textAlign: "center"}}>Services</h3>
                        <Link to="for-corporate-client">For corporate client</Link>
                    </Stack>

                    <Stack style={{minWidth: '20%'}}>
                        <h3 style={{textAlign: "center"}}>For partners</h3>
                        <Link to="franchising">Franchising</Link>
                    </Stack>
            </Grid>
        </>
    );
};

export default Footer;