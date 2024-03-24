import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const dateToDbString = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const dbDateToDate = (date: string) => {
  return dayjs(date).toDate();
};
