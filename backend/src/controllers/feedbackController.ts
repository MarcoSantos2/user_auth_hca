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