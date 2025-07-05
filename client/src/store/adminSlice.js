
import { createSlice } from '@reduxjs/toolkit'
import { adminLogin, getTasks, getUsers } from './adminThunk'

const initialState={
    isLoggedIn:false,
    adminData:null,
    selectedTask:null,
    userList:[],
    selectedUser:null,
    tasks:[],
    
}


const adminSlice= createSlice({
    name:'admin',
    initialState,
    reducers:{
        setSelectedTask:(state,action)=>{
            state.selectedTask=action.payload
        }
    },
    extraReducers:(builder)=>{
builder.addCase(adminLogin.pending,(state,action)=>{
    state.isLoggedIn= false
})
builder.addCase(adminLogin.fulfilled,(state,action)=>{
    state.isLoggedIn= true
state.adminData= action.payload
localStorage.setItem("isLoggedIn",state.isLoggedIn)
localStorage.setItem('adminData',JSON.stringify(state.adminData))

})
builder.addCase(adminLogin.rejected,(state,action)=>{
state.adminData= null
state.isLoggedIn= false
})


builder.addCase(getUsers.pending,(state,action)=>{
    state.userList= []
})
builder.addCase(getUsers.fulfilled,(state,action)=>{
    state.isLoggedIn= true
state.userList= action.payload

})
builder.addCase(getUsers.rejected,(state,action)=>{
state.userList= []

})


builder.addCase(getTasks.pending,(state,action)=>{
    state.tasks= []
})
builder.addCase(getTasks.fulfilled,(state,action)=>{
    
state.tasks= action.payload

})
builder.addCase(getTasks.rejected,(state,action)=>{
state.userList= []

})




    }
})


export const {setSelectedTask} = adminSlice.actions 
export default adminSlice.reducer