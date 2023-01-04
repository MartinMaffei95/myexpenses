import { Request, Response, Router } from 'express';
import {
  createNewAccount,
  deleteAccountData,
  getAccountData,
  updateAccountData,
  getAllAccounts,
} from '../controllers/account';
import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * Post track
 * @openapi
 * /accounts/all:
 *    get:
 *      tags:
 *        - Accounts
 *      summary: "Get all my accounts data by Id"
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
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/account"
 *        '401':
 *          description: The token is invalid or missing.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "INVALID_SESSION"
 *        '403':
 *          description: The user who send request is not the owner of account .
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "YOU_DONT_HAVE_PERMISSIONS"
 *        '404':
 *          description: Not find the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ACCOUNT_NOT_FOUND"
 *        '500':
 *          description: Internal server error.
 *      security:
 *        - bearerAuth: []
 */

router.get('/all', checkJWT, getAllAccounts);

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
 *        '401':
 *          description: The token is invalid or missing.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "INVALID_SESSION"
 *        '403':
 *          description: The user who send request is not the owner of account .
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "YOU_DONT_HAVE_PERMISSIONS"
 *        '404':
 *          description: Not find the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ACCOUNT_NOT_FOUND"
 *        '500':
 *          description: Internal server error.
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
 *        '401':
 *          description: The token is invalid or missing.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "INVALID_SESSION"
 *        '403':
 *          description: The user who send request is not the owner of account .
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "YOU_DONT_HAVE_PERMISSIONS"
 *        '404':
 *          description: Not find the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ACCOUNT_NOT_FOUND"
 *        '500':
 *          description: Internal server error.
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
 *          description: Object with data for account. If you do not want to modify any of the fields, do not send them
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
 *                  initial_balance:
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
 *                
 *        '500':
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_UPDATING_ACCOUNT"
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
 *          description: ID of the account
 *      responses:
 *        '200':
 *          description: Return a string with account data.

 *        '500':
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_DELETING_ACCOUNT"
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', checkJWT, deleteAccountData);

export { router };
