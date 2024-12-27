export const delay = (milliseconds: number = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// generate random string id
export const getRandomId = () => Math.random().toString(36).slice(2, 9);
