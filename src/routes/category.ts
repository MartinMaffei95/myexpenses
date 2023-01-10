import { Request, Response, Router } from 'express';
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../controllers/categories';
import { checkJWT } from '../middleware/session';
import { deleteOneCategory } from '../services/category.services';

const router = Router();

/**
 * http//localhost:3001/category
 */

/**
 * Post track
 * @openapi
 * /user/{id}:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Get a user data by id"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account to get
 *      responses:
 *        '200':
 *          description: Return a object with account data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/account"
 *        '404':
 *          description: Have a error creating the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_DELETING_USER"
 *      security:
 *        - bearerAuth: []
 */
router.post('/', checkJWT, addCategory);

router.put('/:id', checkJWT, editCategory);

router.delete('/:id', checkJWT, deleteCategory);

export { router };
