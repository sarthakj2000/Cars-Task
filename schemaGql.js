import {  gql } from "apollo-server";
const typeDefs=gql`
type Query{
    users:[User]
    user(_id:ID):User
    userSignedIn:User
    cars:[CarWithName]
    icar(by:ID):[Car]
    carsById(carId:ID):[Car]
    carsExceptThatUser:[CarWithName]
}
type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    cars:[Car]
}

type CarWithName{
    name:String
    color:String
    by:IdName
}

type IdName{
    _id:String
    firstName:String
}

type Car{
    name:String,
    color:String
    by:ID
}
type Token{
    token:String
}
type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createCar(name:String!,color:String):String
    updateCar(name:String!,carId:ID!):String
    deleteCar(carId:ID!):String
}
input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}
`
export default typeDefs