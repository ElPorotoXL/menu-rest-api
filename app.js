import express from 'express'
import corsMiddleware from './middlewares/cors.js'
import routes from './routers/menu.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
BigInt.prototype.toJSON = function() { return this.toString() }

const app = express()

app.use(corsMiddleware())

app.use(express.json())

app.disable('x-powered-by')

app.use('/menu', routes)

app.use('/', express.static(path.join(__dirname, 'web')))

app.use('/img', express.static(path.join(__dirname, 'img')))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})