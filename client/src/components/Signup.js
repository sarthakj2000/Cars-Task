import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqloperations/mutations'
import { GET_ALL_CARS, GET_HOME_PAGE, GET_MY_CARS } from '../gqloperations/queries'

const Signup = () => {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [signupUser, {data,loading,error}]= useMutation(SIGNUP_USER)
    if(loading){
      return <h1>loading</h1>
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        signupUser({
          variables:{
            userNew:{firstName,lastName,email,password}
          }
        })
    }
  return (
    <div className='container my-container'>
        {error &&<div className='red card-panel'>{error.message}</div>}
        {data && data.user && <div className='green card-panel'>{data.user.firstName} is Signed up. You can log in now!.</div>}
        <h5>Sign Up</h5>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="First Name" required value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}  />
            <input type="text" placeholder="Last Name" required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  />
            <input type="email" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
            <input type="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <Link to="/login"><p>Already have an account?</p></Link>
            <button className='btn deep-purple' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Signup