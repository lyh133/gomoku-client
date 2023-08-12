import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login } from './pages';
import { Header } from './components';
import logo from './logo.svg';
import style from './App.module.css'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <Header />
      <main className={style.main}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
        </Routes>        
      </main>
    </>
  );
}

export default App;
