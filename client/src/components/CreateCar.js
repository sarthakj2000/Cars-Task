import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { CREATE_CAR } from '../gqloperations/mutations';
import { GET_ALL_CARS, GET_HOME_PAGE, GET_MY_CARS } from '../gqloperations/queries';

const CreateCar = () => {
  const [name,setName]=useState("");
  const [color,setColor]=useState("");
  const [createCar,{loading,error,data}]= useMutation(CREATE_CAR)
  const handleSubmit=(e)=>{
    e.preventDefault();
    createCar({
      variables:{
        name:name,
        color:color
      }
    })
  }
  if(loading){
    return <h1>loading</h1>
  }
  if(error){
    console.log(error.message)
  }
  if(data){
    console.log(data)
  }
  return (
    <div className='container my-container'>
      {error &&<div className='red card-panel'>{error.message}</div>}
      {data &&<div className='green card-panel'>{data.createCar}</div>}
        <h5>Create Car</h5>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Car Name" required value={name} onChange={(e)=>{setName(e.target.value)}}  />
            <input type="text" placeholder="Car Colour" required value={color} onChange={(e)=>{setColor(e.target.value)}} />
            <button className='btn green' type="submit">Create Car</button>
        </form>
    </div>
  )
}

export default CreateCar