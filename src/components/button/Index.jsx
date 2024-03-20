import React from 'react';
import Button from '@mui/material/Button';

function MyButton({ text }) {
    return (
        <Button variant="contained" color="primary">
            {text}
        </Button>
    );
}

export default MyButton;