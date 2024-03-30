import { CategoryPeriod } from '../budgeting/category';
import { dateToDbString, periodStartDate } from '../dbUtils';

test('dateToDbString: local date in utc', () => {
  expect(dateToDbString(new Date('2022-01-01'))).toBe(
    '2022-01-01T00:00:00.000Z',
  );
});
test('periodStart: first day of month in utc', () => {
  expect(periodStartDate(CategoryPeriod.MONTHLY).getDate()).toBe(1);
});
