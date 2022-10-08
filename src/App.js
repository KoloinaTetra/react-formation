import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Category from './components/frontend/category';
import CreateProduct from './components/frontend/create';
import EditProduct from './components/frontend/edit';

import Home from './components/frontend/Home';
import Login from './components/frontend/Login';
import MasterLayout from './layouts/admin/MasterLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/create" element={<CreateProduct/>} />
          <Route path="/edit/:id" element={<EditProduct/>} />
          <Route path="login" element={<Login/>} />
          <Route path="admin/*" element={<MasterLayout/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
