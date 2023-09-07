import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import style from './Game.module.css'
import { UserContext } from '../context'
import { useParams } from 'react-router-dom';
import { move, gameHistory} from '../types'
import { useLocalStorage } from '../hooks'

const GameHistory: React.FC = (props) => {

    const location = useLocation();
    const [game, setGame] = useState<gameHistory>()

    

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    useEffect(() => {
      if(!user) {
          navigate(`../Login`)
      }
      setGame(location.state.game)
    }, []);    

    const findMove = (row: number, col: number): move | null => {
      let result: move | null = null;
      if(game)
        game.moves.forEach(move => {
          if(move.colIndex === col && move.rowIndex === row) {
            result = move
          }
        })
      return result
    }

    const handleBack = () => {
      navigate(`../Games`)
    }


    const rows = [];

    //make Board
    if(game && game.size)
    for (let r = 0; r < Number(game.size); r++) {
      const cells = [];
      for(let c = 0; c < Number(game.size); c++) {
        //find if there is a move in the cell
        const move = findMove(r, c);
        var circleClassName = `${style.circle}`;
        if(move){
          circleClassName = `${style.circle} ${
              move.player === 'black'
              ? `${style.black}`
              : `${style.white}`
          }`;
        }

        cells.push(
          <div className={style.box} key={"rcd" + String(c) + String(r)}>
            <div className={circleClassName}>
              <div className={style.turn}>{move ? move.moveNum :""}</div>
            </div>
          </div>
        );
      }
      rows.push(
        <div className={style.row} key={"rd" + r}>
          {cells}
        </div>
      );
    }
  
    return (
      <>
        <div>          
          {rows}
        </div> 
        <button onClick={handleBack}>Back</button>
        <div style={{ fontSize: "50px"}}>{game && game.result !== 'draw' ? "winner is :" + game.result : "Game draw"}</div>
      </>

    );

}
export default GameHistory