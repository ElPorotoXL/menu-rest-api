import { Router } from 'express'
import { MenuController } from '../controllers/menu.js'

const routes = Router()

routes.get('/', MenuController.getAll)

routes.get('/:id', MenuController.getId)

routes.post('/', MenuController.create)

routes.patch('/:id', MenuController.update)

routes.delete('/:id', MenuController.delete)

export default routes