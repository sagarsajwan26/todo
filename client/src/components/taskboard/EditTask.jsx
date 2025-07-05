import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask } from '../../store/adminThunk';
import { useNavigate } from 'react-router-dom';

function EditTask() {
  let selectedTask = useSelector(state => state.adminSlice.selectedTask);
  const navigate= useNavigate()

const [task, setTask] = useState({
  title: '',
  description: '',
  status: '',
  priority: '',
  completed: ''
});

useEffect(() => {
  if (selectedTask && Object.keys(selectedTask).length > 0) {
    setTask({
      title: selectedTask.title ?? '',
      description: selectedTask.description ?? '',
      status: selectedTask.status ?? '',
      priority: selectedTask.priority ?? '',
      completed: selectedTask.completed ?? ''
    });
  }
}, [selectedTask]);
const dispatch= useDispatch()

  const handleOnChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUpdate =async (e) => {
    e.preventDefault();
    console.log('Updated Task details:', task);
   const res= await dispatch(updateTask({id:selectedTask._id,data:task}))
   console.log(res);
   if(!res?.payload) return alert ('internal server error update failed')
    navigate('/taskboard')
  dispatch(getTasks())
     
  };

  return (
    <div>
      <form className="assignForm" onSubmit={handleUpdate}>
        <input
          className="assign-form-input"
          type="text"
          name="title"
          value={task.title}
          onChange={handleOnChange}
          placeholder="Enter title"
        />

        <input
          className="assign-form-input"
          type="text"
          name="description"
          value={task.description}
          onChange={handleOnChange}
          placeholder="Enter description"
        />

        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={handleOnChange}
        >
          <option value="">Select</option>
          <option value="todo">To do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          id="priority"
          value={task.priority}
          onChange={handleOnChange}
        >
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="completed">Completed</label>
        <select
          name="completed"
          id="completed"
          value={task.completed}
          onChange={handleOnChange}
        >
          <option value="">Select</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTask;
