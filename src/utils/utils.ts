export const returnNowDateFormatted = () => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${year}-${month}-${day}`;
};
