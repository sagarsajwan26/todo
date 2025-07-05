import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignNewTask, getUsers} from '../../store/adminThunk'
import { useNavigate } from 'react-router-dom'

function TaskboardAssign() {
  
  const [users, setUsers] = useState([])
const navigate= useNavigate()
  const [formData, setFormData]= useState({
    title:'',
    description:'',
    assignedTo:'',
    priority:''
  })
const dispatch= useDispatch()
let userList= useSelector(state=> state.adminSlice.userList)




  const handleFormChange= (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  
    
  }

  useEffect(()=>{
    setUsers(userList)
  },[userList])

  const handleAddTask=async(e)=>{
    e.preventDefault()
   const res= await dispatch(assignNewTask(formData))
    console.log(res);

    if(res?.payload?.message!=='success') return alert("internal server error failed to upload data")
      return navigate('/taskboard')
    
    
  }


  return (
    <div>
      <form className='assignForm' action="" onSubmit={handleAddTask}>
        <input className='assign-form-input' type="text" name='title' onChange={handleFormChange} placeholder='enter title' />
      
        <input className='assign-form-input' type="text" name='description' onChange={handleFormChange} placeholder='enter description' />
    <label htmlFor="assignedTo">assignedto</label>
     <select name="assignedTo" id='assignedTo' onChange={handleFormChange}  >
      <option value="">select </option>
      {
        users.length!==0 && users.map(user=>(
          <option key={user._id} value={user._id}>{user.username}</option>
        ))
      }
     </select>
      <label htmlFor="priority">Priority</label>
     <select name="priority" id="priority" onChange={handleFormChange}>
      <option value=""></option>
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>

     </select>
      <button type="submit">
        Assign
      </button>
      </form>

    </div>
  )
}

export default TaskboardAssign