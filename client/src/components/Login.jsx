import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/local`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });

            if (!response.ok) {
                throw new Error('Login Failed');
            }

            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwt);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat login');
        }
    };

    return (
        <Box
            maxWidth="400px"
            margin="200px auto 200px auto"
            padding="20px"
            boxShadow={3}
            borderRadius={2}
        >
            <Typography variant="h5" mb={3}>Login</Typography>
            <TextField
                label="Username atau Email"
                fullWidth
                margin="normal"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error" mt={1}>{error}</Typography>}
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                Login
            </Button>
            <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/register')}
            >
                Register
            </Button>
        </Box>
    );
};

export default Login;
