// Business logic implementation

import * as companyRepository from '../repositories/companyRepository';
import * as roleService from '../services/roleService';
import { Company } from '../models/Company';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { findUserByUuid } from '../repositories/userRepository';
import { sendEmail } from '../utils/email/sendEmail';
import jwt from 'jsonwebtoken';
import * as companyInvitationRepository from '../repositories/companyInvitationRepository';
import { CompanyInvitation } from '../models/CompanyInvitation';

export const createCompany = async (companyData: { name: string; description?: string }, user: User): Promise<Company> => {
    // Create the company
    const company = await companyRepository.createCompany(companyData);
    await addUserToCompany(company.uuid, user.uuid);

    // Create the "Admin" role
    const uniqueCompanySlugID = company.id * 42;
    const adminSlug = `admin_${uniqueCompanySlugID}`; 
    // Why 42, do you ask? Because it is the answer to the ultimate question of life, the Universe, and everything.
    // Still confused? I recommend you read The Hitchhiker's Guide to Galaxy. 

    const adminRole = await roleService.createRole({
        name: "Admin",
        description: "Admin role for company management",
        slug: adminSlug,
        company
    });
    // Assign the "Admin" role to the user
    await roleService.addUserToRole(user.uuid, adminRole.slug || "");
    
    // Add all permissions to the "Admin" role
    await roleService.addAllPermissionsToRole(adminRole?.slug || "");

    // TODO: Create the other default roles for the companies (eg HR, HCA etc)

    return company;
};

export const getCompanyByUuid = async (uuid: string): Promise<Company | null> => {
    const company = await companyRepository.findCompanyByUuid(uuid);
    if (!company) {
        throw new Error(`'Company not found'`);
    }
    return company;
};

export const getAllCompanies = async (): Promise<Company[] | string> => {
  const companies = await companyRepository.findAllCompanies();
  if (companies.length == 0) {
    return "There isn't any company to be displayed"
  }
  return companies;
};

export const updateCompany = async (uuid: string, updates: { name?: string; description?: string }): Promise<Company> => {
  const company = await companyRepository.findCompanyByUuid(uuid);
  if (!company) {
      throw new Error('Company not found');
  }
  company.name = updates.name || company.name;
  company.description = updates.description || company.description;

  return await companyRepository.save(company);
};

export const deleteCompany = async (uuid: string): Promise<void> => {
  const company = await companyRepository.findCompanyByUuid(uuid);
  if (!company) {
      throw new Error('Company not found');
  }

  await companyRepository.deleteCompany(uuid);
};

export const getAllUsersInCompany = async (uuid: string): Promise<User[]> => {
  const company = await companyRepository.findCompanyByUuid(uuid, true);
  if (!company) {
      throw new Error('Company not found');
  }
  return company.users;
};

export const getAllRolesInCompany = async (uuid: string): Promise<Role[]> => {
  const company = await companyRepository.findCompanyByUuid(uuid, false, true);
  if (!company) {
      throw new Error('Company not found');
  }
  return company.roles;
}

export const addUserToCompany = async (companyUuid: string, userUuid: string): Promise<Company> => {
  const company = await companyRepository.findCompanyByUuid(companyUuid, true);
  if (!company) {
      throw new Error('Company not found');
  }
  const user = await findUserByUuid(userUuid);
  if (!user) {
      throw new Error(`User with UUID ${userUuid} not found`);
  }

  if (!company.users.some(u => u.id === user.id)) {
    company.users.push(user);
  } else {
    throw new Error('User is already a member of the company');
  }
  
  return await companyRepository.save(company);
};

export const isUserInCompany = async (companyUuid: string, user: User): Promise<boolean> => {
  const company = await companyRepository.findCompanyByUuid(companyUuid, true);
  if (!company) {
      throw new Error('Company not found');
  }
  return company.users.some(u => u.id === user.id);
}

export const getCompanyInvitations = async (companyUuid: string): Promise<{invitee_email: string; invitee_name: string; accepted: boolean; created_at: Date; expires_at: Date}[]> => {
  const company = await companyRepository.findCompanyByUuid(companyUuid);
  if (!company) {
    throw new Error('Company not found');
  }
  const invitations = await companyInvitationRepository.findInvitationsByCompany(companyUuid);
  return invitations.map(({ invitee_email, invitee_name, accepted, created_at, expires_at }) => ({
    invitee_email,
    invitee_name,
    accepted,
    created_at,
    expires_at
  }));
};

export const inviteUserToCompany = async (inviteeName: string, inviteeEmail: string, company: Company, inviter: User): Promise<void> => {
  const existingInvitation = await companyInvitationRepository.findInvitationByCompanyAndEmail(company.uuid, inviteeEmail);
  if (existingInvitation) {
    throw new Error('An invitation has already been sent to this email');
  }

  const inviteToken = jwt.sign(
    { email: inviteeEmail, companyUuid: company.uuid }, 
    process.env.JWT_SECRET || '', 
    { expiresIn: '7d' }
  );

  const decoded = jwt.decode(inviteToken) as { exp: number };
  const expiresAt = new Date(decoded.exp * 1000); // Convert UNIX timestamp to Date

  await companyInvitationRepository.createInvitation({
    invitee_email: inviteeEmail,
    invitee_name: inviteeName,
    inviter_uuid: inviter.uuid,
    company_uuid: company.uuid,
    token: inviteToken,
    expires_at: expiresAt
  });

  const inviteUrl = `${process.env.APP_URL}/accept-invite?token=${inviteToken}`;

  await sendEmail(inviteeEmail, 'You are invited to join a company', 'companyInviteUser', {
    invitee_name: inviteeName,
    inviter_sender_organization_name: company.name,
    action_url: inviteUrl,
    support_email: process.env.SUPPORT_EMAIL,
    help_url: process.env.HELP_URL,
    product_name: process.env.PRODUCT_NAME,
    organization_name: process.env.ORGANIZATION_NAME,
    app_url: process.env.APP_URL
  });
};

export const cancelCompanyInvitation = async (company: Company, invitationToken: string): Promise<void> => {
  const invitation = await companyInvitationRepository.findInvitationByToken(invitationToken);
  if (!invitation) {
    throw new Error('Invitation not found');  
  }

  if (invitation.company_uuid !== company.uuid) {
    throw new Error('Invalid Invitation.');
  }

  if (invitation.accepted) {
    throw new Error('Cannot cancel an already accepted invitation');
  }

  await companyInvitationRepository.deleteInvitation(invitation);
};

export const acceptCompanyInvite = async (inviteToken: string, user: User): Promise<void> => {
  let decoded;
  try {
    decoded = jwt.verify(inviteToken, process.env.JWT_SECRET || '') as { email: string; companyUuid: string };
  } catch (error) {
    throw new Error('Invalid or expired invite token');
  }

  if (decoded.email !== user.email) {
    throw new Error('You must log in using the email address that was invited.');
  }
  
  const company = await companyRepository.findCompanyByUuid(decoded.companyUuid);
  if (!company) {
    throw new Error('Company not found');
  }
  await addUserToCompany(company.uuid, user.uuid);
  
  const invitation = await companyInvitationRepository.findInvitationByToken(inviteToken);
  if (invitation) {
    invitation.accepted = true;
    await companyInvitationRepository.updateInvitation(invitation);
  }
};

export const resendCompanyInvitation = async (company: Company, inviteeEmail: string): Promise<void> => {
  const invitation = await companyInvitationRepository.findInvitationByCompanyAndEmail(company.uuid, inviteeEmail);
  if (!invitation) {
    throw new Error('Invitation not found');
  }

  if (invitation.accepted) {
    throw new Error('This invitation has already been accepted.');
  }

  const newToken = jwt.sign(
    { email: invitation.invitee_email, companyUuid: company.uuid },
    process.env.JWT_SECRET || '',
    { expiresIn: '7d' }
  );

  const decoded = jwt.decode(newToken) as { exp: number };
  const newExpiresAt = new Date(decoded.exp * 1000);

  invitation.token = newToken;
  invitation.expires_at = newExpiresAt;
  await companyInvitationRepository.updateInvitation(invitation);

  const inviteUrl = `${process.env.APP_URL}/accept-invite?token=${newToken}`;
  await sendEmail(invitation.invitee_email, 'You are invited to join a company', 'companyInviteUser', {
    invitee_name: invitation.invitee_name,
    inviter_sender_organization_name: company.name,
    action_url: inviteUrl,
    support_email: process.env.SUPPORT_EMAIL,
    help_url: process.env.HELP_URL,
    product_name: process.env.PRODUCT_NAME,
    organization_name: process.env.ORGANIZATION_NAME,
    app_url: process.env.APP_URL
  });
};
