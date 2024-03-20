import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Index.jsx";
import ProductForm from "./pages/Create/Index.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/product-form" element={<ProductForm />} />
                </Routes>
            </Router>
            <ToastContainer />
        </div>

    );
}

export default App;
