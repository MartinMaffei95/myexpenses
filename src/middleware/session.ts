import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handler';
import { verifyToken } from '../utils/jwt.handle';
import { userExists } from '../utils/userExists.handler';

interface RequestExt extends Request {
  user?: string | JwtPayload;
}

const checkJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop();
    const isUser = await verifyToken(`${jwt}`);
    if (!isUser) {
      handleHttp(res, 'INVALID_SESSION', { error: 'INVALID_SESSION' });
    } else {
      if (await !userExists(isUser)) {
        handleHttp(res, 'USER_NOT_EXIST', { error: 'USER_NOT_EXIST' });
      } else {
        req.user = isUser;
        next();
      }
    }
  } catch (e) {
    console.log(e);
    handleHttp(res, 'TOKEN_EMPTY', { error: 'TOKEN_EMPTY' });
  }
};

export { checkJWT };
