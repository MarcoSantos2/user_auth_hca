import { AppDataSource } from "../datasource";
import { CompanyInvitation } from '../models/CompanyInvitation';

const companyInvitationRepository = AppDataSource.getRepository(CompanyInvitation);

export const createInvitation = async (invitationData: Partial<CompanyInvitation>): Promise<CompanyInvitation> => {
    const invitation = companyInvitationRepository.create(invitationData);
    return await companyInvitationRepository.save(invitation);
};

export const findInvitationsByCompany = async (companyUuid: string): Promise<CompanyInvitation[]> => {
    return await companyInvitationRepository.find({
        where: { company_uuid: companyUuid },
        order: { created_at: 'DESC' }
    });
};

export const findInvitationByToken = async (token: string): Promise<CompanyInvitation | null> => {
    return await companyInvitationRepository.findOne({ where: { token } });
};

export const updateInvitation = async (invitation: CompanyInvitation): Promise<CompanyInvitation> => {
    return await companyInvitationRepository.save(invitation);
};