import { AppDataSource } from "../datasource";
import { GooglePayload } from "../models/GooglePayload";

const googlePayloadRepository = AppDataSource.getRepository(GooglePayload);

export const createGooglePayload = async (payload: Partial<GooglePayload>): Promise<GooglePayload> => {
  const newPayload = googlePayloadRepository.create(payload);
  return await googlePayloadRepository.save(newPayload);
};

export const findGooglePayloadByEmail = async (email: string): Promise<GooglePayload | null> => {
  return await googlePayloadRepository.findOne({ where: { email } });
};