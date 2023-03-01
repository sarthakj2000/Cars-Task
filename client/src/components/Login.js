import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperations/mutations'

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [signinUser,{error,loading,data}] =useMutation(LOGIN_USER,{
      onCompleted(data){
        localStorage.setItem("token",data.user.token)
        navigate('/home')
    }
    })
    if(loading){
      return <h1>loading</h1>
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        signinUser({
          variables:{
            userSigninInput:{email,password}
          }
        })
        
  
    }
  return (
    <div className='container my-container'>
      {error &&<div className='red card-panel'>{error.message}</div>}
        <h5>Login</h5>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="email" placeholder="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
            <input type="password" placeholder="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <Link to="/signup"><p>Don't have an account?</p></Link>
            <button className='btn deep-purple' type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login