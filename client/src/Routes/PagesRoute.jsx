import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Taskboard from '../pages/Taskboard'
import TaskboardMain from '../components/taskboard/TaskboardMain'
import TaskboardAssign from '../components/taskboard/TaskboardAssign'
import EditTask from '../components/taskboard/EditTask'
function PagesRoute() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route  element={<ProtectedRoute/> }>
                    <Route path='/taskboard' element={<Taskboard/>}>
                    <Route path='' element={<TaskboardMain/>}/>
                    <Route path='assignTask' element={<TaskboardAssign/>} />
                  <Route path=':id/editTask' element={<EditTask/>}></Route>
                    </Route>
            </Route>

        </Routes>


    </BrowserRouter>
  )
}

export default PagesRoute