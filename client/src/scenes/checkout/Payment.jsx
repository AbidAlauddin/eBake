import React from 'react'

import { Box, Typography, TextField, Divider } from '@mui/material';
import { formatRupiah } from '../../utils/formatCurrency';

const Payment = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    cart,
}) => {
    const totalPrice = cart ? cart.reduce((acc, item) => acc + item.attributes.price * item.count, 0) : 0;

    return (
        <Box m='30px 0'>
            {/* BILLING ADDRESS */}
            <Box mb={3}>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>Billing Address</Typography>
                <Typography>{values.billingAddress.firstName} {values.billingAddress.lastName}</Typography>
                <Typography>{values.billingAddress.street}</Typography>
                <Typography>{values.billingAddress.city}, {values.billingAddress.state}</Typography>
                <Typography>{values.billingAddress.country}</Typography>
            </Box>

            {/* CONTACT INFO */}
            <Box>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>Contact Info</Typography>

                <TextField
                    fullWidth
                    type='text'
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4', marginBottom: '15px' }}
                />

                <TextField
                    fullWidth
                    type='text'
                    label='Phone Number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name='phoneNumber'
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: 'span 4' }}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ORDER SUMMARY */}
            <Box>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>Order Summary</Typography>
                {cart && cart.length > 0 ? (
                    cart.map((item) => (
                        <Box key={item.id} display='flex' justifyContent='space-between' mb={1}>
                            <Typography>{item.attributes.name} x {item.count}</Typography>
                            <Typography>{formatRupiah(item.attributes.price * item.count)}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>No items in cart</Typography>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight="bold" fontSize="20px">Total: {formatRupiah(totalPrice)}</Typography>
            </Box>
        </Box>
    )
}

export default Payment;
