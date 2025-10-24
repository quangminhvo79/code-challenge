import { describe, expect, test} from '@jest/globals';
import { mathFormularSum, iterativeSum, recursionSum } from './index';

describe("Problem 1 - Sum of First n Natural Numbers", () => {
  describe('mathFormularSum', () => {
    test('should return correct result for small numbers', () => {
      expect(mathFormularSum(1)).toBe(1);
      expect(mathFormularSum(2)).toBe(3);
      expect(mathFormularSum(3)).toBe(6);
      expect(mathFormularSum(5)).toBe(15);
      expect(mathFormularSum(10)).toBe(55);
    });

    test('should handle 0 and negative numbers', () => {
      expect(mathFormularSum(0)).toBe(0);
      expect(mathFormularSum(-5)).toBe(0);
      expect(mathFormularSum(NaN)).toBe(0);
      expect(mathFormularSum(Infinity)).toBe(Infinity);
    });

    test('should handle large numbers without precision loss (approx)', () => {
      expect(mathFormularSum(100000)).toBe(5000050000);
    });
  });

  describe('iterativeSum', () => {
    test('should return correct result for small numbers', () => {
      expect(iterativeSum(1)).toBe(1);
      expect(iterativeSum(2)).toBe(3);
      expect(iterativeSum(3)).toBe(6);
      expect(iterativeSum(5)).toBe(15);
      expect(iterativeSum(10)).toBe(55);
    });

    test('should handle 0 and negative numbers', () => {
      expect(iterativeSum(0)).toBe(0);
      expect(iterativeSum(-5)).toBe(0);
      expect(iterativeSum(NaN)).toBe(0);
      expect(iterativeSum(Infinity)).toBe(Infinity);
    });

    test('should handle large numbers without precision loss (approx)', () => {
      expect(iterativeSum(100000)).toBe(5000050000);
    });
  });

  describe('recursionSum', () => {
    test('should return correct result for small numbers', () => {
      expect(recursionSum(1)).toBe(1);
      expect(recursionSum(2)).toBe(3);
      expect(recursionSum(3)).toBe(6);
      expect(recursionSum(5)).toBe(15);
      expect(recursionSum(10)).toBe(55);
    });

    test('should handle 0 and negative numbers', () => {
      expect(recursionSum(0)).toBe(0);
      expect(recursionSum(-5)).toBe(0);
      expect(recursionSum(NaN)).toBe(0);
      expect(recursionSum(Infinity)).toBe(Infinity);
    });

    test('should handle large numbers without precision loss (approx)', () => {
      expect(() => recursionSum(10000)).toThrow(new Error('Maximum call stack size exceeded'));
    });
  });
});
