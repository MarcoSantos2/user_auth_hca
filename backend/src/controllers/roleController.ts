// Management of the API interface to the business logic

import { Request, Response } from 'express';
import * as roleService from '../services/roleService';
import * as userService from '../services/userService';

// TODO ADD ALL FUNCTIONALITY FROM USERROLECONTROLLER TO ROLECONTROLLER.TS

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, slug } = req.body;
    const role = await roleService.createRole({ name, description, slug });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await roleService.deleteRole(Number(id));
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const assignRoleToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, uuid } = req.params;
    const user = await userService.getUserByUuid(uuid);
    const role = await roleService.getRoleBySlug(slug);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    await userService.assignRoleToUser(user.id, role.id);
    res.status(201).json({ message: 'Role assigned to user successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};