import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import EditModal from "./EditModal"
import { GET_ALL_CARS, GET_HOME_PAGE, GET_MY_CARS } from '../gqloperations/queries'

const MyCars = () => {
   const {loading,error,data} =useQuery(GET_MY_CARS)
   const [modal,setModal]=useState(false)
   const [editObj,setEditObj]=useState({})
   const toggle1 = () => setModal(!modal);
   if(loading) return <h1>loading</h1>
   if(error){
    console.log(error.message)
   }
   if(data.userSignedIn.cars.length==0){
    return <h2>No Cars Availaible!</h2>
   }
   const onCLick=(obj)=>{
    setEditObj(obj)
    toggle1()
   }
  return (
    <div className='container'>
      {modal ?<EditModal
                    toggle={toggle1}
                    isOpen={modal}
                    editObj={editObj}
                  />:
                  <table className='striped'>
        <thead>
          <tr>
              <th>Car Name</th>
              <th>Color</th>
          </tr>
        </thead>

        <tbody>
          {console.log("data.userSignedIn",data.userSignedIn)}
          {data.userSignedIn.cars.map((item)=>{
            return <tr>
            <td>{item.name}</td>
            <td>{item.color}</td>
            <td onClick={()=>{onCLick({name:item.name,color:item.color,carId:item._id})}}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO3Uu00DQRCA4U/GASTQgHNOTkmIKQAKQHRAAVABuSkACgDJKaFDElrgEWAHDrnUh1YapBMSZ1j2IvilDfYx/6xmH/xVxnjGFJul5RVe0US7w1Zf8qZkkuoLeZEk1Rr5r5JU35RnJRlj8QP5R5v2KW/wuE6+jXmmfBGb6+Q4Ftd9yBM3EXCK29LydAPesMII+yXlicMIuo/+Bh5KyRNXEXjeGhtgr1W6bPkQywhOD6zNKM6kzpUnDlq7u8AuzqJcq9bcPEeemHTUuo4bdYIdmTx9ki5xjaNSf/4ML7iMcg1LSP/RxTsAhKp4GUmzHwAAAABJRU5ErkJggg==" /></td>
          </tr>
          })}
          
        </tbody>
      </table>
                  }
        
      
    </div>
  )
}

export default MyCars