import React from 'react'

import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

import { shades } from '../../theme';

const Footer = () => {
    const {
        palette: { neutral },
    } = useTheme();

    return (
        <Box
            sx={{
                position: 'static',
                width: '100%',
                marginTop: 'auto',
                padding: '40px 0',
                backgroundColor: neutral.light,
            }}
        >
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                rowGap='30px'
                columnGap='clamp(20px, 30px, 40px)'
            >
                <Box width='clamp(20%, 30%, 40%)'>
                    <Typography
                        variant='h4'
                        fontWeight='bold'
                        mb='30px'
                        color={shades.secondary[500]}
                    >
                        ECOMMERCE
                    </Typography>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </div>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight='bold' mb='30px'>About Us</Typography>

                    <Typography mb='30px'>Careers</Typography>
                    <Typography mb='30px'>Our Stores</Typography>
                    <Typography mb='30px'>Terms & Conditions</Typography>
                    <Typography mb='30px'>Privacy Policy</Typography>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight='bold' mb='30px'>Customer Care</Typography>

                    <Typography mb='30px'>Help Center</Typography>
                    <Typography mb='30px'>Track Your Order</Typography>
                    <Typography mb='30px'>Corporate & Bulk Purchasing</Typography>
                    <Typography mb='30px'>Returns & Refunds</Typography>
                </Box>

                <Box width='clamp(20%, 25%, 30%)'>
                    <Typography variant='h4' fontWeight='bold' mb='30px'>Contact Us</Typography>

                    <Typography mb='30px'>78 Trieu Khuc, Thanh Xuan, Ha Noi</Typography>
                    <Typography mb='30px' sx={{ wordWrap: 'break-word' }}>Email: alldila@gmail.com</Typography>
                    <Typography mb='30px'>0123.456.789</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;