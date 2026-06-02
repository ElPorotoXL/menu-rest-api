import menu from '../menu.json' with { type: 'json' }

export class MenuModel {
    static getAll ({ name }) {
        if (name) {
            const filteredMenu = menu.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
            return filteredMenu
        } else {
            return menu
        }
    }
    static getId ({ id }) {
        const menuitem = menu.find(item => item.id == id)
        if (menuitem) return menuitem
        throw new Error('Menu item not found')
    }
    static create ({ data }) {
        const newMenuitem = {
            id: crypto.randomUUID(),
            ...data
        }
        menu.push(newMenuitem)
        return newMenuitem
    }
    static update ({ id, data }) {
        const menuitemIndex = menu.findIndex(item => item.id == id)
        if (menuitemIndex !== -1) {
            menu[menuitemIndex] = {
                ...menu[menuitemIndex],
                ...data
            }
            return menu[menuitemIndex]
        }
        throw new Error('Menu item not found')
    }
    static delete ({ id }) {
        const menuitemIndex = menu.findIndex(item => item.id == id)
        if (menuitemIndex !== -1) {
            menu.splice(menuitemIndex, 1)
            return true
        } else {
            throw new Error('Menu item not found')
        }
    }
}
