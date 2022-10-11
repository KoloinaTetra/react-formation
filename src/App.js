import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Register from './components/admin/Register';
import Category from './components/frontend/category';
import CreateProduct from './components/frontend/create';
import EditProduct from './components/frontend/edit';

import Home from './components/frontend/Home';
import Login from './components/admin/Login';
import Logout from './components/admin/Logout';
import MasterLayout from './layouts/admin/MasterLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/create" element={<CreateProduct/>} />
          <Route path="/edit/:id" element={<EditProduct/>} />
          <Route path="/admin/login" element={<Login/>} />
          <Route path="/admin/register" element={<Register/>} />
          <Route path="admin/*" element={<MasterLayout/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
