import axios from 'api/axios'
import { useCookies } from 'react-cookie'

function useRefreshToken() {
  const [cookies, setCookie] = useCookies()
  
    const refresh = async () => {
      if(cookies.get('accessToken')){
        const response = await axios.post('/token', 
        {
          _id: cookies.get('userId'),
          accessToken: cookies.get('accessToken')
        },
        {
        // withCredentials: true
        })

        setCookie('accessToken', response.data.accessToken, {path:'/'})

        return response.data.accessToken
      }
      return null
    }

  return refresh
}

export default useRefreshToken