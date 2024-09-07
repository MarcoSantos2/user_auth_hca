// import { UserRole } from "../models/UserRole";
// import * as userRoleRepository from "../repositories/userRoleRepository";
// import * as userRepository from '../repositories/userRepository';
// import * as roleRepository from '../repositories/roleRepository';


// export const assignRoleToUser = async (userId: number, roleId: number): Promise<UserRole> => {
//     const user = await userRepository.findUserById(userId); // Fetch the full user object
//     if (!user) {
//         throw new Error(`User with ID ${userId} not found`);
//     }

//     const role = await roleRepository.findRoleById(roleId); // Fetch the full role object
//     if (!role) {
//         throw new Error(`Role with ID ${roleId} not found`);
//     }

//     return await userRoleRepository.saveUserRole({ user, role });
// };

// export const getUserRoles = async (userId: number): Promise<UserRole[]> => {
//     const user = await userRoleRepository.findUserById(userId);
//     if (!user) {
//         throw new Error(`User with ID ${userId} not found`);
//     }
//     return await userRoleRepository.findUserRolesByUserId(userId);
// };

// export const removeUserRole = async (id: number): Promise<void> => {
//     const userRole = await userRoleRepository.findUserRoleById(id);
//     if (!userRole) {
//         throw new Error(`UserRole with ID ${id} not found`);
//     }
//     await userRoleRepository.deleteUserRole(id);
// };
