import axios from 'api/axios'
import useAuth from './userAuth'

function useRefreshToken() {
    const { auth, setAuth } = useAuth()
    const refresh = async () => {
        const response = await axios.post('/token', 
        {
          _id: auth._id
        },
        {
        withCredentials: true
        })
      setAuth(prev => {
        return {
          ...prev,
          accessToken: response.data.accessToken
        }
      })
      return response.data.accessToken
    
    }
  return refresh
}

export default useRefreshToken