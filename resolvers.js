import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User=mongoose.model('User')
const Car=mongoose.model("Car")


const resolvers={
    Query:{
        // get all users
        users:async()=>{
            return await User.find({})
        },

        //get single user
        user:async(_,{_id})=>await User.findOne({_id:_id}),

        //get signedin user
        userSignedIn:async(_,args,{userId})=> {
            if(!userId){
                throw new Error("You must be logged in")
            }
            return await User.findById({_id:userId})
            
        },

        //get all car created by user
        icar:async(_,{by})=>await Car.find({by:by}),

        //get all cars
        cars:async()=>{
            return await Car.find({}).populate("by","_id firstName")
        },

        //get car by carID
        carsById:async(_,{carId})=> await Car.findById({_id:carId}),

        carsExceptThatUser:async(_,args,{userId})=> {
            console.log("userId",userId)
            if(!userId){
                throw new Error("You must be logged in")
            }
            
            let cars= await Car.find({})
            if(cars.length==0){
                return []
            }
            cars= await Car.find({}).populate("by","_id firstName")
            cars=cars.filter((car)=>car.by._id!=userId)
            // console.log("cars",cars,mongoose.Types.ObjectId(userId))
            return cars
        }
    },
    User:{
        cars:async(ur)=>await Car.find({by:ur._id})
    },
    Mutation:{
        //sign up user
        signupUser:async(_,{userNew})=>{
           const user=await User.findOne({email:userNew.email})
           if(user){
            throw new Error("User already exist with that email")
           }
           const hashedPassword =await bcrypt.hash(userNew.password,10)
           const newUser=new User({
            ...userNew,
            password:hashedPassword
           })
           return await newUser.save()
        },

        //sign in user
        signinUser:async(_,{userSignin})=>{
           const user=await User.findOne({email:userSignin.email})
           if(!user){
            throw new Error("User does not exists with that email ")
           }
           const isMatch=await bcrypt.compare(userSignin.password,user.password)
           if(!isMatch){
            throw new Error("email or password is invalid")
           }
           const token=jwt.sign({userId:user._id},JWT_SECRET)
           return {token}
         },

         //create car
         createCar:async(_,{name,color},{userId})=>{
            
            if(!userId){
                throw new Error("You must be logged in")
            }
            const newCar= new Car({
                name,
                color,
                by:userId
            })
            await newCar.save()
            return "Car saved successfully"
         },

         //update user
         updateCar:async(_,{name,carId},{userId})=>{
            
            if(!userId){
                throw new Error("You must be logged in")
            }
            let carExist=await Car.find({_id:carId})
            if(carExist.length==0){
                throw new Error("Car Does not exist")
            }
            let carFeilds={};
            if(name) carFeilds.name=name

            await Car.findByIdAndUpdate(
                {_id:carId},
                { $set: carFeilds },
                { new: true }
              );
            return "Car updated successfully"
         },

         //delete user
         deleteCar:async(_,{carId},{userId})=>{
            
            if(!userId){
                throw new Error("You must be logged in")
            }
            let carExist=await Car.find({_id:carId})
            if(carExist.length==0){
                throw new Error("Car Does not exist")
            }
            await Car.findOneAndDelete({_id:carId})
            return "Car deleted successfully"
         }
    }
}
export default resolvers