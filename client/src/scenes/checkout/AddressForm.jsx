import React from 'react'
import { getIn } from 'formik';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}) => {
    const isNonMobile = useMediaQuery('(min-width: 600px');

    //These functions allow for better code readability
    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) => Boolean(getIn(touched, formattedName(field)) && getIn(errors, formattedName(field)));

    const formattedHelper = (field) => getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
        >
            {/* First Name */}
            <TextField
                fullWidth
                type='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={formattedName('firstName')}
                error={formattedError('firstName')}
                helperText={formattedHelper('firstName')}
                sx={{ gridColumn: 'span 2' }}
            />

            {/* Last Name */}
            <TextField
                fullWidth
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name={formattedName('lastName')}
                error={formattedError('lastName')}
                helperText={formattedHelper('lastName')}
                sx={{ gridColumn: 'span 2' }}
            />

            {/* Country */}
            <TextField
                fullWidth
                type='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name={formattedName('country')}
                error={formattedError('country')}
                helperText={formattedHelper('country')}
                sx={{ gridColumn: 'span 4' }}
            />

            {/* Street Address */}
            <TextField
                fullWidth
                type='text'
                label='Street Address'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name={formattedName('street')}
                error={formattedError('street')}
                helperText={formattedHelper('street')}
                sx={{ gridColumn: 'span 4' }}
            />

            {/* City */}
            <TextField
                fullWidth
                type='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name={formattedName('city')}
                error={formattedError('city')}
                helperText={formattedHelper('city')}
                sx={{ gridColumn: 'span 2' }}
            />

            {/* State */}
            <TextField
                fullWidth
                type='text'
                label='State'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name={formattedName('state')}
                error={formattedError('state')}
                helperText={formattedHelper('state')}
                sx={{ gridColumn: 'span 2' }}
            />
        </Box>
    );
}

export default AddressForm;