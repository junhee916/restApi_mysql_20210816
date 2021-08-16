const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')

const userRouter = require('./router/user')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))

// connected router
app.use('/user', userRouter)

const PORT = 5000 || 7000

app.listen(PORT, console.log("connected server..."))