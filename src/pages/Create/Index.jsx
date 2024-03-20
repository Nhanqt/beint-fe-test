import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function ProductForm() {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [branch, setBranch] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!code || !name || !category) {
            setError('Code, Name, and Category are required fields.');
            return;
        }

        const product = {
            code: code,
            name: name,
            category: category,
            branch: branch,
            type: type,
            description: description
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, product)
            .then(response => {
                // Clear form fields
                setCode('');
                setName('');
                setCategory('');
                setBranch('');
                setType('');
                setDescription('');
                setError('');

                navigate('/');
            })
            .catch(error => {

                if (error.response.data.message === "Conflict")
                {
                    setError('Code is Existed!.');

                }
                console.error('Error saving product:', error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '40%', margin: '0 auto' }}>
            <h1>Create Product</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <TextField
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Submit
            </Button>

            <Button type="submit" variant="contained" onClick={() => navigate("/")} style={{ marginTop: '20px',marginLeft: '20px' }}>
                Home
            </Button>
        </form>
    );
}

export default ProductForm;
