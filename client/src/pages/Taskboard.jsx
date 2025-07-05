import React from 'react'
import TaskboardSidebar from '../components/taskboard/TaskboardSidebar'
import TaskboardMain from '../components/taskboard/TaskboardMain'
import { Outlet } from 'react-router-dom'

function Taskboard() {
  return (
    <div className='taskbaord-main'>
        <TaskboardSidebar/>
       <Outlet/>

    </div>
  )
}

export default Taskboard