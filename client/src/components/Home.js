import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GET_HOME_PAGE } from '../gqloperations/queries'

const Home = () => {
   const {loading,error,data} =useQuery(GET_HOME_PAGE)
   if(loading) return <h1>loading</h1>
   if(error){
    console.log(error.message)
   }
   if(data.carsExceptThatUser.length==0){
    return <h2>No Cars Availaible!</h2>
   }
  return (
    <div className='container'>
        <table className='striped'>
        <thead>
          <tr>
              <th>Car Name</th>
              <th>Color</th>
              <th>Created By</th>
          </tr>
        </thead>

        <tbody>
          {data.carsExceptThatUser.map((item)=>{
            return <tr>
            <td>{item.name}</td>
            <td>{item.color}</td>
            <td>{item.by.firstName}</td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
  )
}

export default Home