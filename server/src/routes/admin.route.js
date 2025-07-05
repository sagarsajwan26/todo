import Router from 'express'
import { adminLogin, AssignTask, createAdmin, createUser, DeleteTask, getUserList, tasks, updateTask } from '../controllers/admin.controller.js'
import { verifyJWT } from '../middleware/verifyJWT.js'

const router = Router()
router.route('/createAdmin').post(createAdmin)
router.route('/adminLogin').post(adminLogin)
router.route('/createUser').post(createUser)
router.route('/assignTask').post(verifyJWT,AssignTask)
router.route('/:id/deleteTask').delete(verifyJWT,DeleteTask)
router.route('/:id/updateTask').put(verifyJWT,updateTask)
router.route("/getTasks").get(verifyJWT,tasks)
router.route("/getUsers").get(verifyJWT,getUserList)
export default router