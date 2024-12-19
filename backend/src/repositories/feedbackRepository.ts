import { AppDataSource } from "../datasource";
import { Feedback } from "../models/Feedback";
import { User } from "../models/User";

const feedbackRepository = AppDataSource.getRepository(Feedback);

export const createFeedback = async (user: User, feedbackText: string): Promise<Feedback> => {
  const newFeedback = feedbackRepository.create({ user: user, feedback_text: feedbackText });
  return await feedbackRepository.save(newFeedback);
};

export const findFeedbackByUserUuid = async (uuid: string): Promise<Feedback[]> => {
  return await feedbackRepository.find({where: { user: { uuid } }, relations: ['user']});
};

export const findFeedbackById = async (id: number): Promise<Feedback | null> => {
  return await feedbackRepository.findOneBy({ id });
};

export const findAllFeedback = async (): Promise<Feedback[]> => {
  return await feedbackRepository.find();
};

export const deleteFeedback = async (id: number): Promise<void> => {
  await feedbackRepository.delete({ id });
};
