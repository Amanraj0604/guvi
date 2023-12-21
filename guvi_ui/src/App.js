// App.js
import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Homee from './component/home/Homee';
import Login from './component/login/Login';
import Profile from './component/profile/Profile';
import Resister from './component/register/Resister';
import Form from "./component/form/Form"
import { ContextProvider } from './component/Context/ContextProvider';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Homee />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/resister" element={<Resister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:userId" element={<Form />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
