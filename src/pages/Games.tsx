import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Games.module.css'
import { useLocalStorage } from '../hooks'
import { playerType, move, gameHistory} from '../types'
import { UserContext } from '../context';

export default function Games() {
    const navigate = useNavigate()
    const [save, setSave] = useLocalStorage< Array<gameHistory> | []>('gameHistory', [])
    const { user } = useContext(UserContext)

    useEffect(() => {
        if(!user) {
            navigate(`../Login`)
        }
      }, []);

    return (
    <div className={style.historyContainer}>
        {save.map((game,ind)=>{

            const openHistory = () => navigate('../game-log/'+ind);

            return (
            <div className={style.historyBar} >
                {"Game "+(ind+1)+" "}
                {game.date}
                {game.winner ? " Winner: "+game.winner : "Game is a draw"}

                <button onClick={openHistory}>View Game Log</button>
                </div>)})}

        
    </div>

    )
}