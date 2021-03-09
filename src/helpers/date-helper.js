export const toVnFormat = (date, ommitTime = false) => {
  if (!date) {
    return null;
  }
  if (date instanceof Date) {
    if (ommitTime) {
      return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    }
    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }
  if (date.indexOf('T') != -1) {
    const [year, month, day] = date.split('T')[0].split('-');
    if (ommitTime) {
      return `${day}/${month}/${year}`;
    }
    const [hour, minute] = date.split('T')[1].split(':');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};
