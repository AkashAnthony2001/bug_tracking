import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assigned from './pages/Assigned';
import Projects from './pages/Projects';
import Submitted from './pages/Submitted';
import Module from './pages/Module';
import Bugs from './pages/Bugs';
import Users from './pages/Users'
import DetailedBugs from './pages/DetailedBugs';
import SprintView from './pages/SprintView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/projects' element={<Projects />} />
          <Route path='/dashboard/assigned' element={<Assigned />} />
          <Route path='/dashboard/submitted' element={<Submitted />} />
          <Route path='/dashboard/module' element={<Module />} />
          <Route path='/dashboard/bugs' element={<Bugs />} />
          <Route path='/dashboard/sprintView' element={<SprintView />} />
          <Route path='/dashboard/users' element={<Users />} />
          <Route path='/dashboard/details/:id' element={<DetailedBugs/>}/>

        </Route>
      </ Route>
    </Routes>
  </BrowserRouter>
);

