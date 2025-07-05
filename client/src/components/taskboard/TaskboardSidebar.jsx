import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function TaskboardSidebar() {
    const navigate= useNavigate()

    const navItems= [
        {
            path:"/taskboard",
            name:"Homepage"
        },
        {
            path:"/taskboard/assignTask",
            name:"assignTask"
        },
         
    
    
    ]
  return (
    <div className='sidebar' > 
    <h1 className='sidebar-heading' >Sidebar</h1>
    {
        navItems.map((item,index)=>(
            <NavLink className='navItem' key={index} to={item.path}>
                {item.name}
            </NavLink>
        ))
        }
        
        <span>
            <button
            className='btn'
            onClick={()=>{
                localStorage.clear();
                navigate('/')
            }}>
                logout
            </button>
        </span>
        </div>
  )
}

export default TaskboardSidebar