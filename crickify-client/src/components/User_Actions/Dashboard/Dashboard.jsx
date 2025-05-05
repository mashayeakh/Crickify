import React, { } from 'react';
import { AuthContext } from '../../Context/AuthContextProvider';
import Jersey from './../../Home/Jersey';
import { useLocation } from 'react-router';
import Sidevbar from '../Sidebar/Sidevbar';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
    // const { user } = useContext(AuthContext);

    const location = useLocation();
    console.log("Location = ", location.pathname);


    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-16"></div>
            <div className="flex flex-1">
                <Sidevbar />
                <DashboardContent />
            </div >
        </div >
    );
};

export default Dashboard;