import { AppDataSource } from "../datasource";
import { GoogleAccount } from "../models/GoogleAccount";

const googleAccountRepository = AppDataSource.getRepository(GoogleAccount);

export const createGoogleAccount = async (payload: Partial<GoogleAccount>): Promise<GoogleAccount> => {
  const newPayload = googleAccountRepository.create(payload);
  return await googleAccountRepository.save(newPayload);
};

export const findGoogleAccountByEmail = async (email: string): Promise<GoogleAccount | null> => {
  const query = googleAccountRepository
  .createQueryBuilder('google_account')
  .where("google_account.email = :email", { email: email })
  .leftJoinAndSelect("google_account.user", "user");

  return await query.getOne();
};
