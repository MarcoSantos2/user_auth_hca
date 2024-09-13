import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../authMiddleware';
import { getUserByUuid } from '../../services/userService';
import { UserJwtPayload } from '../../types';

jest.mock('jsonwebtoken');
jest.mock('../../services/userService');

describe('verifyToken middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 401 if authorization header is missing', () => {
    verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authorization header missing or malformed' });
  });

  it('should return 401 if token is invalid', () => {
    req.headers!.authorization = 'Bearer invalidtoken';
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
  });

  it('should return 401 if user is not found', async () => {
    req.headers!.authorization = 'Bearer validtoken';
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { uuid: 'user-uuid' } as UserJwtPayload);
    });
    (getUserByUuid as jest.Mock).mockRejectedValue('User not found');

    await verifyToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user' });
  });

  it('should call next if token is valid and user is found', async () => {
    req.headers!.authorization = 'Bearer validtoken';
    const user = { id: 1, uuid: 'user-uuid' };
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { uuid: 'user-uuid' } as UserJwtPayload);
    });
    (getUserByUuid as jest.Mock).mockResolvedValue(user);

    await verifyToken(req as Request, res as Response, next);
    
    console.log(req)
    
    expect(req.body.user).toEqual(user);
    expect(next).toHaveBeenCalled();
  });
});
