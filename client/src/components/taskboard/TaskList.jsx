import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks } from '../../store/adminThunk';
import { setSelectedTask } from '../../store/adminSlice';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const taskList = useSelector(state => state.adminSlice.tasks) || [];
  const [sort, setSort] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTask(id));
    await dispatch(getTasks());
  };

  const handleEditTask = async (task) => {
    await dispatch(setSelectedTask(task));
    navigate(`/taskboard/${task._id}/editTask`);
  };

  const priorityOrder = {
    low: 1,
    medium: 2,
    high: 3
  };

  const sortedTask = useMemo(() => {
    if (!sort) return taskList;
    return [...taskList].sort((a, b) => {
      const PriorityA = priorityOrder[a.priority] || 0;
      const PriorityB = priorityOrder[b.priority] || 0;
      return PriorityA - PriorityB;
    });
  }, [sort, taskList]);

  return (
    <>
      <label htmlFor="sort">Filter by Priority:</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Select</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="task-container">
        {sortedTask && sortedTask.length > 0 ? (
          sortedTask.map((task) => (
            <div className="task-item" key={task._id}>
              <div className="task-content">
                <h2 className={task.status === 'done' ? "task-done" : ""}>{task.title}</h2>
                <p className={task.status === 'done' ? "task-done" : ""}>{task.description}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found or you are not authorized. Please log in.</p>
        )}
      </div>
    </>
  );
}

export default TaskList;
