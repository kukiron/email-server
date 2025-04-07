import path from 'path';
import ejs from 'ejs';
import type { Request, Response } from 'express';

import {
	COMPANY_NAME,
	createTransporter,
	isPhoneIncluded,
	validateEmail,
	validateMessage,
	validateName,
} from '../libs';

export const sendEmail = async (req: Request, res: Response) => {
	const { name, email, message, phone = '' } = req.body;

	try {
		if (isPhoneIncluded(phone as string)) {
			throw new Error('Spam detected.');
		}

		// Create a transporter
		const transporter = await createTransporter();

		// Render the EJS template
		const templatePath = path.join(
			__dirname,
			'..',
			'views',
			'send-message.ejs',
		); // going one level up
		const emailTemplate = await ejs.renderFile(templatePath, {
			header: 'Contact Us Form Submission',
			subject: `Message from ${name}`,
			name: validateName(name),
			email: validateEmail(email),
			message: validateMessage(message),
			companyName: COMPANY_NAME,
		});

		// Define the email options
		const mailOptions = {
			from: `"Contact Form, Ittihad Engineering" <${process.env.SENDER_EMAIL_ADDRESS}>`,
			to: process.env.RECIEPIENT_EMAIL_ADDRESS,
			cc: process.env.CC_EMAIL_ADDRESS
				? [process.env.CC_EMAIL_ADDRESS]
				: undefined,
			subject: `${name} sent a message with Contact Us form`,
			html: emailTemplate,
		};

		// Send the email
		const result = await transporter.sendMail(mailOptions);
		console.log('Email sent successfully.', result.messageId);
		res
			.status(200)
			.json({ success: true, message: 'Email sent successfully', result });
	} catch (error: unknown) {
		console.error('Error sending email.', error);
		res.status(400).json({
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'Could not send email. Try again later.',
		});
	}
};
