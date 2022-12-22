import { Request, Response, Router } from 'express';
import { loginController, registerController } from '../controllers/auth';

const router = Router();
/**
 * Post track
 * @openapi
 * /auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Create a new user"
 *      description: Use this for create a new user.
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  name:
 *                    type: string
 *                example:
 *                  username: MiUsername
 *                  password: MySecurePass
 *                  name: John Smith
 *      responses:
 *        '200':
 *          description: The user was successfully created.
 *        '422':
 *          description: Have a error creating the user.
 */

router.post('/register', registerController);
/**
 * Post track
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Login to app"
 *      description: Use this for login on the app.
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                example:
 *                  username: MiUsername
 *                  password: MySecurePass
 *      responses:
 *        '200':
 *          description: Return the Bearer token.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                  user:
 *                    $ref: "#/components/schemas/user"

 *        '422':
 *          description: Have a error creating the user.
 */

router.post('/login', loginController);

export { router };
