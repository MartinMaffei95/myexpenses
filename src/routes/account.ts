import { Request, Response, Router } from 'express';
import {
  createNewAccount,
  deleteAccountData,
  getAccountData,
  updateAccountData,
} from '../controllers/account';
import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * Post track
 * @openapi
 * /accounts/{id}:
 *    get:
 *      tags:
 *        - Accounts
 *      summary: "Get a account data by Id"
 *      description: Get a account data using parameterid.
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
 *      security:
 *        - bearerAuth: []
 */
router.get('/:id', checkJWT, getAccountData);

/**
 * Post track
 * @openapi
 * /accounts/:
 *    post:
 *      tags:
 *        - Accounts
 *      summary: "Create a new account"
 *      description: Create a new account with name and description for storage transactions.
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
router.post('/', checkJWT, createNewAccount);

/**
 * Post track
 * @openapi
 * /accounts/{id}:
 *    put:
 *      tags:
 *        - Accounts
 *      summary: "Edit a account"
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
router.put('/:id', checkJWT, updateAccountData);

/**
 * Post track
 * @openapi
 * /accounts/{id}:
 *    delete:
 *      tags:
 *        - Accounts
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
router.delete('/:id', checkJWT, deleteAccountData);

export { router };
