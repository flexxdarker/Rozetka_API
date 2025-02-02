import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';


import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";

// import "../Header/Header.css"
// import "../../../../index.css";

const Header: React.FC = () => {

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    //
    //const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));


    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <div
                className="main-container flex w-[1920px] h-[90px] pt-0 pr-[180px] pb-0 pl-[180px] gap-[122px] items-center flex-nowrap relative mx-auto my-0 bg-gradient-to-b from-[#000] to-[#381753]">
                <div className="flex w-[1080px] gap-[102px] items-center shrink-0 flex-nowrap relative">
                    <div className="flex w-[378px] gap-[46px] items-center shrink-0 flex-nowrap relative z-[1]">
                        <div
                            className="flex w-[100px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative z-[2]">
                            <div
                                className="w-[80px] h-[51.202px] shrink-0 bg-[url(../assets/images/8caba0e3-d8f1-44ba-810e-cb855fcc3d6c.png)] bg-cover bg-no-repeat relative overflow-hidden z-[3]"/>
                        </div>
                        <button
                            className="flex w-[232px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[4] pointer">
            <span
                className="flex w-[158px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[5]">
              Каталог товарів
            </span>
                            <div
                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/373bba37-4a61-47d1-a1e8-0baf1a855314.png)] bg-cover bg-no-repeat relative overflow-hidden z-[6]"/>
                        </button>
                    </div>
                    <div
                        className="flex w-[600px] pt-0 pr-0 pb-0 pl-[10px] gap-[320px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#000] relative overflow-hidden z-[7]">
                        <input
                            className="w-[600px] h-[40px] shrink-0 bg-transparent border-none absolute top-[-1px] left-[-1px] z-[12]"/>
                        <span
                            className="flex w-[227px] h-[10px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] relative text-center whitespace-nowrap z-[8]">
            Я шукаю...(наприклад, смартфон)
          </span>
                        <div
                            className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[9]">
                            <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap relative z-10">
                                <div
                                    className="h-[24px] grow shrink-0 basis-0 bg-[url(../assets/images/85e8d631-8476-44ea-a575-72eae8857471.png)] bg-cover bg-no-repeat relative overflow-hidden z-[11]"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-[357px] gap-[46px] items-center shrink-0 flex-nowrap relative z-[13]">
                    <div className="flex w-[172px] gap-[24px] items-center shrink-0 flex-nowrap relative z-[14]">
                        <div
                            className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[15]">
                            <div className="flex w-[24px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[16]">
                                <div
                                    className="h-[24px] grow shrink-0 basis-0 bg-[url(../assets/images/bc7d6d76-f2ec-4e5f-95f2-7c5cd2d5a12d.png)] bg-cover bg-no-repeat relative overflow-hidden z-[17]"/>
                            </div>
                        </div>
                        <div
                            className="flex w-[40px] h-[40px] flex-col justify-center items-center shrink-0 flex-nowrap relative z-[18]">
                            <div
                                className="flex h-[40px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[4px] relative overflow-hidden z-[19]">
                                <div
                                    className="w-[22.5px] h-[19.125px] shrink-0 bg-[url(../assets/images/5d6da53f-25ee-48d5-8211-2c77a3e9931f.png)] bg-[length:100%_100%] bg-no-repeat relative z-20"/>
                            </div>
                        </div>
                        <div
                            className="flex w-[44px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] relative z-[21]">
                            <div
                                className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/fd1f36fc-dcfa-4131-bea6-edc4ccdebed1.png)] bg-cover bg-no-repeat relative overflow-hidden z-[22]"/>
                        </div>
                    </div>
                    <button
                        className="flex w-[139px] pt-[8px] pr-[20px] pb-[8px] pl-[20px] gap-[10px] items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[23] pointer">
                        <div
                            className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/51ee14cc-753f-45a1-8ddc-327ec78fc8f0.png)] bg-cover bg-no-repeat relative overflow-hidden z-[24]"/>
                        <span
                            className="flex w-[65px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[20px] text-[#fff] relative text-center whitespace-nowrap z-[25]">
            Кошик
          </span>
                    </button>
                </div>
            </div>

                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, backgroundColor: 'blue'}}>



                                    <Link to="categories">
                                        <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                            Categories
                                        </Button>
                                    </Link>

                                    <Link to="products">
                                        <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                            Products
                                        </Button>
                                    </Link>

                                    <Link to="subcategories">
                                        <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                            Subcategories
                                        </Button>
                                    </Link>

                                    <Link to="signin">
                                        <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                            SignIn
                                        </Button>
                                    </Link>

                                    <Link to="signup">
                                        <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                            SignUp
                                        </Button>
                                    </Link>
                                </Box>

            {/*<Box sx={{flexGrow: 1}}>*/}
            {/*    <AppBar position="static">*/}
            {/*        <Toolbar>*/}
            {/*            <Tooltip title="Account settings">*/}
            {/*                /!*<IconButton*!/*/}
            {/*                /!*    onClick={handleClick}*!/*/}
            {/*                /!*    size="small"*!/*/}
            {/*                /!*    sx={{ ml: 2 }}*!/*/}
            {/*                /!*    aria-controls={open ? 'account-menu' : undefined}*!/*/}
            {/*                /!*    aria-haspopup="true"*!/*/}
            {/*                /!*    aria-expanded={open ? 'true' : undefined}*!/*/}
            {/*                /!*>*!/*/}
            {/*                /!*    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>*!/*/}
            {/*                /!*</IconButton>*!/*/}
            {/*                <IconButton*/}
            {/*                    onClick={handleClick}*/}
            {/*                    size="large"*/}
            {/*                    edge="start"*/}
            {/*                    color="inherit"*/}
            {/*                    aria-label="open drawer"*/}
            {/*                    sx={{mr: 2}}*/}
            {/*                >*/}
            {/*                    <MenuIcon/>*/}
            {/*                </IconButton>*/}
            {/*            </Tooltip>*/}
            {/*            <Menu*/}
            {/*                anchorEl={anchorEl}*/}
            {/*                id="account-menu"*/}
            {/*                open={open}*/}
            {/*                onClose={handleClose}*/}
            {/*                onClick={handleClose}*/}
            {/*                slotProps={{*/}
            {/*                        paper: {*/}
            {/*                            elevation: 0,*/}
            {/*                            sx: {*/}
            {/*                                overflow: 'visible',*/}
            {/*                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',*/}
            {/*                                mt: 1.5,*/}
            {/*                                '& .MuiAvatar-root': {*/}
            {/*                                    width: 32,*/}
            {/*                                    height: 32,*/}
            {/*                                    ml: -0.5,*/}
            {/*                                    mr: 1,*/}
            {/*                                },*/}
            {/*                                '&::before': {*/}
            {/*                                    content: '""',*/}
            {/*                                    display: 'block',*/}
            {/*                                    position: 'absolute',*/}
            {/*                                    top: 0,*/}
            {/*                                    right: 14,*/}
            {/*                                    width: 10,*/}
            {/*                                    height: 10,*/}
            {/*                                    bgcolor: 'background.paper',*/}
            {/*                                    transform: 'translateY(-50%) rotate(45deg)',*/}
            {/*                                    zIndex: 0,*/}
            {/*                                },*/}
            {/*                            },*/}
            {/*                        },*/}
            {/*                    }}*/}
            {/*                    transformOrigin={{horizontal: 'right', vertical: 'top'}}*/}
            {/*                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}*/}
            {/*                >*/}
            {/*                    <MenuItem onClick={handleClose}>*/}
            {/*                        <Avatar/> Profile*/}
            {/*                    </MenuItem>*/}
            {/*                    <MenuItem onClick={handleClose}>*/}
            {/*                        <Avatar/> My account*/}
            {/*                    </MenuItem>*/}
            {/*                    <Divider/>*/}
            {/*                    /!*<MenuItem onClick={handleClose}>*!/*/}
            {/*                    /!*    <ListItemIcon>*!/*/}
            {/*                    /!*        <PersonAdd fontSize="small" />*!/*/}
            {/*                    /!*    </ListItemIcon>*!/*/}
            {/*                    /!*    Add another account*!/*/}
            {/*                    /!*</MenuItem>*!/*/}
            {/*                    <MenuItem onClick={handleClose}>*/}
            {/*                        <ListItemIcon>*/}
            {/*                            <Settings fontSize="small"/>*/}
            {/*                        </ListItemIcon>*/}
            {/*                        Settings*/}
            {/*                    </MenuItem>*/}
            {/*                    <MenuItem onClick={handleClose}>*/}
            {/*                        <ListItemIcon>*/}
            {/*                            <Logout fontSize="small"/>*/}
            {/*                        </ListItemIcon>*/}
            {/*                        Logout*/}
            {/*                    </MenuItem>*/}
            {/*                </Menu>*/}


            {/*                <Typography*/}
            {/*                    variant="h6"*/}
            {/*                    noWrap*/}
            {/*                    component="div"*/}
            {/*                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}*/}
            {/*                >*/}
            {/*                    <Link to="/" style={{color: 'red'}}>*/}
            {/*                        Rozetka*/}
            {/*                    </Link>*/}
            {/*                </Typography>*/}


            {/*                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>*/}
            {/*                    /!*{pages.map((page) => (*!/*/}
            {/*                    /!*    <Button*!/*/}
            {/*                    /!*        key={page}*!/*/}
            {/*                    /!*        onClick={handleCloseNavMenu}*!/*/}
            {/*                    /!*        sx={{ my: 2, color: 'white', display: 'block' }}*!/*/}
            {/*                    /!*    >*!/*/}
            {/*                    /!*        {page}*!/*/}
            {/*                    /!*    </Button>*!/*/}
            {/*                    /!*))}*!/*/}

            {/*                    <Link to="categories">*/}
            {/*                        <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
            {/*                            Categories*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}

            {/*                    <Link to="products">*/}
            {/*                        <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
            {/*                            Products*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}

            {/*                    <Link to="subcategories">*/}
            {/*                        <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
            {/*                            Subcategories*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}

            {/*                    <Link to="signin">*/}
            {/*                        <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
            {/*                            SignIn*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}

            {/*                    <Link to="signup">*/}
            {/*                        <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
            {/*                            SignUp*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}
            {/*                </Box>*/}


            {/*                <Search>*/}
            {/*                    <SearchIconWrapper>*/}
            {/*                        <SearchIcon/>*/}
            {/*                    </SearchIconWrapper>*/}
            {/*                    <StyledInputBase*/}
            {/*                        placeholder="Search…"*/}
            {/*                        inputProps={{'aria-label': 'search'}}*/}
            {/*                    />*/}
            {/*                </Search>*/}

            {/*                <Box sx={{flexGrow: 0}}>*/}
            {/*                    <Tooltip title="Open settings">*/}
            {/*                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
            {/*                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
            {/*                        </IconButton>*/}
            {/*                    </Tooltip>*/}
            {/*                    <Menu*/}
            {/*                        sx={{mt: '45px'}}*/}
            {/*                        id="menu-appbar"*/}
            {/*                        anchorEl={anchorElUser}*/}
            {/*                        anchorOrigin={{*/}
            {/*                            vertical: 'top',*/}
            {/*                            horizontal: 'right',*/}
            {/*                        }}*/}
            {/*                        keepMounted*/}
            {/*                        transformOrigin={{*/}
            {/*                            vertical: 'top',*/}
            {/*                            horizontal: 'right',*/}
            {/*                        }}*/}
            {/*                        open={Boolean(anchorElUser)}*/}
            {/*                        onClose={handleCloseUserMenu}*/}
            {/*                    >*/}
            {/*                        {settings.map((setting) => (*/}
            {/*                            <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
            {/*                                <Typography sx={{textAlign: 'center'}}>{setting}</Typography>*/}
            {/*                            </MenuItem>*/}
            {/*                        ))}*/}
            {/*                    </Menu>*/}
            {/*                </Box>*/}
            {/*            </Toolbar>*/}
            {/*        </AppBar>*/}
            {/*    </Box>*/}
        </>
    );

}

export default Header;