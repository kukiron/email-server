import { Router } from 'express';

import { sendEmail } from './controllers/send-message';
import {
	COMPANY_NAME,
	SAMPLE_EMAIL,
	SAMPLE_MESSAGE,
	SAMPLE_NAME,
} from './libs';

const router = Router();

// route to test the contact us form: GET /api/contact-us
router.get('/contact-us', (_req, res) => {
	res.render('send-message', {
		header: `Contact US - ${COMPANY_NAME}`,
		subject: `New message from ${SAMPLE_NAME}`,
		name: SAMPLE_NAME,
		email: SAMPLE_EMAIL,
		message: SAMPLE_MESSAGE,
		companyName: COMPANY_NAME,
	});
});

// send email: POST /api/send-message
router.post('/send-message', sendEmail);

export default router;
