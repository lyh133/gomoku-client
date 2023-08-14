import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Game } from './pages';
import { Header, UserProvider} from './components';
import logo from './logo.svg';
import style from './App.module.css'

function App() {
  const boardSize:Number = 8;
  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="game/:size" element={<Game />} />
        </Routes>        
      </main>
    </UserProvider>
  );
}

export default App;
