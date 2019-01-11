const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const sha256 = require('crypto-js/sha256');

mongoose.connect("mongodb://localhost/mern");

const User = mongoose.model('User',{
    username:String,
    email:String,
    pwd:String,
    admin:Boolean
});

const typeDefs = `
  type Query {
    users:[User]
  }
  type User {
      id: ID!
      username : String! 
      email: String!
      pwd: String!
      admin: Boolean!
  }
  type Mutation {
      createUser(username: String!,email: String!,pwd: String!,admin: Boolean!): User,
      updateUsername(id: ID!, name: String!): User,
      removeUser(id:ID!): Boolean,
      removeAllUsers(id:ID!) :Boolean,
      login(identifier:String!,pwd:String!):User
  }
`

const resolvers = {
  Query: {
    users: ()=> User.find(),
    
  },
  Mutation: {
      createUser: async(_, { username,email, pwd, admin}) =>{
        let usernameExists = false;
        let emailExists = false;
        await User.findOne({username:username},function(err,u){
            if(u != null){
                usernameExists = true;
            }
        })
        await User.findOne({email:email},function(err,u){
            if(u != null){
                emailExists = true;
            }
        })
        
        if(usernameExists == true && emailExists == true){
            throw new Error("Username & email already exists");
        }
        if(usernameExists == true){
            throw new Error("Username already exists");
        }
        if(emailExists == true){
            throw new Error("Email already exists");
        }
        else{
            pwd = sha256(pwd).toString();
            const user = new User({username,email,pwd,admin});
            await user.save();
            return user;
        }
       
      },
      updateUsername: async(_, {id, name}) =>{
        await User.findByIdAndUpdate(id,{name});
        return User.findById(id);
      },
      removeUser: async(_,{id}) =>{
        await User.findByIdAndRemove(id);
        return true;
      },//Just for testing purposes
      removeAllUsers: async(_,{id}) =>{
        await User.deleteMany({});
        return true;
      },
      login: async(_,{identifier,pwd})=>{
        //Email
        if(identifier.indexOf('@') > -1){
            let equal = null;
            const u = await User.findOne({email:identifier},function(err,user){
                if(err){
                    //throw err;
                }
                if(user != null){
                    pwd = sha256(pwd).toString();
                    if(pwd === user.pwd){
                        equal = true;
                    }
                    else
                        equal = false;
                }
            });

            if(equal == null){
                throw new Error("Email not found");
            }
            if(equal == false){
                throw new Error("Password incorrect");
            }
            else{
                return u;
            }
        }
        // Username
        else{
            let equal = null;
            const u = await User.findOne({username:identifier},function(err,user){
                if(err){
                    //throw err;
                }
                if(user != null){
                    pwd = sha256(pwd).toString();
                    if(pwd === user.pwd){
                        equal = true;
                    }
                    else
                        equal = false;
                }
            });

            if(equal == null){
                throw new Error("Username not found");
            }
            if(equal == false){
                throw new Error("Password incorrect");
            }
            else{
                return u;
            }
        }
      }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

mongoose.connection.once("open",function(){
    server.start(() => console.log('Server is running on localhost:4000'))
})
