import { AppDataSource } from "../datasource";
import { Feedback } from "../models/Feedback";
import { User } from "../models/User";

const feedbackRepository = AppDataSource.getRepository(Feedback);

export const createFeedback = async (user: User, feedbackText: string): Promise<Feedback> => {
  const newFeedback = feedbackRepository.create({ user: user, feedback_text: feedbackText });
  return await feedbackRepository.save(newFeedback);
};
