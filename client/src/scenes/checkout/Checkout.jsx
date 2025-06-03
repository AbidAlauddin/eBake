import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';

import { Formik } from 'formik';
import * as yup from 'yup';

import { shades } from '../../theme';
import Shipping from './Shipping';
import Payment from './Payment';

import { loadStripe } from '@stripe/stripe-js';

import { clearCart } from '../../state';

const stripePromise = loadStripe('pk_test_51MCM5wJuDnqAjM3g8gK0uV7lixc8hW8WIOPXSHrqFq6gJ2L7SNXEHh3VzYepeGCs5NyX0w8cYBgBCbifLm8TDHnN00WzwWE8tL');

const initialValues = {
    billingAddress: {
        firstName: '',
        lastName: '',
        country: '',
        street: '',
        city: '',
        state: '',
    },

    shippingAddress: {
        isSameAddress: true,
        firstName: '',
        lastName: '',
        country: '',
        street: '',
        city: '',
        state: '',
    },

    email: '',
    phoneNumber: '',
}

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required('Not be Empty'),
            lastName: yup.string().required('Not be Empty'),
            country: yup.string().required('Not be Empty'),
            street: yup.string().required('Not be Empty'),
            city: yup.string().required('Not be Empty'),
            state: yup.string().required('Not be Empty'),
        }),

        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
            lastName: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
            country: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
            street: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
            city: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
            state: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('Not be Empty')
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
    })
]

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    // Check login before allowing checkout
    if (!localStorage.getItem('jwtToken')) {
        navigate('/login');
        return null;
    }

    const handleFormSubmit = async (values, actions) => {
        if (isSecondStep) {
            // Gabungkan data billing address, email, phoneNumber
            const billingData = {
                firstName: values.billingAddress.firstName,
                lastName: values.billingAddress.lastName,
                country: values.billingAddress.country,
                streetAddress: values.billingAddress.street,
                city: values.billingAddress.city,
                state: values.billingAddress.state,
                email: values.email,
                phoneNumber: values.phoneNumber,
            };

            try {
                const token = localStorage.getItem('jwtToken');
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/billings`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ data: billingData }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Gagal menyimpan data billing');
                }
            } catch (error) {
                alert('Error saat menyimpan data billing: ' + error.message);
                return;
            }

            // Simpan data checkout ke Strapi collection "checkout"
            const checkoutData = {
                billingAddress: values.billingAddress,
                email: values.email,
                phoneNumber: values.phoneNumber,
                cart: cart.map(item => ({
                    id: item.id,
                    name: item.attributes.name,
                    price: item.attributes.price,
                    count: item.count,
                })),
            };

            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/checkouts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ data: checkoutData }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Gagal menyimpan data checkout');
                }
            } catch (error) {
                alert('Error saat menyimpan data checkout: ' + error.message);
                return;
            }

            actions.setSubmitting(false);
            dispatch(clearCart());
            navigate('/checkout/success');
            return;
        }

        setActiveStep(activeStep + 1);

        //Copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue('shippingAddress', {
                ...values.billingAddress,
                isSameAddress: true,
            });
        }

        actions.setTouched({});
    };

    async function makePayment(values) {
        const stripe = await stripePromise;
        const requestBody = { 
            userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(' '),
            email: values.email,
            products: cart.map(({ id, count }) => ({
                id,
                count,
            })),
        };

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        console.log(response)
        const session = await response.json();
        console.log(session)
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    return (
        <Box width='80%' m='100px auto'>
            <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>

                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>

            <Box>  
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                    cart={cart}
                                />
                            )}

                            <Box display='flex' justifyContent='space-between' gap='50px'>
                                {!isFirstStep && (
                                    <Button
                                        fullWidth
                                        color='primary'
                                        variant='contained'
                                        sx={{
                                            backgroundColor: shades.primary[200],
                                            boxShadow: 'none',
                                            color: 'white',
                                            borderRadius: 0,
                                            padding: '15px 40px'
                                        }}
                                        onClick={() => setActiveStep(activeStep - 1)}
                                    >
                                        Back
                                    </Button>
                                )}

                                <Button
                                    fullWidth
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    disabled={cart.length === 0}
                                    sx={{
                                        backgroundColor: cart.length === 0 ? shades.neutral[300] : shades.primary[400],
                                        boxShadow: 'none',
                                        color: 'white',
                                        borderRadius: 0,
                                        padding: '15px 40px',
                                        cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {!isSecondStep ? 'Next' : 'Pay'}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>

                {showConfirmation && (
                    <Box mt={2} p={2} bgcolor="success.light" color="success.contrastText" borderRadius={1}>
                        <strong>Order berhasil diproses!</strong> Terima kasih atas pembelian Anda.
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Checkout;
