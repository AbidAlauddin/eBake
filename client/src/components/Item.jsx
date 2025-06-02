import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { shades } from '../theme';
import { addToCart } from '../state';
import { formatRupiah } from '../utils/formatCurrency';

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const {
        palette: { neutral },
    } = useTheme();

    // Validasi data item dan image
    if (!item || !item.attributes) {
        return <Box width={width}><Typography color="error">Data item tidak lengkap</Typography></Box>;
    }

    const { category, price, name, image } = item.attributes;

    // Validasi image dan url dengan fallback ke url asli jika medium tidak ada
    let imageUrl = '';
    try {
        imageUrl = image?.data?.attributes?.formats?.medium?.url || image?.data?.attributes?.url || '';
    } catch (error) {
        imageUrl = '';
    }

    return (
        <Box width={width}>
            <Box
                position='relative'
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                {imageUrl ? (
                    <img
                        alt={name}
                        width='300px'
                        height='400px'
                        src={`http://localhost:1337${imageUrl}`}
                        onClick={() => navigate(`/item/${item.id}`)}
                        style={{ 
                            cursor: 'pointer',
                            objectFit: 'cover',
                            width: '300px',
                            height: '400px'
                        }}
                    />
                ) : (
                    <Box width='300px' height='400px' bgcolor={shades.neutral[200]} display='flex' justifyContent='center' alignItems='center'>
                        <Typography>Tidak ada gambar</Typography>
                    </Box>
                )}

                <Box
                    display={isHovered ? 'block' : 'none'}
                    position='absolute'
                    bottom='10%'
                    left='0'
                    width='100%'
                    padding='0 5%'
                >
                    <Box display='flex' justifyContent='space-between'>
                        {/* Amount */}
                        <Box
                            display='flex'
                            alignItems='center'
                            backgroundColor={shades.neutral[100]}
                            borderRadius='3px'
                        >
                            <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                                <RemoveIcon />
                            </IconButton>

                            <Typography color={shades.primary[300]}>{count}</Typography>

                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        {/* Button */}
                        <Button
                            onClick={() => {
                                const token = localStorage.getItem('jwtToken');
                                if (!token) {
                                    navigate('/login');
                                } else {
                                    dispatch(addToCart({ item: {...item, count} }));
                                }
                            }}
                            sx={{
                                backgroundColor: shades.primary[300],
                                color: 'white'
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box mt='3px'>
                <Typography variant='subtitle2' color={neutral.dark}>
                    {category ? category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) : 'Kategori tidak diketahui'}
                </Typography> 

                <Typography>{name || 'Nama tidak tersedia'}</Typography>

                <Typography fontWeight='bolder'>{price !== undefined ? formatRupiah(price) : 'N/A'}</Typography>
            </Box>
        </Box>
    )
}

export default Item;
