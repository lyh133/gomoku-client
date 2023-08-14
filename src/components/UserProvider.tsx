import { User, Credential } from '../types'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import { post, setToken } from '../utils/http'
import userData from '../data/user.json'; 
const API_HOST = process.env.REACT_APP_API_HOST || ''

type UserProviderProps = {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
  if (user) {
    setToken(user.token)
  }


    const login = async (username: string, password: string) => {
      const found = userData.find((user) => user.username === username && user.password === password);
      if(found){

        const user: User = {
          _id: username,
          token: username+password
        };

        setUser(user)
        setToken(user.token)
        return true
      }else {
        setUser(undefined)
        setToken('')
        return 'Unable to login, wrong credentials'
      }
    }

  const register = async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(
        `${API_HOST}/api/auth/register`,
        {
          username,
          password,
        }
      )
      setUser(user)
      setToken(user.token)
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  const logout = () => {
    setUser(undefined)
    setToken('')
  }


  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}
