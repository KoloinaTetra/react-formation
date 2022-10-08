import React from "react";
import {Route, Routes, Redirect, Switch, Navigate} from 'react-router-dom';


import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';

import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import Dashboard from "../../components/admin/Dashboard";
import Profile from "../../components/admin/Profile";


const MasterLayout = () => {

    return(
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar /> 
                </div>

            
                <div id="layoutSidenav_content">
                    <main>
                        <Routes>
                            <Route path="dashboard" element={<Dashboard/>} />
                            <Route path="profile" element={<Profile />} />
                            {/* Redirect in react-router-dom@6 */}
                            <Route
                                path="*"
                                element={<Navigate to="dashboard" replace />}
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>

            </div>
        </div>
    );

}

export default MasterLayout;