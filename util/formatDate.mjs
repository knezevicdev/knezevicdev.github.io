const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
}

export default formatDate
