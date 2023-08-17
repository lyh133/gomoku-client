import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Game.module.css'
import { UserContext } from '../context'
import { useParams } from 'react-router-dom';
import { playerType, move, gameHistory} from '../types'
import { useLocalStorage } from '../hooks'

const Game: React.FC = () => {

    const [currentPlayer, setCurrentPlayer] = useState<playerType>("black");
    const [gameEnded, setGameEnded] = useState(false);
    const [moveNum, setMoveNum] = useState(1);
    const [isDraw, setIsDraw] = useState(false);
    const [message, setMessage] = useState('black\'s turn');
    const { size } = useParams();

    const [moves, setMoves] = useState<Array<move>>([])

    const [save, setSave] = useLocalStorage< Array<gameHistory> | []>('gameHistory', [])
    const navigate = useNavigate()

    const [board, setBoard] = useState<Array<Array<string | null>>>(
        Array.from({ length: Number(size) }, () => Array(Number(size)).fill(null))
      );

    const { user } = useContext(UserContext)
    useEffect(() => {
      if(!user) {
          navigate(`../Login`)
      }
    }, []);



    const saveGame = () => {

      if(gameEnded){
        let today  = new Date();
        const newGame:gameHistory = {
          date: today.toISOString().split('T')[0],
          winner: isDraw ? null : currentPlayer === 'black' ? 'white' : 'black',
          size: Number(size),
          moves: moves
        }
        const updatedSave = [...save]
        setSave(updatedSave.concat(newGame))
        navigate(`../Games`);

      } else {
        navigate(`../`);

      }

    }
    const restartGame = () => {
      navigate(0)
    }

    useEffect(() => {

      if(!gameEnded) {
        if(checkWinningState(board,Number(size))){
          setGameEnded(true)
          currentPlayer === 'white' ? setMessage("Game Over black won") : setMessage("Game Over white won")
      
        }else if(checkDraw()) {
          setGameEnded(true)
          setIsDraw(true)
          setMessage("Game Draw")
        }else{
          setMessage(currentPlayer + "'s turn")
        }        
      }

    }, [currentPlayer]);

    const handleBoxClick = (rowIndex: number, colIndex: number) => {

      if (!gameEnded && !board[rowIndex][colIndex]) {
        const updatedMoves = [...moves]
        setMoves(updatedMoves.concat({ rowIndex: rowIndex, colIndex: colIndex, player: currentPlayer, moveNum: moveNum}))
        const updatedBoard = [...board];
        updatedBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(updatedBoard);
        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
        setMoveNum(moveNum+1)
      }

    };

    const checkDraw = () : boolean =>{
      return board.every((row: any ) => row.every((cell: any) => cell !== null))
    };

    const checkWinningState = (board: Array<Array<string | null>> , size: number): boolean =>{
      const directions: [number, number][] = [
          [0, 1],   // Right
          [1, 0],   // Down
          [1, 1],   // Diagonal down-right
          [1, -1]   // Diagonal down-left
      ];
  
      function isInRange(x: number, y: number): boolean {
          return x >= 0 && x < size && y >= 0 && y < size;
      }
  
      function checkConsecutive(x: number, y: number, dx: number, dy: number, value: string | null): boolean {
          let consecutiveCount = 0;
          while (isInRange(x, y) && board[x][y] === value) {
              consecutiveCount++;
              x += dx;
              y += dy;
          }
          return consecutiveCount >= 5;
      }
  
      for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
              if (board[i][j] !== null) {
                  for (const [dx, dy] of directions) {
                      if (checkConsecutive(i, j, dx, dy, board[i][j])) {
                          return true;
                      }
                  }
              }
          }
      }
  
      return false;
  }


    return (
      <>
        <div className={style.board}>
          { board.map((row, rIndex) => {return(
            <div className={style.row} key={"r"+rIndex} >
                {row.map((_, cIndex) => {return(
                    <div className={style.box}>
                        <div 
                          onClick={() => handleBoxClick(rIndex, cIndex)}
                          className={`${style.circle} 
                            ${board[rIndex][cIndex] === 'black' ? `${style.black}` :  
                            board[rIndex][cIndex] === 'white' ? `${style.white}` : ''}`}
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