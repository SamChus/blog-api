const express = require("express")
const logger = require('./middlewares/logger')
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes");

const port = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(logger)

app.use("/api", userRoutes)
app.use("/api/post", postRoutes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

