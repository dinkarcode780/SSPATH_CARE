import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Admin.css'
import { Outlet } from 'react-router-dom'

const FranchisLayout = () => {
    return (
        <div>
            <div id='franchise-main'>
                {/* Navbar */}
                <Navbar />

                {/* Sidebar and Main Content */}
                <div className="layout">
                    <Sidebar />
                    <main
                        className="main-content min-h-screen"
                    
                    >
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default FranchisLayout