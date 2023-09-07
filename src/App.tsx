import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Register, Game, Games, GameHistory } from './pages';
import { Header, UserProvider} from './components';
import { UserContext } from './context';
import style from './App.module.css'

function App() {

  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="game/:size" element={<Game />} />
            <Route path="games" element={<Games />} />
            <Route path="game-log/" element={<GameHistory />} />
        </Routes>        
      </main>
    </UserProvider>
  );
}

export default App;
