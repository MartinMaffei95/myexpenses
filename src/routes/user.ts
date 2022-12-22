import { Request, Response, Router } from 'express';
import { getUser } from '../controllers/user';

import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

/**
 * Post track
 * @openapi
 * /user/{id}:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Delete a account"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account to get
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
 *                  description:
 *                    type: string
 *                  balance:
 *                    type: number
 *                  currency:
 *                    type: string
 *                  type:
 *                    type: string
 *                  color:
 *                    type: string
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
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the account to get
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
 *                  description:
 *                    type: string
 *                  balance:
 *                    type: number
 *                  currency:
 *                    type: string
 *                  type:
 *                    type: string
 *                  color:
 *                    type: string
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
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id', checkJWT);

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
 *          description: ID of the account to get
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
 *                  description:
 *                    type: string
 *                  balance:
 *                    type: number
 *                  currency:
 *                    type: string
 *                  type:
 *                    type: string
 *                  color:
 *                    type: string
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
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', checkJWT);

export { router };
