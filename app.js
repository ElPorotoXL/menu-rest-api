const express = require('express')
const menu = require('./menu.json')
const cors = require('cors')
const { validateMenu } = require('./menu.js')
const { validatePartialMenu } = require('./menu.js')
const path = require('path')

const app = express()

app.use(cors())

app.use(express.json())

app.disable('x-powered-by')

app.use('/img', express.static(path.join(__dirname, 'img')))


app.get("/menu", (req, res) => {
    const name = req.query.name
    if (name) {
        const filteredMenu = menu.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
        res.json(filteredMenu)
    } else {
        res.json(menu)
    }
})
app.get("/menu/:id", (req, res) => {
    const { id } = req.params
    const menuitem = menu.find(item => item.id == id)
    if (menuitem) return res.json(menuitem)
    res.status(404).json({ error: "menuitem not found" })
})

app.post("/menu", (req, res) => {
    const result = validateMenu(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMenuitem = {
        id: crypto.randomUUID(),
        ...result.data
    }
    menu.push(newMenuitem)
    res.status(201).json(newMenuitem)
})

app.patch("/menu/:id", (req, res) => {
    const { id } = req.params
    const menuitemIndex = menu.findIndex(item => item.id == id)
    if (menuitemIndex !== -1) {
        const result = validatePartialMenu(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const updatedMenuitem = {
            ...menu[menuitemIndex],
            ...result.data
        }
        menu[menuitemIndex] = updatedMenuitem
        res.json(updatedMenuitem)
    } else {
        res.status(404).json({ error: "menuitem not found" })
    }
})

app.delete("/menu/:id", (req, res) => {
    const { id } = req.params
    const menuitemIndex = menu.findIndex(item => item.id == id)
    if (menuitemIndex !== -1) {
        menu.splice(menuitemIndex, 1)
        res.json({ message: "menuitem deleted" })
    } else {
        res.status(404).json({ error: "menuitem not found" })
    }
})



const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})