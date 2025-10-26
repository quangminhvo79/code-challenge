# # Problem 3: Refactor task

# Issues Report: original.tsx

## Computational Inefficiencies

### 1. Redundant `getPriority()` Calls
**Severity: High**

The `getPriority()` function is called multiple times for the same blockchain:
- Once during filtering
- Once for left-hand side in sorting
- Once for right-hand side in sorting

**Problem:** For n items, `getPriority()` is called n times during filtering + approximately 2n log(n) times during sorting = O(n log n) redundant calls.

**Improvement:** Computed the priority once and stored to reduce redundant calls - compute once, use multiple times.

### 2. Unused Computed Value
**Severity: Medium**

The `formattedBalances` variable is computed but never used.
The `rows` mapping uses `sortedBalances` instead and expose balance formatted that in `formattedBalances`.
Calculate `usdValue` in iterate loop.

**Improvement:** Move `formattedBalances` and `sortedBalances` to useWalletBalances hook and return it to make it can use from hook. Add `usdValue` to `formattedBalances` and change `formatted` field to `formattedAmount` field. Use `formattedBalances` to render WalletRow.

### 3. Unnecessary Dependency in `useMemo` (Line 54)
**Severity: Medium**

The `useMemo` hook includes `prices` in its dependency array, but `prices` is never used in the memoized computation. This causes unnecessary re-computation whenever `prices` changes.

**Improvement:** Remove `prices` in dependency array.

### 4. Incomplete Sort Comparison
**Severity: Low**

When priorities are equal, the function returns `undefined` instead of `0`, leading to unstable sorting.

**Improvement:** Update Sort logic to make it more readable and correclty

## Anti-Patterns

### 1. Undefined Variable Reference
**Severity: Critical**

`lhsPriority` is used but never defined. This will cause a runtime error.

**Improvement**: Update from `lhsPriority` to `balancePriority`

### 2. Inverted Filter Logic
**Severity: Critical**

The filter logic is backwards:
- Returns `true` when `balance.amount <= 0` (keeps zero/negative balances)
- Returns `false` otherwise (removes positive balances)

This is likely the opposite of intended behavior.

**Improvement**: Update to filter logic to correctly. Only get `balance` has amount greater than 0.

### 3. Type Safety Issues
**Severity: High**

Multiple type-related problems:
- `blockchain` parameter typed as `any` instead of a proper string union type
- Type annotation claims `FormattedWalletBalance` but actually iterating over `WalletBalance[]` (sortedBalances)
- `WalletBalance` interface missing `blockchain` property that's accessed throughout the code

**Improvement**:

- Create `BlockchainType` to defined blockchain type that we supported, Update type of `blockchain` parameter from `any` to `BlockchainType`
- Add `blockchain` to `WalletBalance` interface
- Changed the data source used for render from `sortedBalances` to `formattedBalances`, which already includes both `usdValue` and `formattedAmount`

### 4. Using Array Index as React Key
**Severity: High**

Using `index` as a React key is an anti-pattern that can cause:
- Incorrect component state retention
- Performance issues during re-renders
- Bugs when the list order changes

**Improvement**

Using `currency` as a unique, stable identifier for each row.

### 5. Accessing Undefined Property
**Severity: Critical**

`balance.formatted` is accessed but `sortedBalances` items don't have a `formatted` property. Only the unused `formattedBalances` has this property. This will cause runtime errors.

**Improvement**

- Changed the data source used for render from `sortedBalances` to `formattedBalances`, which already includes both `usdValue` and `formattedAmount`

### 6. Undefined Variable Reference
**Severity: High**

`classes.row` is used but `classes` is never defined or imported. This will cause a runtime error.

**Improvement**

Remove `classes.row` and use css class name

### 7. Redundant Props Type Annotation
**Severity: Low**

The function parameter is typed twice: `React.FC<Props>` and `(props: Props)`. When using `React.FC<Props>`, the props parameter is already typed, making the second annotation redundant.

**Fixed:** Cleaner code without redundant type annotations.

# Structure Refactor:

- Move `formattedBalances` and `sortedBalances` to useWalletBalances hook to make it can resuse and easy management. `getPriority` is helper method for `formattedBalances` and `sortedBalances` so i move it to useWalletBalances hook as well.
- Create `getPriceByCurrency` on `usePrices` and use it in `useWalletBalances` as helper method to calculate `usdValue` in `formattedBalances`.
- Use Container Pattern for WalletPage and WalletRow to isolated business logic over view.
