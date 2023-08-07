import axios from 'api/axios'
import { useSession } from 'next-auth/react'

function useRefreshToken() {
    const { data: session} = useSession()
    const refresh = async () => {
      const response = await axios.post('/token', 
      {
        // @ts-ignore
        _id: session?.user._id,
        // @ts-ignore
        accessToken: session?.user.accessToken
      },
      {
      // withCredentials: true
      })
      if(session){
        // @ts-ignore
        session.user.accessToken = response.data.accessToken
      }
      return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken