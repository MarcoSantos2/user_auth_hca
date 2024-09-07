// /* The role table should not have API endpoints. Entire file to be deleted after Felipe's
// confirmation
// */

// import { Request, Response } from 'express';
// import * as userRoleService from '../services/userRoleService';
// import * as userRepository from '../repositories/userRepository';
// import * as roleRepository from '../repositories/roleRepository';

// export const assignRole = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, roleId } = req.body;
//     // Fetch the user and role names
//     const user = await userRepository.findUserById(userId);
//     const role = await roleRepository.findRoleById(roleId);

//     if (user && role) {
//       res.status(201).json({ message: `${user.name} assigned as ${role.name}` });
//     } else {
//       res.status(404).json({ message: 'User or Role not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// };

// export const getUserRoles = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId } = req.params;
//     const user = await userRepository.findUserById(Number(userId));
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     const userRoles = await userRoleService.getUserRoles(Number(userId));
//     const roleNames = userRoles.map(userRole => userRole.role.name);
//     res.status(200).json({ message: `${user.name}: ${roleNames.join(', ')}` });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// };

// export const removeUserRoles = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, roleId } = req.body;
//     await userRoleService.removeUserRoles(Number(userId), Number(roleId));

//     // Fetch the user and role details
//     const user = await userRepository.findUserById(Number(userId));
//     const role = await roleRepository.findRoleById(Number(roleId));

//     if (user && role) {
//       res.status(200).json({ message: `${role.slug} role removed from ${user.name}` });
//     } else {
//       res.status(404).json({ message: 'User or Role not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// };

// // TODO: USE THIS FUNCTION
// /* Regarding the above functions: if fetching the user and role details is not ideal due to time/space constraints, 
// this function with a general message can be used:
// */
// export const removeUserRoles = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, roleId } = req.body;
//     await userRoleService.removeUserRoles(Number(userId), Number(roleId));

//     // Respond with a generic success message
//     res.status(200).json({ message: 'Role removed from user successfully' });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// };