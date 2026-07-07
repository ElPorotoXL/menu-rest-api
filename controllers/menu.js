import { MenuModel } from '../models/db/menu.js'
import { validateMenu, validatePartialMenu } from '../schemas/menu.js'

export class MenuController {
    static async getAll (req, res) {
        try {
            const name = req.query.name
            const menuItems = await MenuModel.getAll({ name })
            res.json(menuItems)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getId (req, res) {
        try {
            const { id } = req.params
            const menuitem = await MenuModel.getId({ id })
            res.json(menuitem)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async create (req, res) {
        try {
            const result = validateMenu(req.body)
            if (result.error) {
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            const newMenuItem = await MenuModel.create({ data: result.data })
            res.status(201).json(newMenuItem)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async update (req, res) {
        try {
            const { id } = req.params
            const result = await MenuModel.update({ id, data: req.body })
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async delete (req, res) {
        try {
            const { id } = req.params
            const result = await MenuModel.delete({ id })
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}