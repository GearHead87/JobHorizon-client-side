import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

import Lottie from "lottie-react";
import loadingAnimation from "./loadingSpinner.json";
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const Main = () => {
    const { loading } = useAuth();

    if (loading) {
        return <>
            <Lottie
                animationData={loadingAnimation}
                style={style}
            />
        </>
    }

    return (
        <div>
            {/* Navbar */}
            <Navbar></Navbar>
            {/* Outlet */}
            <Outlet></Outlet>
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;