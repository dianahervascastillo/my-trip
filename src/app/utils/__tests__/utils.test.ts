import { describe, it, expect } from 'vitest';
import { TIME_DATE_FORMATS, formatDate, formatTime } from '../utils';

describe('Given the formatDate util function', () => {
  it('when passing a datestring will format it with SHORT_DAY and will remove commas', () => {
    const dateStr = '2020-01-02T03:04:00';
    const result = formatDate(dateStr, TIME_DATE_FORMATS.SHORT_DAY, 'en-GB');

    expect(result).toContain('2020');
    expect(result).not.toContain(',');
  });
});

describe('Given the formatTime util function ', () => {
  it('when passing a datestring will format it with SHORT_TIME (24h)', () => {
    const dateStr = '2020-01-02T03:04:00';
    const result = formatTime(dateStr, TIME_DATE_FORMATS.SHORT_TIME, 'en-GB');

    expect(result).toMatch(/\d{2}:\d{2}/);
    expect(/am|pm/i.test(result)).toBe(false);
  });
});
