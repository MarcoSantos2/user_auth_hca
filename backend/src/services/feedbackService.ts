import { Feedback } from '../models/Feedback';
import { User } from '../models/User';
import * as feedbackRepository from '../repositories/feedbackRepository';

export const createFeedback = async (user: User, feedbackText: string): Promise<Feedback> => {
    return feedbackRepository.createFeedback(user, feedbackText);
};

export const findFeedbackByUserUuid = async (uuid: string): Promise<Feedback[]> => {
    return feedbackRepository.findFeedbackByUserUuid(uuid);
};

export const findFeedbackById = async (id: number): Promise<Feedback | null> => {
    return feedbackRepository.findFeedbackById(id);
};

export const findAllFeedback = async (): Promise<Feedback[]> => {
    return feedbackRepository.findAllFeedback();
};

export const deleteFeedback = async (id: number): Promise<void> => {
    await feedbackRepository.deleteFeedback(id);
};
