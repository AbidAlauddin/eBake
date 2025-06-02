import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme'
import { setIsCartOpen } from '../../state';

import { Badge, Box, IconButton, Button, Typography, Menu, MenuItem } from '@mui/material';
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined,
} from '@mui/icons-material';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const token = localStorage.getItem('jwtToken');
    // For simplicity, username is not decoded from token here.
    // You can decode JWT to get username if needed.
    const username = token ? 'User' : null;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setAnchorEl(null);
        navigate('/login');
        window.location.reload();
    };

    return (
        <Box
            display='flex'
            alignItems='center'
            width='100%'
            height='60px'
            backgroundColor='rgba(235, 235, 235, 0.95)'
            color='black'
            position='fixed'
            top='0'
            left='0'
            zIndex='1'
        >
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Box
                    onClick={() => navigate('/')}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    color={shades.secondary[500]}
                >
                    eHampers
                </Box>

                <Box
                    display='flex'
                    justifyContent='space-between'
                    columnGap='20px'
                    zIndex='2'
                    alignItems='center'
                >
                    {/* Search */}
                    {/* <IconButton sx={{ color: 'black' }}>
                        <SearchOutlined />
                    </IconButton> */}

                    {/* Person or Login */}
                    {username ? (
                        <>
                            <Button
                                id="user-button"
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                sx={{ textTransform: 'none' }}
                            >
                                {username}
                            </Button>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'user-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/login')}
                            sx={{ textTransform: 'none' }}
                        >
                            Login
                        </Button>
                    )}

                    {/* Cart */}
                    <Badge
                        badgeContent={cart.length}
                        color='secondary'
                        invisible={cart.length === 0}
                        sx={{
                            '& .MuiBadge-badge': {
                                right: 5,
                                top: 5,
                                padding: '0 4px',
                                height: '14px',
                                minWidth: '13px',
                            },
                        }}
                    >
                        <IconButton
                            sx={{ color: 'black' }}
                            onClick={() => dispatch(setIsCartOpen({}))}
                        >
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>

                    {/* Menu */}
                    {/* <IconButton sx={{ color: 'black' }}>
                        <MenuOutlined />
                    </IconButton> */}
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar;

