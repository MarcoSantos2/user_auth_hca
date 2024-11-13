import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../types';
import { getUserByUuid } from '../services/userService';
import * as permissionService from '../services/permissionService';
import { getCompanyByUuid } from '../services/companyService';
import { Company } from '../models/Company';
import { Role } from '../models/Role';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  // Verify if signature and exp is ok. If it is, find user and add to body of request
  jwt.verify(token, process.env.JWT_SECRET || '', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    try {
      const user = await getUserByUuid((decoded as UserJwtPayload).uuid, true, true);
      req.body.user = user;
      next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid user' });
    }   
  });
};

// External permissions (app users)
export const verifyPermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Build the endpoint string
    const companyHeader = req.headers['x-company-context'];
    if (companyHeader && typeof companyHeader === 'string')  {
      req.body.company = await getCompanyByUuid(companyHeader);
    } else {
      return res.status(401).json({ message: 'Invalid company context' });
    }
    const userHasAccess = req.body.user.companies.find((company: Company) => company.id === req.body.company.id);
    if (!userHasAccess) {
      return res.status(401).json({ message: 'User does not have access to this company' });
    }
    // Build the endpoint string
    const method = req.method; // e.g., "GET", "POST"
    const baseUrl = req.baseUrl; //TBD baseUrl or originalUrl // e.g., "/api/roles"
    const routePath = req.route.path;
    const fullPath = `${baseUrl}${routePath}`.replace(/\/$/, "");
    const endpoint = `${method}:${fullPath}`; // Adjust this if you are using slugs differently
   
    // Check if the user has permission for this endpoint
    const permissions = await permissionService.findPermissionsByRolesAndCompany(req.body.user.roles, req.body.company);

    const hasPermission = permissions.some(permission => permission.slug === endpoint);
    if (!hasPermission) {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Failed to verify permissions.' });
  }
};

// Internal permissions (admin users)
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const hasAdminRole = req.body.user.roles.some((role: Role) => role.slug === 'InternalAdmin');
  
  if (req.body.user && hasAdminRole) {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};