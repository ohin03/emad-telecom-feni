import React from 'react';
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import "./Dashboard.css";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div className='dashboard-page'>
    <Layout title={'Dashboard - Emad Telecom'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">

          <div className="col-md-3 dashboard-menu-col">
            <UserMenu />
          </div>

          <div className="col-md-9 dashboard-content-col ">
            <div className="dashboard-card">
              <h3 className="dash-name">Name: {auth?.user?.name}</h3>
              <h3 className="dash-email">Gmail: {auth?.user?.email}</h3>
              <h3 className="dash-email" >Location: {auth?.user?.address}</h3>
              <h3>Phn no: {auth?.user?.phone}</h3>
            </div>
          </div>

        </div>
      </div>
    </Layout>
    </div>
  );
};

export default Dashboard;
