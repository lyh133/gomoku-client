import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'

import style from './Login.module.css'

export default function Register() {
  
  const { register} = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')
    const result = await register(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }


  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
        }}
      />
      <button type="submit" disabled={!username || !password}>
        Register
      </button>
    </form>
  )
}
