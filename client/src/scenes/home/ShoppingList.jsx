import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, useMediaQuery } from '@mui/material';

import Item from '../../components/Item'
import { setItems } from '../../state'

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('all');
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery('(min-width: 600px');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    // Get API items
    async function getItems() {
        const items = await axios.get('http://localhost:1337/api/items?populate=image');
        dispatch(setItems(items.data.data));
    }

    useEffect(() => {
        getItems();
    }, []);

    const topRatedItems = items.filter(
        (item) => item.attributes.category === 'topRated'
    );

    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === 'newArrivals'
    );

    const bestSellerItems = items.filter(
        (item) => item.attributes.category === 'bestSellers'
    );

    return (
        <Box width='80%' margin='80px auto'>
            <Typography variant='h3' textAlign='center'>
                Our Featured <b>Products</b>
            </Typography>

            <Tabs
                textColor='primary'
                indicatorColor='primary'
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: breakPoint ? 'block' : 'none' } }}
                sx={{
                    m: '25px',
                    '& .MuiTabs-flexContainer' : {
                        flexWrap: 'wrap',
                    },
                }}
            >
                <Tab label='ALL' value='all' />
                <Tab label='NEW ARRIVALS' value='newArrivals' />
                <Tab label='BEST SELLERS' value='bestSellers' />
                <Tab label='TOP RATED' value='topRated' />
            </Tabs>

            <Box
                margin='0 auto'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, 300px)'
                justifyContent='space-around'
                rowGap='20px'
                columnGap='1.33%'
            >
                {/* All */}
                {value === 'all' && items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}

                {/* NEW ARRIVALS */}
                {value === 'newArrivals' && newArrivalsItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}

                {/* BEST SELLERS */}
                {value === 'bestSellers' && bestSellerItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}

                {/* TOP RATED */}
                {value === 'topRated' && topRatedItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
            </Box>
        </Box>
    )
}

export default ShoppingList;