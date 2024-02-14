const express=require('express');

const usercontroller=require('../Controllers/userController')

const projectController=require('../Controllers/projectController')

const jwtMiddleware =require("../Middlewares/jwtMiddleware")

const multerConfig=require('../Middlewares/multerMiddleware')

// create router object of express to define path
const router=new express.Router()

// using router object to define path

// Register API path -http://localhost:4000/register
router.post('/register',usercontroller.register)

// Login API path
router.post('/login',usercontroller.login)

// add user project API path - http://localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

// get all users projects path - http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

// get all projects path - http://localhost:4000/project/all-project
router.get('/project/all-project',jwtMiddleware,projectController.getAllProjects)

// get home project path - http://localhost:4000/project/home-project
router.get('/project/home-project',projectController.getHomeProject)

// update project - http://localhost:4000/project/update-project
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.UpdateProject)

// delete project -http://localhost:4000/project/delete-project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.DeleteProject)

module.exports=router