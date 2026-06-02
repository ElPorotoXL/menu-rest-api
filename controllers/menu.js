import { MenuModel } from '../models/menu.js'
import { validateMenu, validatePartialMenu } from '../schemas/menu.js'

export class MenuController {
    static async getAll (req, res) {
    const name = req.query.name
    const menuItems = await MenuModel.getAll({ name })
    res.json(menuItems)
}

    static async getId (req, res) {
    const { id } = req.params
    const menuitem = await MenuModel.getId({ id })
    res.json(menuitem)
}

    static async create (req, res) {
    const result = validateMenu(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMenuItem = await MenuModel.create({ data: result.data })
    res.status(201).json(newMenuItem)
}

    static async update (req, res) {
    const { id } = req.params
    const result = await MenuModel.update({ id, data: req.body })
    res.json(result)
}

    static async delete (req, res) {
    const { id } = req.params
    const result = await MenuModel.delete({ id })
    res.json(result)
}
}