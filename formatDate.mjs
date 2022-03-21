import { format } from 'date-fns'

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return format(date, 'dd MMMM, uuuu');
}

export default formatDate
