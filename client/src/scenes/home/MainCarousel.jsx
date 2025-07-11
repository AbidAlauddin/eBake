import React from 'react'

import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { shades } from '../../theme'

const images = [
    '/1.jpeg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpeg',
    // tambahkan nama file gambar lain yang ada di folder public
];

const MainCarousel = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)');

    return (
        <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10',
                    }}
                >
                    <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10',
                    }}
                >
                    <NavigateNextIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}
        >
            {images.map((img, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img
                        src={img}
                        alt={`carousel-${index}`}
                        style={{
                            width: '100%',
                            height: '700px',
                            objectFit: 'cover',
                            backgroundAttachment: 'fixed',
                        }}
                    />

                    <Box
                        color='white'
                        padding='20px'
                        borderRadius='1px'
                        textAlign='left'
                        backgroundColor='rgb(0, 0, 0, 0.4)'
                        position='absolute'
                        top='46%'
                        left={isNonMobile ? '10%' : '0'}
                        right={isNonMobile ? undefined : '0'}
                        margin={isNonMobile ? undefined : '0 auto'}
                        maxWidth={isNonMobile ? undefined : '240px'}
                    >
                        <Typography color={shades.secondary[200]}>--NEW ITEMS</Typography>

                        <Typography variant='h1'>Eid Hampers</Typography>

                        <Typography
                            fontWeight='bold'
                            color={shades.secondary[300]}
                            sx={{ textDecoration: 'undefined' }}
                        >
                            Discover More
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    );
}

export default MainCarousel;
