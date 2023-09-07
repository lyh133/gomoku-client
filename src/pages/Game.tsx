import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Game.module.css'
import { UserContext } from '../context'
import { useParams } from 'react-router-dom'
import { playerType, move, gameHistory} from '../types'
import { useLocalStorage } from '../hooks'
import { gameState } from '../types'
import { post, setToken } from "../utils/http";
const API_HOST = process.env.REACT_APP_API_HOST;

const Game: React.FC = () => {

    const [message, setMessage] = useState('black\'s turn');
    const { size } = useParams();
    const navigate = useNavigate()
    const { user } = useContext(UserContext)


    const [gameState, setGameState] = useState<gameState>();
    
    useEffect(() => {
      if(size != null)
        createGameRequest(Number(size))
    }, []);

    useEffect(() => {
      if(!user) {
          navigate(`../Login`)
      }
    }, []);



    const saveGame = () => {
      if(gameState && gameState.isFinished){
        saveGameRequest();
        navigate(`../Games`);
      }else{
        exitGameRequest();
        navigate(`../`);
      }
    }

    const restartGame = async () => {
      exitGameRequest()
      navigate(0);
    }
  

    useEffect(() => {
      if(gameState){
        if(gameState.isFinished) {

          if(gameState.result === 'draw') setMessage("Game Over, Draw game")
          if(gameState.result === 'black') setMessage("Game Over, black win")
          if(gameState.result === 'white') setMessage("Game Over, white win")

        }else{
            setMessage(gameState.turn + "'s turn")
        }
      }
    }, [gameState]);

    const handleBoxClick = (rowIndex: number, colIndex: number) => {

      if(gameState && !gameState.isFinished && ! gameState.board[rowIndex][colIndex]) {
        updateGameRequest(rowIndex,colIndex)
      }
    };

    const updateGameRequest = async (row: number, col: number) => {
      try {
        const result : gameState = await post<{row: number, col: number}, any>(`${API_HOST}/api/game/updateGame`, 
        {row: row, col: col})
        
        setGameState(result)
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        alert("Unable to make move, please try again");
      }
    }

    const saveGameRequest = async () => {
      try {
        if(gameState && gameState.isFinished)
          await post<{}, any>(`${API_HOST}/api/game/saveGameHistory`, {});            
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
          return
        }
        alert("Unable to save game, please try again");
      }
    }

    const exitGameRequest = async () => {
      try {
          await post<{}, any>(`${API_HOST}/api/game/exitGame`, {});            
      } catch (error) {
        if (error instanceof Error) {
          return
        }
      }
    }

    const createGameRequest = async (size: number) => {
      try {
        const result : gameState = await post<{size: number}, any>(`${API_HOST}/api/game/createGame`, {size: size});
        setGameState(result)
            
      } catch (error) {
        if (error instanceof Error) {
          return
        }
      }
    }


    return (
      <>
        <div className={style.board}>
          {gameState && gameState.board.map((row, rIndex) => {return(
            <div className={style.row} key={"r"+rIndex} >
                {row.map((_, cIndex) => {return(
                    <div className={style.box}>
                        <div 
                          onClick={() => handleBoxClick(rIndex, cIndex)}
                          className={`${style.circle} 
                            ${gameState.board[rIndex][cIndex] === 'black' ? `${style.black}` :  
                            gameState.board[rIndex][cIndex] === 'white' ? `${style.white}` : ''}`}
                          key={"rc"+String(cIndex)+String(rIndex)}>
                        </div>
                      </div>
                )})}


            </div>
            )})}
          
        </div>
        <div className={style.message}>{message}</div>
        <button onClick={restartGame}>Restart</button>
        <button onClick={saveGame}>Leave</button>
      </>
    );

}
export default Game