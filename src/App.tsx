import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Game, Games, GameHistory } from './pages';
import { Header, UserProvider} from './components';
import { UserContext } from './context';
import style from './App.module.css'

function App() {



  // const pageGuard = (element: JSX.Element) => {
  //   if(!user) {
  //     return <Navigate to="/Login" />
  //   } else{
  //     return element
  //   }
  // }

  return (
    <UserProvider>
      <Header />
      <main className={style.main}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="game/:size" element={<Game />} />
            <Route path="games" element={<Games />} />
            <Route path="game-log/:id" element={<GameHistory />} />
        </Routes>        
      </main>
    </UserProvider>
  );
}

export default App;
