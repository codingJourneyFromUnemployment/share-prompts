import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToAtlas } from "@utils/database";
import User from "@models/user";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     })
//   ],
//   async session({ session }){
//     const sessionUser = await User.findOne({ email: session.user.email });
//     session.user.id = sessionUser._id.toString();
//     return session;
//     //先从数据库中查找用户，然后将mongodb自动为文档生成的唯一id赋值给session.user.id，然后返回修改后的session,这样就可以通过这个session始终定位到数据库中特定的用户
//   },
//   async signIn({ profile }){
//     try {
//       await connectToAtlas();
//       //check if a user already exists
//       const userExists = await User.findOne({ email: profile.email });
//       //if not, create a new user and save to db
//       if(!userExists){
//         const newUser = new User({
//           username: profile.name,
//           email: profile.email,
//           image: profile.picture
//         });
//         await newUser.save();
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }
// })

// export { handler as GET, handler as POST}

const option = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();
    return session;
    //先从数据库中查找用户，然后将mongodb自动为文档生成的唯一id赋值给session.user.id，然后返回修改后的session,这样就可以通过这个session始终定位到数据库中特定的用户
  },
  async signIn({ profile }) {
    try {
      await connectToAtlas();
      //check if a user already exists
      const userExists = await User.findOne({ email: profile.email });
      //if not, create a new user and save to db
      if (!userExists) {
        const newUser = new User({
          username: profile.name,
          email: profile.email,
          image: profile.picture
        });
        await newUser.save();
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const handler = () => NextAuth(option);

export { handler as GET, handler as POST}