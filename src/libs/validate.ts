import validator from 'validator';

const sanitizeInput = (userInput: string) => {
  // const userInput = '<script>alert("XSS")</script>';
  const UNSAFE_REGEX_PATTERN = /<script.*?>.*<\/script>/gi;

  // Check for malicious patterns
  const isMalicious = UNSAFE_REGEX_PATTERN.test(userInput);

  if (isMalicious) {
    throw new Error('Could not send message. Malicious input detected.');
  }

  // Sanitize input
  return validator.escape(userInput);
};

// validate name - check for lenght and malicious code
export const validateName = (name: string) => {
  const isValidLength = validator.isLength(name, { max: 20 });
  const isValidCharacters = /^[a-zA-Z0-9 ]+$/.test(name); // alphaneumeric & space only;

  if (!isValidLength) {
    throw new Error('Name is too long!');
  }
  if (!isValidCharacters) {
    throw new Error('Invalid name. Only letters & numbers allowed.');
  }
  return sanitizeInput(name);
};

// validate email - use built-in method
export const validateEmail = (email: string) => {
  const emailValid = validator.isEmail(email);
  if (!emailValid) {
    throw new Error('Invalid email address.');
  }
  return email;
};

// validate message - check for length and malicious code
export const validateMessage = (message: string) => {
  const isValidMessage = validator.isLength(message, { min: 10, max: 200 });
  if (!isValidMessage) {
    throw new Error('Message should be between 10 and 200 characters.');
  }
  return sanitizeInput(message);
};

// detect the presence of phone number - indicates spam
export const isPhoneIncluded = (phone: string) =>
  validator.isLength(phone, { min: 1 });
