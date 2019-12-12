const express = require("express")
const userRouter = require("./src/users")
const cors = require("cors")

const server = express();
//should be before the routes that uses it
server.use(cors())
server.use(express.json())

server.use("/users", userRouter)
server.get("/", (req, res)=>{
    res.send({
        name: "Jeff",
        role: "Student"
    })
})

server.listen(3500, () => {
    console.log("hey man, the server is running on 3500")
})