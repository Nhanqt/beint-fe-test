import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton
} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import axios from "axios";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ProductModal from "../../components/modal/Index.jsx";
import {showErrorToast} from "../../components/toast/Index.jsx";
import { toast } from 'react-toastify';

function HomePage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            params: {
                page: page,
                size: rowsPerPage
            }
        })
            .then(response => {
                const products = response.data.data.content;
                setData(products);
                setTotalCount(response.data.data.totalElements);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [page, rowsPerPage]);


    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            params: {
                page: page,
                size: rowsPerPage
            }
        })
            .then(response => {
                const products = response.data.data.content;
                setData(products);
                setTotalCount(response.data.data.totalElements);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSave = () => {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/products/${selectedProduct.id}`, selectedProduct)
            .then(response => {
                setData(prevData => {
                    const updatedData = prevData.map(product => {
                        if (product.id === selectedProduct.id) {
                            return selectedProduct;
                        }
                        return product;
                    });
                    return updatedData;
                });
                handleClose();
            })
            .catch(error => {
                if (error.response.data.message === "Conflict")
                {
                    showErrorToast('Code is Existed!');
                }
            });
    };

    const handleFirstPage = () => {
        setPage(0);
    };

    const handleLastPage = () => {
        setPage(Math.max(0, Math.ceil(totalCount / rowsPerPage) - 1));
    };
    const handleEdit = (row) => {
        setSelectedProduct(row);
        setOpen(true);
    };


    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
            .then(response => {
                toast.success('Product deleted successfully');

                fetchData();
            })
            .catch(error => {
            });
    };
    const handleClose = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    return (
        <div style={{ margin: '0 auto', maxWidth: '800px' }}>
            <div style={{ marginLeft: '50px', marginBottom: '20px' }}>
                <h1>Product</h1>
                <Button variant="contained" color="primary" onClick={() => navigate("/product-form")}>Create New Product</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ display: 'none' }}>ID</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Branch</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ display: 'none' }}>{row.id}</TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.branch}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(row)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(row.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={() => (
                        <CustomPaginationActions
                            handleNextPage = {handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                            handleFirstPage={handleFirstPage}
                            handleLastPage={handleLastPage}
                        />
                    )}
                />
            </TableContainer>
            <ProductModal open={open} handleClose={handleClose} product={selectedProduct} setProduct={setSelectedProduct} handleSave={handleSave} />
        </div>
    );
}



function CustomPaginationActions({ handleNextPage, page, handleFirstPage, handleLastPage, handlePreviousPage }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, auto)', gap: '10px', marginTop: '10px' }}>
            <Button variant="contained" color="primary" style={{ width: '50px', height: '25px', fontSize: '12px' }} onClick={handleFirstPage}>First</Button>
            <Button variant="contained" color="primary" disabled={page === 0} style={{ width: '50px', height: '25px', fontSize: '12px' }} onClick={() => handlePreviousPage()}>Pre</Button>
            <Button variant="contained" color="primary" style={{ width: '50px', height: '25px', fontSize: '12px' }} onClick={() => handleNextPage()}>Next</Button>
            <Button variant="contained" color="primary" style={{ width: '50px', height: '25px', fontSize: '12px' }} onClick={handleLastPage}>Last</Button>
        </div>
    );
}


export default HomePage;
