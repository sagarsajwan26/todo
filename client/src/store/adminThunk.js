import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../utils/axios";

export const adminLogin =createAsyncThunk('/admin/adminLogin',async(data)=>{
    console.log(data);
    
    try {
        const res= await axiosInstance.post('/admin/adminLogin',data)
    return res.data.admin        

    } catch (error) {
        console.log(error);
        
    }
})

export const getTasks =createAsyncThunk('/admin/getTasks',async()=>{
 
    try {
        const res= await axiosInstance.get('/admin/getTasks')

console.log(res);
return res.data.tasks

    } catch (error) {
        console.log(error);
        
    }
})
export const getUsers =createAsyncThunk('/admin/getUsers',async()=>{
 
    try {
        const res= await axiosInstance.get('/admin/getUsers')
      
return res.data.user

    } catch (error) {
        console.log(error);
        
    }
})

export const assignNewTask =createAsyncThunk('/admin/assignTask',async(data)=>{


    
    try {
        const res= await axiosInstance.post('/admin/assignTask',data)
     console.log(res);
     
        return res.data

    } catch (error) {
        console.log(error);
        
    }
})



export const deleteTask =createAsyncThunk('/admin/delete',async(id)=>{

    
    try {
        const res= await axiosInstance.delete(`/admin/${id}/deleteTask`)
       return res.data

    } catch (error) {
        console.log(error);
        
    }
})



export const updateTask =createAsyncThunk('/admin/updateTask',async({id,data})=>{

    console.log(id,data);
   
    try {
        const res= await axiosInstance.put(`/admin/${id}/updateTask`,data)
       
        
     return res.data
        

    } catch (error) {
        console.log(error);
        
    }
})