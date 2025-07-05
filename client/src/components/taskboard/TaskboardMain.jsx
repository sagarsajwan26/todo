import React, { useEffect, useState } from 'react'
import TaskboardAssign from './TaskboardAssign'
import TaskList from './TaskList'
import { useDispatch } from 'react-redux'
import { getTasks, getUsers } from '../../store/adminThunk'

function TaskboardMain() {
 const [tasks, setTasks] =useState([])
 
  const dispatch =  useDispatch()
useEffect(()=>{
dispatch(getTasks())
},[])
  useEffect(()=>{
    dispatch(getUsers())
  },[])
   

  return (
    <div>
        <h1>Todos</h1>


    <div>
      <TaskList />
    </div>
      
    </div>
  )
}

export default TaskboardMain