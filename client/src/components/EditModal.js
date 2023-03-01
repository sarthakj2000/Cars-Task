import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import { EDIT_CAR } from "../gqloperations/mutations";
import { GET_MY_CARS } from "../gqloperations/queries";

const CarModal = (props) => {
  const { toggle, isOpen,editObj  } = props;
    const [name,setName]=useState(editObj.name)
    const [color,setColor]=useState(editObj.color)
    const [editCar,{loading,error,data}]= useMutation(EDIT_CAR,{
        refetchQueries:[GET_MY_CARS]
    })
    const handleSubmit=()=>{
        editCar({
            variables:{
              name:name,
              color:color,
              carId:editObj.carId
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
    <div>
        <Modal isOpen={isOpen} toggle={toggle} >
          <ModalHeader>Edit Car</ModalHeader>
          <ModalBody>
            <label for="name" >Name</label>
            <input id="name" type="text" placeholder="Car Name" required value={name} onChange={(e)=>{setName(e.target.value)}}  />
            <label for="color" >Color</label>
            <input id="color" type="text" placeholder="Car Colour" required value={color} onChange={(e)=>{setColor(e.target.value)}} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{handleSubmit()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};

export default CarModal;
