import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_HOME_PAGE } from '../gqloperations/queries'
import Paginations from './Paginations'

const Home = () => {
   const {loading,error,data} =useQuery(GET_HOME_PAGE)
   const [currentPage,setCurrentPage]=useState(1);
   const [postsPerPage,setPostsPerPage]=useState(5);
   if(loading) return <h1>loading</h1>
   if(error){
    console.log(error.message)
   }
   if(data.carsExceptThatUser.length==0){
    return <h2>No Cars Availaible!</h2>
   }

   const lastPostIndex=currentPage*postsPerPage
   const firstPostIndex=lastPostIndex-postsPerPage;
   const cars=data.carsExceptThatUser.slice(firstPostIndex,lastPostIndex)
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
          {cars.map((item)=>{
            return <tr>
            <td>{item.name}</td>
            <td>{item.color}</td>
            <td>{item.by.firstName}</td>
          </tr>
          })}
          
        </tbody>
      </table>
      <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPosts={data.carsExceptThatUser.length} postsPerPage={postsPerPage} />
    </div>
  )
}

export default Home