import express from 'express'
import cors from 'cors'
import { router } from './routes';

const app = express()
app.use(cors(
    // { origin: [] }// pode pasar a orgem do frontend que fará a requisição
));

app.use(express.json())
app.use(router)

export { app }