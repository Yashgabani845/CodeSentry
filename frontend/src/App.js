import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Homepage from './Components/Homepage/HomePage';
import Profile from './Components/Profile';
import AdminLayout from './Components/AdminDashboard/AdminLayout';
import Dashboard from './Components/AdminDashboard/Dashboard';
import TestsList from './Components/AdminDashboard/TestsList';
import CreateTest from './Components/AdminDashboard/CreateTest';
import AptitudeTestBuilder from './Components/AdminDashboard/AptitudeTestBuilder';
import CodingTestBuilder from './Components/AdminDashboard/CodingTestBuilder';  
import './App.css';
import TestDetails from './Components/AdminDashboard/TestDetails';
import CodingEnvironment from './Components/Coding/Coding';
import EditTest from './Components/AdminDashboard/EditTest';
import EditAptitudeTest from './Components/AdminDashboard/EditAptitudeTest';
import EditCodingTest from './Components/AdminDashboard/EditCodingTest';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/code" element={<CodingEnvironment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      } />
      <Route path="/admin/tests" element={
        <AdminLayout>
          <TestsList />
        </AdminLayout>
      } />
      <Route path="/admin/tests/create" element={
        <AdminLayout>
          <CreateTest />
        </AdminLayout>
      } />
      <Route path="/admin/aptitude-test/:id" element={
        <AdminLayout>
          <AptitudeTestBuilder />
        </AdminLayout>
      } />
      <Route path="/admin/coding-test/:id" element={
        <AdminLayout>
          <CodingTestBuilder />
        </AdminLayout>
      } />

      <Route path = "/admin/tests/:id" element = {
        <AdminLayout>
          <TestDetails />
        </AdminLayout>
      }/>

        <Route path = "/admin/tests/:id/edit" element = {
        <AdminLayout>
          <EditTest />
        </AdminLayout>
      }/>
      <Route path = "/admin/aptitude-test/edit/:id" element = {
        <AdminLayout>
          <EditAptitudeTest />
        </AdminLayout>
      }/>
      <Route path = "/admin/coding-test/edit/:id" element = {
        <AdminLayout>
          <EditCodingTest />
        </AdminLayout>
      }/>
     </Routes>
    </Router>
  );
}

export default App;
