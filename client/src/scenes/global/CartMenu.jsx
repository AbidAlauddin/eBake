import React from 'react'

import { useSelector , useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';

import { shades } from '../../theme';
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from '../../state';

import { formatRupiah } from '../../utils/formatCurrency';

const FlexBox = styled(Box)`
    display: grid;
    justify-content: space-between;
    align-items: center;
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    return (
        <Box //overlay
            display={isCartOpen ? 'block' : 'none'}
            backgroundColor='rgba(0, 0, 0, 0.4)'
            position='fixed'
            zIndex={10}
            width='100%'
            height='100%'
            left='0'
            top='0'
            overflow='auto'
        >
            {/* Modal */}
            <Box
                position='fixed'
                right='0'
                bottom='0'
                width='max(400px, 30%)'
                height='100%'
                backgroundColor='white'
            >
                <Box padding='30px' overflow='auto' height='100%'>
                    {/* Header */}
                    <FlexBox mb='15px'>
                        <Typography variant='h3' >SHOPPING BAG ({cart.length})</Typography>

                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    {/* Cart List */}
                    <Box>
                        {cart.length === 0 ? (
                            <Typography variant="h6" textAlign="center" mt={5}>
                                Keranjang belanja kosong
                            </Typography>
                        ) : (
                            cart.map((item) => (
                                <Box key={`${item.attributes.name} - ${item.id}`}>
                                    <FlexBox p='15px 0'>
                                        <Box flex='1 1 40%'>
                                            <img
                                                alt={item?.name}
                                                width='123px'
                                                height='164px'
                                                src={`${import.meta.env.VITE_API_BASE_URL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url || item?.attributes?.image?.data?.attributes?.url}`}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Box flex='1 1 60%'>
                                            {/* Item Name */}
                                            <FlexBox mb='5px'>
                                                <Typography fontWeight='bold'>
                                                    {item.attributes.name}
                                                </Typography>

                                                <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </FlexBox>

                                            <Typography>{item.attributes.shortDescription}</Typography>

                                            {/* Amount */}
                                            <FlexBox m='15px 0'>
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    border={`1.5px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                                        <RemoveIcon />
                                                    </IconButton>

                                                    <Typography>{item.count}</Typography>

                                                    <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>

                                                {/* Price */}
                                                <Typography fontWeight='bold'>{formatRupiah(item.attributes.price)}</Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider />
                                </Box>
                            ))
                        )}
                    </Box>

                    {/* Actions */}
                    <Box m='20px 0'>
                        <FlexBox m='20px 0'>
                            <Typography fontWeight='bold'>SUBTOTAL</Typography>

                            <Typography fontWeight='bold'>{formatRupiah(totalPrice)}</Typography>
                        </FlexBox>

                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: 'white',
                                borderRadius: 0,
                                minWidth: '100%',
                                padding: '20px 40px',
                                m: '20px 0',
                            }}
                            onClick={() => {
                                const token = localStorage.getItem('jwtToken');
                                if (!token) {
                                    navigate('/login');
                                } else {
                                    navigate('/checkout');
                                    dispatch(setIsCartOpen({}));
                                }
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CartMenu;
