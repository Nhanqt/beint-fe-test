import React from 'react';
import { Modal, DialogContent, TextField, Button } from '@mui/material';

function ProductModal({ open, handleClose, product, setProduct, handleSave }) {
    if(!product) {
        return null;
    }
    const handleInputChange = (field, value) => {
        // Update the state of the product object
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value,
        }));
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div style={modalStyle}>
                <DialogContent>
                    <TextField
                        label="Code"
                        value={product.code}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                    <TextField
                        label="Name"
                        value={product.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                    <TextField
                        label="Category"
                        value={product.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                    <TextField
                        label="Branch"
                        value={product.branch}
                        onChange={(e) => handleInputChange('branch', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                    <TextField
                        label="Type"
                        value={product.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                    <TextField
                        label="Description"
                        value={product.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        fullWidth
                        style={textFieldStyle}
                    />
                </DialogContent>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button onClick={handleSave} variant="contained" color="primary" style={{ marginRight: '10px' }}>Save</Button>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </div>
            </div>
        </Modal>
    );
}

const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '80%',
};

const textFieldStyle = {
    marginBottom: '10px',
};

export default ProductModal;
