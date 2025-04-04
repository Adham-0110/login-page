import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import Success from './Pages/success';
import Failed from './Pages/failed';
import SignUp from './Pages/signup';
import NotFound from './Pages/notFound';
import {BrowserRouter,Route,Routes} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route path='/failed' element={<Failed/>}></Route>
        <Route path='*' element={<NotFound/>} ></Route>
    </Routes>

</BrowserRouter>




);


