import { StringUtils } from '../string.utils';

describe('StringUtils', () => {
  describe('formatNames', () => {
    it('should return empty string for empty array', () => {
      expect(StringUtils.formatNames([])).toBe('');
    });

    it('should return single name for one cat', () => {
      expect(StringUtils.formatNames(['Whiskers'])).toBe('Whiskers');
    });

    it('should format two names with "and"', () => {
      expect(StringUtils.formatNames(['Whiskers', 'Mittens'])).toBe('Whiskers and Mittens');
    });

    it('should format three names with commas and "and"', () => {
      expect(StringUtils.formatNames(['Whiskers', 'Mittens', 'Felix']))
        .toBe('Whiskers, Mittens and Felix');
    });

    it('should format four or more names with commas and "and"', () => {
      expect(StringUtils.formatNames(['Whiskers', 'Mittens', 'Felix', 'Luna']))
        .toBe('Whiskers, Mittens, Felix and Luna');
      
      expect(StringUtils.formatNames(['Whiskers', 'Mittens', 'Felix', 'Luna', 'Oscar']))
        .toBe('Whiskers, Mittens, Felix, Luna and Oscar');
    });
  });
}); 