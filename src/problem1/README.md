# Problem 1: Sum of First n Natural Numbers

A TypeScript implementation that calculates the sum of the first `n` natural numbers (1 + 2 + 3 + ... + n) using three different approaches, each with its own performance characteristics and use cases.

## Overview

This module provides three different algorithms to solve the same problem, allowing you to choose the most appropriate approach based on your specific requirements:

1. **Mathematical Formula** - O(1) time complexity (constant time)
2. **Iterative Approach** - O(n) time complexity with O(1) space
3. **Recursive Approach** - O(n) time and O(n) space complexity

## Functions

### 1. `mathFormularSum(n: number): number`

Uses the mathematical formula: `n × (n + 1) / 2`

**Complexity:**
- Time: O(1) - Constant time
- Space: O(1) - Constant space

**Advantages:**
- Fastest possible method
- Most efficient for all valid inputs
- No iteration or recursion overhead

**Limitations:**
- May lose precision for very large numbers (n ≥ 9×10¹⁵) due to JavaScript's floating-point limits
- For exact results with huge numbers, consider using BigInt

**Recommended Use:** Always prefer this method when `n` is within numeric limits and performance matters.

**Example:**
```typescript
mathFormularSum(5);      // 15
mathFormularSum(100);    // 5050
mathFormularSum(0);      // 0
mathFormularSum(-5);     // 0
```

### 2. `iterativeSum(n: number): number`

Calculates the sum by iterating through all numbers from 1 to n.

**Complexity:**
- Time: O(n) - Linear time
- Space: O(1) - Constant space

**Advantages:**
- Simple and straightforward logic
- Safe for all positive integers
- No stack overflow risk
- Good for educational or demonstrative purposes

**Limitations:**
- Slower than the formula approach for large `n`
- Still requires iterating through all numbers

**Recommended Use:** When code clarity or step-by-step debugging is more important than performance, or for educational demonstrations.

**Example:**
```typescript
iterativeSum(5);         // 15
iterativeSum(3);         // 6
iterativeSum(100000);    // 5000050000
```

### 3. `recursionSum(n: number): number`

Calculates the sum recursively by breaking down the problem: `sum(n) = n + sum(n-1)`

**Complexity:**
- Time: O(n) - Linear time
- Space: O(n) - Linear space (due to call stack)

**Advantages:**
- Demonstrates recursive problem-solving
- Elegant mathematical representation

**Limitations:**
- **Risk of stack overflow** for large `n` (typically > 10,000)
- Higher memory usage due to call stack
- Slower than both other approaches due to function call overhead
- Not recommended for production use

**Recommended Use:** Only for educational purposes, algorithm demonstrations, or when recursion is explicitly required by design constraints.

**Example:**
```typescript
recursionSum(5);         // 15
recursionSum(10);        // 55
recursionSum(10000);     // Throws: 'Maximum call stack size exceeded'
```

## Performance Comparison

| Method | Time | Space | Speed | Safety | Best For |
|--------|------|-------|-------|--------|----------|
| **mathFormularSum** | O(1) | O(1) | ⚡⚡⚡ Fastest | ✅ High | Production, performance-critical |
| **iterativeSum** | O(n) | O(1) | ⚡⚡ Fast | ✅ High | Clarity, education |
| **recursionSum** | O(n) | O(n) | ⚡ Slow | ⚠️ Low (stack overflow) | Education only |

## Installation & Setup

This project is part of a larger code-challenge repository. Tests are configured at the root level.

### Prerequisites
- Node.js (v14 or higher recommended)
- TypeScript 5.9.3+
- Jest 30.2.0+

### Running the Code

The functions are exported from `index.ts` and can be imported:

```typescript
import { mathFormularSum, iterativeSum, recursionSum } from './index';

// Use the most efficient method
const result = mathFormularSum(1000); // 500500
```

## Testing

Comprehensive test coverage is provided using Jest with TypeScript support.

### Run Tests

From the root directory of the code-challenge project:

```bash
yarn test
# or
npm test
```

### Test Coverage

The test suite includes:

✅ **Correctness Tests**
- Small numbers (1, 2, 3, 5, 10)
- Large numbers (100,000)
- Edge cases (0, negative numbers, NaN, Infinity)

✅ **Edge Case Handling**
- Zero input → returns 0
- Negative numbers → returns 0
- NaN input → returns 0
- Infinity input → returns Infinity
- Stack overflow for recursive approach with large inputs

✅ **All Three Approaches**
- mathFormularSum validation
- iterativeSum validation
- recursionSum validation (including stack overflow test)

### Test Results

All three functions produce identical results for valid inputs:

```typescript
// All return 15
mathFormularSum(5)    // O(1) - instant
iterativeSum(5)       // O(n) - 5 iterations
recursionSum(5)       // O(n) - 5 recursive calls

// All return 5050
mathFormularSum(100)
iterativeSum(100)
recursionSum(100)
```

## Algorithm Explanation

### Mathematical Formula Approach

The sum of first n natural numbers follows the pattern:
```
1 + 2 + 3 + ... + n = n × (n + 1) / 2
```

**Derivation:**
```
Let S = 1 + 2 + 3 + ... + n
Also S = n + (n-1) + (n-2) + ... + 1
Adding both:
2S = (n+1) + (n+1) + (n+1) + ... + (n+1)  [n times]
2S = n × (n+1)
S = n × (n+1) / 2
```

### Iterative Approach

Simple accumulation:
```typescript
sum = 0
for i from 1 to n:
    sum = sum + i
return sum
```

### Recursive Approach

Breaks the problem into smaller subproblems:
```typescript
sum(n) = n + sum(n-1)
sum(1) = 1  // base case
```

## Edge Cases Handled

All functions handle:

- **n ≤ 0**: Returns 0
- **NaN**: Returns 0
- **Infinity**: Returns Infinity
- **Negative numbers**: Returns 0
- **Very large numbers**:
  - `mathFormularSum` and `iterativeSum` work correctly
  - `recursionSum` throws error (stack overflow protection)

## Recommendations

**For Production Code:**
- ✅ Use `mathFormularSum` - it's O(1) and most efficient

**For Learning/Teaching:**
- ✅ Use `iterativeSum` to show iteration
- ✅ Use `recursionSum` to demonstrate recursion concepts
- ⚠️ Never use `recursionSum` in production

**For Code Interviews:**
- Mention all three approaches
- Explain trade-offs
- Implement `mathFormularSum` for optimal solution

## File Structure

```
problem1/
├── index.ts           # Implementation of three approaches
├── index.test.ts      # Jest test suite
└── README.md          # This file
```

## Author & Context

This is a coding challenge solution demonstrating:
- Multiple algorithmic approaches to the same problem
- Time and space complexity analysis
- Edge case handling
- Comprehensive testing practices
- Production vs educational code considerations
