import dayjs from 'dayjs';

const formatingToDateJs = (date: Date) => {
  const formatedDate = dayjs(date).format('DD/MM/YYYY');
  return formatedDate;
};

export { formatingToDateJs };
