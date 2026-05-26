const z = require("zod")

const menuSchema = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required"
    }),
    price: z.number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required"
    }),
    description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required"
    }),
    rate: z.number({
        invalid_type_error: "Rate must be a number",
        required_error: "Rate is required"
    }).max(5)
})

const validateMenu = (object) => {
    return menuSchema.safeParse(object)
}

const validatePartialMenu = (object) => {
    return menuSchema.partial().safeParse(object)
}

module.exports = {
    validateMenu,
    validatePartialMenu
}