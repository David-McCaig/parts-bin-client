import { formatDistanceToNowStrict } from 'date-fns'

  export const dateTimeAgo = (date) => {
    const fullDate = formatDistanceToNowStrict(new Date(date))
    const number = fullDate.slice(0,2)
    
    if (fullDate.includes('month')) {
      return number+'mo';
    } else if (fullDate.includes('days')) {
      return `${number} d`;
    } else if (fullDate.includes('hours')) {
      return `${number} h`;
    } else if (fullDate.includes('minutes')) {
      return `${number} m`;
    } else if (fullDate.includes('seconds')) {
      return `${number} s`;
    } else if (fullDate.includes('years') || fullDate.includes('year')) {
      return `${number} y`;
    }
  };