/**
 * Calculates the sum of the first `n` natural numbers using
 * the mathematical formula: n * (n + 1) / 2.
 *
 * **Efficiency Evaluation**
 * - Time Complexity:** O(1) (constant time)
 * - Space Complexity:** O(1)
 * - Runtime Efficiency:** Excellent — fastest possible method
 * - Recommended Use:** Always prefer this when `n` is within numeric limits
 *
 * ⚠️ **Notes:**
 * - May lose precision for very large `n` (≥ 9e15) due to floating-point limits.
 * - Use a BigInt version if you need exact results for huge numbers.
 *
 * @param n - The upper bound of the sum (e.g., `n = 5` → 1 + 2 + 3 + 4 + 5)
 * @returns The sum of numbers from 1 to n, or 0 if n ≤ 0
 *
 * @example
 * ```ts
 * mathFormularSum(5); // 15
 * mathFormularSum(100); // 5050
 * ```
 */
const mathFormularSum = function(n: number) {
    if (n <= 0 || Number.isNaN(n)) return 0;
    if (n == Infinity) return Infinity;

    return (n * (n + 1)) / 2
};

/**
 * Calculates the sum of the first `n` natural numbers
 * by iterating through all numbers from 1 to n and summing them up.
 *
 * **Efficiency Evaluation**
 * - Time Complexity:** O(n)
 * - Space Complexity:** O(1)
 * - Runtime Efficiency:** Good — slower than formula but stable for large `n`
 * - Recommended Use:** When clarity or debugging step-by-step is more important than speed
 *
 * ⚠️ **Notes:**
 * - Safe for all positive integers.
 * - Suitable for educational or demonstrative purposes.
 *
 * @param n - The upper bound of the sum
 * @returns The sum of numbers from 1 to n, or 0 if n ≤ 0
 *
 * @example
 * ```ts
 * iterativeSum(5); // 15
 * iterativeSum(3); // 6
 * ```
 */
const iterativeSum = (n: number) => {
    if (n <= 0 || Number.isNaN(n)) return 0;
    if (n == Infinity) return Infinity;

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
 * Calculates the sum of the first `n` natural numbers recursively.
 *
 * **Efficiency Evaluation**
 * - **Time Complexity:** O(n)
 * - **Space Complexity:** O(n) (due to recursion call stack)
 * - **Runtime Efficiency:** Poor — overhead of recursive calls and limited stack depth
 * - **Recommended Use:** Only for demonstration or when recursion is required by design
 *
 * **Notes:**
 * - Risk of stack overflow for large `n` (typically >10,000 depending on environment).
 * - Avoid in production code unless tail-call optimization is guaranteed.
 *
 * @param n - The upper bound of the sum
 * @returns The sum of numbers from 1 to n, or 0 if n ≤ 0
 *
 * @example
 * ```ts
 * recursionSum(5); // 15
 * recursionSum(0); // 0
 * ```
 */
const recursionSum = (n: number): number => {
    try {
        if (n <= 0 || Number.isNaN(n)) return 0;
        if (n === 1) return 1;
        if (n == Infinity) return Infinity;

        return n + recursionSum(n - 1);
    } catch (e) {
        throw new Error('Maximum call stack size exceeded');
    }
};

export { mathFormularSum, iterativeSum, recursionSum };
