import moment from 'moment';

export const getFilteredEvents = (events, filter) => {
  const now = moment();
  return events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'past') return moment(event.start).isBefore(now, 'day');
    if (filter === 'upcoming') return moment(event.start).isSameOrAfter(now, 'day');
    return true;
  });
};

export const eventStyleGetter = (event) => {
  const isPast = moment(event.start).isBefore(moment(), 'day');
  return {
    style: {
      backgroundColor: isPast ? 'rgb(222, 105, 135)' : 'rgb(140, 189, 76)',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    }
  };
};
