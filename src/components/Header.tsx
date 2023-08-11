import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'


export default function Header() {
    // const navigate = useNavigate()
    // const location = useLocation()

    return (
        <header className={style.header}>
          <div className={style.container}>
            <Link to="/">UNE Cinema App</Link>
            <div className={style.actions}>blaah</div>
          </div>
        </header>
      )

}