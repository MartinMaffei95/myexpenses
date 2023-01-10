import { Request, Response, Router } from 'express';
import {
  changePassword,
  deleteUser,
  editUser,
  getUser,
} from '../controllers/user';

import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * http//localhost:3001/user
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
router.get('/:id', checkJWT, getUser);

/**
 * Post track
 * @openapi
 * /user/{id}:
 *    put:
 *      tags:
 *        - Users
 *      summary: "Edit a user"
 *      description: Change your user information using this endpoint. If you want to change any specific data, send only that field. Return a new token
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account
 *      requestBody:
 *          description: Object with data for account.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  username:
 *                    type: string
 *                  my_categories:
 *                    description: The array who u send overwrites the old array
 *                    type: array
 *                    items:
 *                      type: string
 *      responses:
 *        '200':
 *          description: Return a object with account data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                  user:
 *                    $ref: "#/components/schemas/user"
 *        '404':
 *          description: Have a error creating the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_UPDATING_USER"
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id', checkJWT, editUser);

/**
 * Post track
 * @openapi
 * /user/{id}/changePass:
 *    put:
 *      tags:
 *        - Users
 *      summary: "Edit password"
 *      description: Change your password using this endpoint. Need send old pass and new. Return a new token
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account
 *      requestBody:
 *          description: Object with data for account.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userPassword:
 *                    type: string
 *                  newPassword:
 *                    type: string
 *                example:
 *                  userPassword: MyActualPassword
 *                  newPassword: MyNewPassword
 *      responses:
 *        '200':
 *          description: Return a object with account data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                  user:
 *                    $ref: "#/components/schemas/user"
 *        '404':
 *          description: Have a error editing the password.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_UPDATING_PASS"
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id/changePass', checkJWT, changePassword);

/**
 * Post track
 * @openapi
 * /user/{id}:
 *    delete:
 *      tags:
 *        - Users
 *      summary: "Delete a user"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account
 *      responses:
 *        '200':
 *          description: Return a object with account data.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "USER_DELETED"
 *        '404':
 *          description: Have a error deleting the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_DELETING_USER"
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', checkJWT, deleteUser);

export { router };
