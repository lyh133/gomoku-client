import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Game.module.css'
import { UserContext } from '../context'
import { useParams } from 'react-router-dom';
type playerType = "black" | "white";

interface BoardProps {
    size: number;
}
// React.FC<BoardProps>
const Game: React.FC = () => {

    const [currentPlayer, setCurrentPlayer] = useState("black");
    const [gameEnded, setGameEnded] = useState(false);
    const [message, setMessage] = useState('black\'s turn');
    const { size } = useParams();

    const [board, setBoard] = useState<Array<Array<string | null>>>(
        Array.from({ length: Number(size) }, () => Array(Number(size)).fill(null))
      );

    useEffect(() => {

      if(!gameEnded) {
        if(checkWinningState(board,Number(size))){
          setGameEnded(true)
          currentPlayer === 'white' ? setMessage("Game Over black won") : setMessage("Game Over white won")
      
        }else if(checkDraw()) {
          setGameEnded(true)
          setMessage("Game Draw")
        }else{
          setMessage(currentPlayer + "'s turn")
        }        
      }

    }, [currentPlayer]);

    const handleBoxClick = (rowIndex: number, colIndex: number) => {

      if (!gameEnded && !board[rowIndex][colIndex]) {
        const updatedBoard = [...board];
        updatedBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(updatedBoard);
        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
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
      </>
    );

}
export default Game