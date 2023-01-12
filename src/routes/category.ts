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
 * /category:
 *    post:
 *      tags:
 *        - Category
 *      summary: "Crate a new category"
 *      responses:
 *        '200':
 *          description: Return a object with new category data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/category"
 *        '404':
 *          description: Have a error creating the category.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_CREATING_CATEGORIES"
 *      security:
 *        - bearerAuth: []
 */
router.post('/', checkJWT, addCategory);

/**
 * Post track
 * @openapi
 * /category/{id}:
 *    put:
 *      tags:
 *        - Category
 *      summary: "Edit a category"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the category to edit
 *      responses:
 *        '200':
 *          description: Return a object with category data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/category"
 *        '404':
 *          description: Have a error editing the category.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_UPDATING_CATEGORIES"
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id', checkJWT, editCategory);

/**
 * Post track
 * @openapi
 * /category/{id}:
 *    delete:
 *      tags:
 *        - Category
 *      summary: "Delete a category and subcategories associated"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the category to delete
 *      responses:
 *        '200':
 *          description: Return a object with account data.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "CATEGORY_DELETED"
 *        '404':
 *          description: Have a error deleting the category.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_DELETING_CATEGORY"
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', checkJWT, deleteCategory);

export { router };
