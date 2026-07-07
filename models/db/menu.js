import { query } from "../../db/db.js"

export class MenuModel {
    static async getAll () {
        const sql = 'SELECT * FROM Menu'
        const result = await query(sql)
        return result
    }
    static async getId ({ id }) {
        const sql = 'SELECT * FROM Menu WHERE IdMenu = ?'
        const result = await query(sql, [id])
        return result
    }
    static async create ({ data }) {
        const sql = 'INSERT INTO Menu (Name, Price, Description, Rate) VALUES (?, ?, ?, ?)'
        const result = await query(sql, [data.name, data.price, data.description, data.rate])
        return result
    }
    static async update ({ id, data }) {
        const sql = 'UPDATE Menu SET Name = ?, Price = ?, Description = ?, Rate = ? WHERE IdMenu = ?'
        const result = await query(sql, [data.name, data.price, data.description, data.rate, id])
        return result
    }
    static async delete ({ id }) {
        const sql = 'DELETE FROM Menu WHERE IdMenu = ?'
        const result = await query(sql, [id])
        return result
    }
}
