import express from "express"
import 'dotenv/config'
import userRouter from './routes/user.routes'
import accountRouter from './routes/account.routes'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);

app.listen(3000, () => {
  console.log(`Server started at PORT: 3000`)
})