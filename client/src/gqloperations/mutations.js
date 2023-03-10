import { gql } from "@apollo/client";
export const SIGNUP_USER=gql`
mutation createUser($userNew:UserInput!){
    user:signupUser(userNew:$userNew){
      firstName
    }
  }
`
export const LOGIN_USER=gql`
mutation SigninUser($userSigninInput:UserSigninInput!){
    user:signinUser(userSignin:$userSigninInput){
      token
    }
  }
`
export const CREATE_CAR=gql`
mutation createCar($name:String!,$color:String){
    createCar(name:$name,color:$color)
  }
`

export const EDIT_CAR=gql`
mutation updateCar($name:String!,$color:String,$carId:String!){
  updateCar(name:$name,color:$color,carId:$carId)
}
`