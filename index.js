const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use('/api',userRouter)
app.use('/api',postRouter)

app.get('/',(req, res) => {
    res.send("Hi I am yugam")
})

app.listen(3000,()=>{
    console.log('server is live on port 3000')
})