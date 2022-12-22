import { Request, Response, Router } from 'express';
import {
  deleteTransaction,
  getQueryTransactions,
  getTransactions,
  postTransaction,
  updateTransaction,
} from '../controllers/transaction';
import { checkJWT } from '../middleware/session';

const router = Router();

/**
 * http//localhost:3001/transactions
 */

/**
 * Post track
 * @openapi
 * /transactions/all:
 *    get:
 *      tags:
 *        - Transactions
 *      summary: "Get all transactions"
 *      description: This endpoint is for get all my transactions.
 *      responses:
 *        '200':
 *          description: Return a array with all my transactions.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/transaction"
 *        '404':
 *          description: Have a error creating the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_GET_TRANSACTIONS"
 *      security:
 *        - bearerAuth: []
 */
router.get('/all', checkJWT, getTransactions);

// router.get('/:id', checkJWT, getTransaction);

/**
 * Post track
 * @openapi
 * /transactions/?value=200:
 *    get:
 *      tags:
 *        - Transactions
 *      summary: "Get transactions by query"
 *      description: This endpoint is for get all who meet a condition.
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          description: Id of transaction
 *        - in: query
 *          name: value
 *          schema:
 *            type: string
 *          description: Specific value of transaction
 *        - in: query
 *          name: value_majorOf
 *          schema:
 *            type: string
 *          description: Find transactions with 'value' gratter of the parameter
 *        - in: query
 *          name: value_minorOf
 *          schema:
 *            type: string
 *          description: Find transactions with 'value' lesser of the parameter
 *        - in: query
 *          name: value_major_orEqualOf
 *          schema:
 *            type: string
 *          description: Find transactions with 'value' gratter or equal of the parameter
 *        - in: query
 *          name: value_minor_orEqualOf
 *          schema:
 *            type: string
 *          description: Find transactions with 'value' lesser or equal of the parameter
 *        - in: query
 *          name: account
 *          schema:
 *            type: string
 *          description: Find transactions by account Id
 *        - in: query
 *          name: category
 *          schema:
 *            type: string
 *          description: Find transactions by category Id
 *        - in: query
 *          name: comment
 *          schema:
 *            type: string
 *          description: Find transactions by words in a comment
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: Find transactions by specific date
 *        - in: query
 *          name: date_afterOf
 *          schema:
 *            type: string
 *          description: Find transactions after a specific date
 *        - in: query
 *          name: date_beforeOf
 *          schema:
 *            type: string
 *          description: Find transactions before a specific date
 *        - in: query
 *          name: type
 *          schema:
 *            type: string
 *          description: Find by tipe "ADDITION" or "SUBSTRACTION"
 *      responses:
 *        '200':
 *          description: Return a array with all my transactions.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/transaction"
 *        '404':
 *          description: Have a error creating the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_SEARCHING"
 *      security:
 *        - bearerAuth: []
 */
router.get('/?', checkJWT, getQueryTransactions);

/**
 * Post track
 * @openapi
 * /transactions/:
 *    post:
 *      tags:
 *        - Transactions
 *      summary: "Create a new transaction"
 *      description: Create transaction and store it in the account.
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  value:
 *                    type: number
 *                  account:
 *                    type: string
 *                    description: account Id
 *                  category:
 *                    type: string
 *                  type:
 *                    type: string
 *      responses:
 *        '200':
 *          description: Return a array with all my transactions.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/transaction"
 *        '404':
 *          description: Have a error creating the user.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_POST_TRANSACTION"
 *      security:
 *        - bearerAuth: []
 */
router.post('/', checkJWT, postTransaction);

/**
 * Post track
 * @openapi
 * /transactions/{id}:
 *    put:
 *      tags:
 *        - Transactions
 *      summary: "Edit a transaction"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the transaction
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
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_UPDATE_TRANSACTION"
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id', checkJWT, updateTransaction);

/**
 * Post track
 * @openapi
 * /transactions/{id}:
 *    delete:
 *      tags:
 *        - Transactions
 *      summary: "Delete a existing transaction"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the transaction
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
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *              example: "ERROR_REMOVE_TRANSACTION"
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', checkJWT, deleteTransaction);

export { router };
