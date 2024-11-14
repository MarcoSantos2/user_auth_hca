import { Feedback } from '../models/Feedback';
import { User } from '../models/User';
import * as feedbackRepository from '../repositories/feedbackRepository';

export const createFeedback = async (user: User, feedbackText: string): Promise<Feedback> => {
    return feedbackRepository.createFeedback(user, feedbackText);
};
