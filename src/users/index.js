const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const uuid = require("uuid/v1")
const { check, validationResult} = require("express-validator")

const router = express.Router()

const fileLocation = path.join(__dirname, "jeff.json")

const readUsers = async () =>{
    const buffer = await fs.readFile(fileLocation)
    const stringVersion = buffer.toString();
    return JSON.parse(stringVersion)
}

//both of them, will start from /users

//this will be /users/
router.get("/", async (req, res) => {
    const users = await readUsers();
    res.send(users)
})

router.get("/:id", async (req, res) => {
    const users = await readUsers();
    res.send(users.find(x => x.id === req.params.id))
})

router.post("/", 
[check("name").isLength({ min: 4})]
,async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors})

    const users = await readUsers();
    req.body.id = uuid()
    users.push(req.body)
    await fs.writeFile(fileLocation, JSON.stringify(users))

    res.status(201).send("Created")
})



// // this will be /users/jeffRoute
// router.get("/jeffRoute", (req,res) =>{
//     res.send("You did it!")
// })

//     VERB URL    What we are doing

module.exports = router;

