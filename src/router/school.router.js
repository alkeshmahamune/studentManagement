import express from "express"
import { addSchool,listSchools } from "../controllers/school.controller.js"

const router=express.Router()

// router for add school 
router.post('/addSchool',addSchool)

// router for listing schools 
router.get('/listSchools',listSchools)

export default router