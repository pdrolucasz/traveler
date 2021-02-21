import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import routes from './routes'
import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(3333, () => {
    console.log('🚀 Server started')
})