import axios from "api/axios";
import CredentialsProvider from "next-auth/providers/credentials";
const LOGIN_URL = "/users/login"

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const {username, password} = credentials
            const res = await axios.post(LOGIN_URL, 
              JSON.stringify({username, password}),
              {
              headers: { "Content-Type": "application/json"},
            })
            if (res.status === 200) {
              return res.data
            }
            // Return null if user data could not be retrieved
            return null
        }
    })
  ],
  callbacks:{
    async jwt({token, user}){
      return {...token, ...user}
    },
    async session({session, token}){
      session.user = token
      return session
    }
  },
  session:{
    strategy: "jwt"
  },
  pages:{
    signIn: '/login'
  }
}