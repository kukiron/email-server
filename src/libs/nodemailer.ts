import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const createTransporter = async () => {
	const { token } = await oauth2Client.getAccessToken();
	// Create a transporter
	const trnasporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.SENDER_EMAIL_ADDRESS,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: token || '',
		},
		from: process.env.SENDER_EMAIL_ADDRESS,
	});

	// Verify transporter
	trnasporter.verify((error, success) => {
		if (error) {
			console.log(error);
			throw new Error(error.message);
		}
		console.log('Server is ready to take our messages', success);
	});

	return trnasporter;
};
