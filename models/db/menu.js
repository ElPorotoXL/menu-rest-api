import { query } from "../../db/db.js"

export class MenuModel {
    static async getAll () {
        const sql = 'SELECT * FROM menu'
        const result = await query(sql)
        return result
    }
    static async getId ({ id }) {
        const sql = 'SELECT * FROM menu WHERE idmenu = ?'
        const result = await query(sql, [id])
        return result
    }
    static async create ({ data }) {
        const sql = 'INSERT INTO menu (name, price, description, rate) VALUES (?, ?, ?, ?)'
        const result = await query(sql, [data.name, data.price, data.description, data.rate])
        return result
    }
    static async update ({ id, data }) {
        const sql = 'UPDATE menu SET name = ?, price = ?, description = ?, rate = ? WHERE idmenu = ?'
        const result = await query(sql, [data.name, data.price, data.description, data.rate, id])
        return result
    }
    static async delete ({ id }) {
        const sql = 'DELETE FROM menu WHERE idmenu = ?'
        const result = await query(sql, [id])
        return result
    }
}
