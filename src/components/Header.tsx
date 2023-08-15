import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import { UserContext } from '../context'

export default function Header() {
    const navigate = useNavigate()
    // const location = useLocation()
    const { user, logout } = useContext(UserContext)
    return (
        <header className={style.header}>
          <div className={style.container}>
            <Link to="/">Gomoku</Link>
            {!user && <div className={style.actions} onClick={() => {navigate('./Login')}}>Log in</div>}
            {user && <div className={style.actions} onClick={() => {navigate('./Games')}}>Previous Games</div>}
          </div>
        </header>
      )

}