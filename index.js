const express = require("express")
const logger = require('./middlewares/logger')


const app = express()

app.use(express.json())
app.use(logger)

app.get("/", (req, res)=> {
    res.send("Hello world")
})



app.listen(5000, () => {
    console.log("Listening at port 5000")
})
