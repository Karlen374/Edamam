import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
import cors from 'cors'



const PORT = 5000
const DB_URL=`mongodb+srv://Karlen:123@cluster0.mq8cpke.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use (
  cors()
)

app.use(express.json())
app.use(express.static('static'))
app.use('/auth', authRouter)


async function startApp(){
  try{
    await mongoose.connect(DB_URL,{useUnifiedTopology: true , useNewUrlParser: true})
    app.listen(PORT, ()=>console.log('work'))
  }
  catch(e){
    console.log(e)
  }
}

startApp()

