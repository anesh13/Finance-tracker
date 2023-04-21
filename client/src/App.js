import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<Main/>}/>*/}
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>


            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
