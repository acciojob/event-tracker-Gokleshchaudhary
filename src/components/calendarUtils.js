import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

export const localizer = momentLocalizer(moment);

export const eventStyleGetter = (event) => {
  const isPast = moment(event.start).isBefore(moment(), 'day');
  return {
    style: {
      backgroundColor: isPast ? 'rgb(222, 105, 135)' : 'rgb(140, 189, 76)',
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '0.9rem'
    }
  };
};
