
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express();
//dotenv.config

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000
const CONNECTION_URL="mongodb+srv://ruslankomissarov:Vtkrjyju18@cluster0.i3vhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));


