const express = require("express")
const router = express.Router()
const { getTasks, postTasks, updateTasks, deleteTask } = require("../controller/taskController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/",getTasks)

router.post("/", postTasks)

router.put("/", updateTasks)

router.delete("/:id", deleteTask)

module.exports = router