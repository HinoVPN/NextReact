// import axios from "api/axios";
// import CredentialsProvider from "next-auth/providers/credentials";
// const LOGIN_URL = "/users/login"

// async function refreshAccessToken(tokenObject) {
//   const tokenResponse = await axios.post('/token', {
//       _id: tokenObject._id,
//       accessToken: tokenObject.accessToken
//   });
//   return {
//       accessToken: tokenResponse.data.accessToken,
//       accessTokenExp: tokenResponse.data.exp,
//   }
// }

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           username: { label: "Username", type: "text", placeholder: "jsmith" },
//           password: { label: "Password", type: "password" }
//         },
//         async authorize(credentials, req) {
//             const {username, password} = credentials
//             const res = await axios.post(LOGIN_URL, 
//               JSON.stringify({username, password}),
//               {
//               headers: { "Content-Type": "application/json"},
//             })
//             if (res.status === 200) {
//               return res.data
//             }
//             // Return null if user data could not be retrieved
//             return null
//         }
//     })
//   ],
//   callbacks:{
//     async jwt({token, user, account}){
//       if(account && user){
//         token = { ...token, ...user}
//       }
      
//       if(token && new Date() < new Date(token.accessTokenExp)){
//         console.log('Not Time')
//         return {...token, ...user}
//       }
      
//       console.log('eeeeeeeeeeeeeeeeeeeeeeeeee')
//       console.log(token)
//       const refreshedToken = await refreshAccessToken(token)
//       return {...token, ...refreshedToken}
//     },
//     async session({session, token}){
//       session.user = token
//       return session
//     }
//   },
//   session:{
//     strategy: "jwt"
//   },
//   pages:{
//     signIn: '/login'
//   }
// }