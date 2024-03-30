import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CategoryPeriod } from './budgeting/category';
dayjs.extend(utc);

export const dateToDbString = (date: Date) => {
  return dayjs(date).utc().toISOString();
};

export const dbDateToDate = (date: string) => {
  return dayjs(date).toDate();
};

export const periodStartDate = (period: CategoryPeriod, ago: number = 0) => {
  if (period === CategoryPeriod.MONTHLY) {
    return dayjs().subtract(ago, 'month').startOf('month').toDate();
  }
  if (period === CategoryPeriod.WEEKLY) {
    return dayjs().subtract(ago, 'week').startOf('week').toDate();
  }
  if (period === CategoryPeriod.YEARLY) {
    return dayjs().subtract(ago, 'year').startOf('year').toDate();
  }
  return new Date();
};

export const periodEndDate = (period: CategoryPeriod, ago: number = 0) => {
  if (period === CategoryPeriod.MONTHLY) {
    return dayjs().subtract(ago, 'months').endOf('month').toDate();
  }
  if (period === CategoryPeriod.WEEKLY) {
    return dayjs().subtract(ago, 'weeks').endOf('week').toDate();
  }
  if (period === CategoryPeriod.YEARLY) {
    return dayjs().subtract(ago, 'years').endOf('year').toDate();
  }

  return new Date();
};
