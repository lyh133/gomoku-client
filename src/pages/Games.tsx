import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Games.module.css'
import { useLocalStorage } from '../hooks'
import { playerType, move, gameHistory} from '../types'

export default function Games() {
    const navigate = useNavigate()
    const [save, setSave] = useLocalStorage< Array<gameHistory> | []>('gameHistory', [])
    
    useEffect(() => {
        console.log(save.length)
  
      }, []);

    const openHistory = () =>{

    }

    return (
    <div className={style.historyContainer}>
        {save.map((game,ind)=>{return (
            <div className={style.historyBar} >
                {"Game "+(ind+1)+" "}
                {game.date}
                {game.winner ? " Winner: "+game.winner : "Game is a draw"}

                <button onClick={openHistory}>View Game Log</button>
                </div>)})}

        
    </div>

    )
}