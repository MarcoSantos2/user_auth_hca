// Management of the API interface to the business logic
import { Request, Response } from 'express';
import * as companyService from '../services/companyService';
import * as roleService from '../services/roleService';
import logger from '../utils/logger';

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, slug, companyUuid } = req.body;
    const company = await companyService.getCompanyByUuid(companyUuid);
    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    const role = await roleService.createRole({ name, description, slug, company });
    logger.info(`Role created: ${name}`);
    res.status(201).json(role);
  } catch (error) {
    logger.error(`Role creation error: ${(error as Error).message}`);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { name, description, slug: newSlug } = req.body;
    const role = await roleService.updateRole(slug, { name, description, slug: newSlug });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const role = await roleService.getRoleBySlug(slug, true);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    await roleService.deleteRole(slug);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addUserToRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, uuid } = req.params;
    const role = await roleService.addUserToRole(uuid, slug);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addPermissionToRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, permission_slug } = req.params;
    const role = await roleService.addPermissionToRole(permission_slug, slug);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addPermissionsToRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { permissions } = req.body;
    const role = await roleService.addPermissionsToRole(permissions, slug);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get Roles from ALL COMPANIES - Internal use only
export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({roles});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
