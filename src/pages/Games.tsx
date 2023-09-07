import { useEffect, useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import style from './Games.module.css'
import { useLocalStorage } from '../hooks'
import { playerType, move, gameHistory} from '../types'
import { UserContext } from '../context';
import { post, setToken } from "../utils/http";
const API_HOST = process.env.REACT_APP_API_HOST;

export default function Games() {
    const navigate = useNavigate()
    const [save, setSave] = useState<Array<gameHistory>>()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if(!user) {
            navigate(`../Login`)
        }
        getGamesRequest();
      }, []);

    const getGamesRequest = async () => {
        try {
            const result : Array<gameHistory> = await post<{}, any>(`${API_HOST}/api/game/getGames`, {})
            setSave(result)
            console.log(result)
        } catch (error) {
            if (error instanceof Error) {
            alert(error.message);
            }
            alert("Unable to get game history, please try again");
        }
    }


    return (
    <div className={style.historyContainer}>
        {save && save.map((game,ind)=>{

            const openHistory = () => {navigate('../game-log',{state:{game: game}})}

            return (
            <div className={style.historyBar} >
                {"Game "+(ind+1)+" "}
                {game.date}
                {game.result !== 'draw' ? " Winner: "+game.result : "Game is a draw"}
    
                <button onClick={openHistory}>View Game Log</button>
                </div>)})}

        
    </div>

    )
}