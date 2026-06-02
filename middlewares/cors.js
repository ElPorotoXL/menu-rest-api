import cors from 'cors'

export default function corsMiddleware() {
    return cors({
    origin: (origin, callback) => {
        const ACEPTED_ORIGINS = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:8080',
            'https://menu-rest-api.onrender.com',
            'http://127.0.0.1:5500'
        ]
        if (ACEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
})}
