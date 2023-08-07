import axios from 'api/axios'
import { useSession } from 'next-auth/react'

function useRefreshToken() {
    const { data: session} = useSession()
    const refresh = async () => {
      const response = await axios.post('/token', 
      {
        _id: session?.user._id,
        accessToken: session?.user.accessToken
      },
      {
      // withCredentials: true
      })
      if(session){
        session.user.accessToken = response.data.accessToken
      }
      return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken