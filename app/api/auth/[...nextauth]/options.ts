import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


declare module "next-auth" {
    interface User {
      token: string;
    }
  
    interface Session {
      accessToken: any;
    }
}

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
          async authorize(credentials, req) {
            // const res = await fetch(`${process.env.API_URL}/api/v1/auth/authenticate`, {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     email: credentials?.username,
            //     password: credentials?.password,
            //   }),
            //   headers: { 'Content-Type': 'application/json' }
            // });
            // const user = await res.json();
            // if (res.ok && user && user.token) {
            //     localStorage.setItem("accessToken",user.token)
            //     console.log(localStorage.getItem("accessToken"))
            //     console.log("Logged in successfully, token saved to localStorage", user.token);
            //   return user;
            // } else {
              return null;
            // }
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
    //   async session({ session, token }: { session: Session; token: { accessToken: string } }) {
    //     session.accessToken = token.accessToken;
    //     return session;
    // },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                process.env.activeToken = token.toString();
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/account/signin',
        signOut: '/account/signout'
    }
    
          
}
          
          
          
          
          
          
          
          
          
          
          
          
            // async authorize(credentials, req) {
            //     // You need to provide your own logic here that takes the credentials
            //     // submitted and returns either a object representing a user or value
            //     // that is false/null if the credentials are invalid.
            //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            //     // You can also use the `req` object to obtain additional parameters
            //     // (i.e., the request IP address)
            //     const res = await fetch("http://192.168.0.142:8080/api/v1/auth/authenticate", {
            //       method: 'POST',
            //       body: JSON.stringify({
            //             email: credentials?.username,
            //             password: credentials?.password,
            //         }
                    
            //         ),
            //       headers: { "Content-Type": "application/json" }
            //     })
            //     const user = await res.json()
            //     if (res.ok && user && user.token) {
            //         return user;
            //     } else {
            //         console.error("Error: ", user);
            //         return null;
            //     }
          
            //     console.log("Succcceees: ", user)
            //     if (res.ok && user) {
            //       return user
            //     }
            //     return null
            //   }
















            // async authorize(credentials, req) {
            //     const res = await fetch("http://192.168.0.142:8080/api/v1/auth/authenticate", {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             email: credentials?.username,
            //             password: credentials?.password,
            //         }),
            //         headers: { "Content-Type": "application/json" }
            //     });
            //     const user = await res.json();

            //     if (res.ok && user && user.token) {
            //         // Return user object with token
            //         return { ...user, accessToken: user.token };
            //     } else {
            //         return null;
            //     }
            // }




        // })
    // ],


  
    //ASTA A FOST CEVA RESOLVE DE PE GITHUB PE CARE L-AM TESTAT 
    // callbacks: {
    //     async jwt({ token, user, account, isNewUser }) {// This user return by provider {} as you mentioned above MY CONTENT {token:}
    //       if (user) {
    //         if (user.token) {
    //           token = { accessToken: user.token };
    //         }
    //       }
    //       return token;
    //     },
    
    //     // That token store in session
    //     async session({ session, token }) { // this token return above jwt()
    //       session.accessToken = token.accessToken;
    //       //if you want to add user details info
    //       session.user = { name: "name", email: "email" };//this user info get via API call or decode token. Anything you want you can add
    //       return session;
    //     },
    //   },
// }