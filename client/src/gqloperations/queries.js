import { gql } from "@apollo/client";
export const GET_ALL_CARS=gql`
query getAllCars{
    cars{
        name
        color
        by{
            firstName
        }
    }
}
`
export const GET_HOME_PAGE=gql`
query homePage{
    carsExceptThatUser{
      name
      color
      by{
        firstName
      }
    }
  }
`
export const GET_MY_CARS=gql`
query getMyCars{
    userSignedIn{
        _id
        firstName
        cars{
            _id
            name
            color
        }
      }
}
`