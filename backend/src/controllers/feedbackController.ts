// MARCO: The controller layer is responsible for handling HTTP requests and responses

import { Request, Response } from 'express';
import * as feedbackService from '../services/feedbackService';

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { feedbackText } = req.body;
        const user = req.body.user;

        if (!feedbackText) {
            res.status(400).json({ message: 'Please make sure the feedback field is not empty' });
            return;
        }

        const feedback = await feedbackService.createFeedback(user, feedbackText);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getFeedbackByUserUuid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid } = req.params;
    const feedback = await feedbackService.findFeedbackByUserUuid(uuid);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFeedbackById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const feedback = await feedbackService.findFeedbackById(Number(id));
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllFeedback = async (_req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await feedbackService.findAllFeedback();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await feedbackService.deleteFeedback(Number(id));
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};