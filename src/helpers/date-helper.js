export const toVnFormat = date => {
  if (!date) {
    return null;
  }

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};
