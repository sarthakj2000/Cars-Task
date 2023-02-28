import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_CARS, GET_HOME_PAGE, GET_MY_CARS } from '../gqloperations/queries'

const MyCars = () => {
   const {loading,error,data} =useQuery(GET_MY_CARS)
   if(loading) return <h1>loading</h1>
   if(error){
    console.log(error.message)
   }
   if(data.userSignedIn.cars.length==0){
    return <h2>No Cars Availaible!</h2>
   }
  return (
    <div className='container'>
        <table className='striped'>
        <thead>
          <tr>
              <th>Car Name</th>
              <th>Color</th>
          </tr>
        </thead>

        <tbody>
          {data.userSignedIn.cars.map((item)=>{
            return <tr>
            <td>{item.name}</td>
            <td>{item.color}</td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
  )
}

export default MyCars