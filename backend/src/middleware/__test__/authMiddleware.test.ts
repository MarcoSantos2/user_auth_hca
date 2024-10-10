import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken, verifyPermissions } from '../authMiddleware';
import { getUserByUuid } from '../../services/userService';
import { UserJwtPayload } from '../../types';
import * as permissionService from '../../services/permissionService';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));
jest.mock('../../services/userService');
jest.mock('../../services/permissionService');

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
    
    expect(req.body.user).toEqual(user);
    expect(next).toHaveBeenCalled();
  });
});

describe('verifyPermissions middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      body: {
        user: {
          roles: [] // Initialize with an empty array or mock roles as needed
        }
      },
      method: 'GET', // Set a default method
      path: '/api/roles' // Set a default path
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should call next if user has permission for the endpoint', async () => {
    req.body.user.roles = [{ id: 1 }]; // Mock user roles
    (permissionService.findPermissionsByRoles as jest.Mock).mockResolvedValue([
      { slug: 'GET:/api/roles' } // Mock permission for the endpoint
    ]);

    await verifyPermissions(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user does not have permission for the endpoint', async () => {
    req.body.user.roles = [{ id: 1 }]; // Mock user roles
    (permissionService.findPermissionsByRoles as jest.Mock).mockResolvedValue([
      { slug: 'GET:/api/other' } // Mock permission that does not match
    ]);

    await verifyPermissions(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'You do not have permission to access this resource.' });
  });

  it('should return 401 if there is an error verifying permissions', async () => {
    req.body.user.roles = [{ id: 1 }]; // Mock user roles
    (permissionService.findPermissionsByRoles as jest.Mock).mockRejectedValue(new Error('Database error'));

    await verifyPermissions(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to verify permissions.' });
  });
});

 