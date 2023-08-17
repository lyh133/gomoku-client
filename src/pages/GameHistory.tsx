import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Game.module.css'
import { UserContext } from '../context'
import { useParams } from 'react-router-dom';
import { playerType, move, gameHistory} from '../types'
import { useLocalStorage } from '../hooks'

const GameHistory: React.FC = () => {


    const [size, setSize] = useState(0);
    const { id } = useParams();

    const [save, setSave] = useLocalStorage< Array<gameHistory> | []>('gameHistory', [])
    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    useEffect(() => {
      if(!user) {
          navigate(`../Login`)
      }
    }, []);

    useEffect(() => {
      setSize(Number(save[Number(id)].size))
    }, [id]);
    
    const findMove = (row: number, col: number): move | null => {
      const game = save[Number(id)]
      let result: move | null = null;
      game.moves.forEach(move => {
        if(move.colIndex === col && move.rowIndex === row) {
          result = move
        }
      })
      return result
    }

    const isBlack = (turn:number | null): boolean => {
      if(turn == null) return true
      return (turn % 2) !== 0 
    }


    const rows = [];

    //make Board
    for (let r = 0; r < size; r++) {
      const cells = [];
      for(let c = 0; c < size; c++) {
        //find if there is a move in the cell
        const move = findMove(r, c);
        var circleClassName = `${style.circle}`;
        if(move){
          circleClassName = `${style.circle} ${
              isBlack(move.moveNum)
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
      <div>          
        {rows}
      </div>
    );

}
export default GameHistory