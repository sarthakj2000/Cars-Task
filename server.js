import { ApolloServer } from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import typeDefs from "./schemaGql.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on("error",(err)=>{
    console.log("error in connecting",err)
})
//import models here
import './models/Cars.js'
import './models/User.js'
import resolvers from "./resolvers.js";

//this is authorization middleware
const context = ({req})=>{
    const { authorization } = req.headers;
    if(authorization){
     const {userId} = jwt.verify(authorization,JWT_SECRET)
     return {userId}
    }
}

const server= new ApolloServer({
    typeDefs,
    context,
    resolvers,
    
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
})