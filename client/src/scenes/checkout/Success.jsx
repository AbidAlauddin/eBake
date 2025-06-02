import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" mt={10}>
            <Typography variant="h4" gutterBottom>
                Terima kasih atas pesanan Anda!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Pesanan Anda telah berhasil diproses.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Kembali ke Beranda
            </Button>
        </Box>
    );
};

export default Success;
