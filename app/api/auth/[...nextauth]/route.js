import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToAtlas } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  async session({ session }){

  },
  async signIn({ profile }){
    try {
      await connectToAtlas();
      //check if a user already exists

      //if not, create a new user and save to db

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
})

export { handler as GET, handler as POST}