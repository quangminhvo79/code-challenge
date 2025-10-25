import { expect, test, describe, beforeEach } from 'vitest'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import SwapForm from '@/components/SwapForm'
import { WalletProvider } from '@/contexts/walletContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('SwapForm Component', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  const renderSwapForm = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <SwapForm />
        </WalletProvider>
      </QueryClientProvider>
    )
  }

  describe('Initial Rendering', () => {
    test('should render the component with correct title', async () => {
      renderSwapForm()
      await expect.element(page.getByText('Coding challenge')).toBeInTheDocument()
    })

    test('should render selling and buying sections', async () => {
      renderSwapForm()
      await expect.element(page.getByText('Selling')).toBeInTheDocument()
      await expect.element(page.getByText('Buying')).toBeInTheDocument()
    })

    test('should render token dropdowns', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')

      await expect.element(sellingDropdown).toBeVisible()
      await expect.element(buyingDropdown).toBeVisible()
    })

    test('should render amount input fields', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')

      await expect.element(sellingInput).toBeVisible()
      await expect.element(buyingInput).toBeVisible()
    })

    test('should render swap button', async () => {
      renderSwapForm()
      const swapButton = page.getByRole('button', { name: 'Swap' })
      await expect.element(swapButton).toBeInTheDocument()
    })

    test('should render switch tokens button', async () => {
      renderSwapForm()
      const switchButton = page.getByTestId('switchTokens')
      await expect.element(switchButton).toBeVisible()
    })

    test('should display initial balance', async () => {
      renderSwapForm()
      // Wait for tokens to load
      await expect.element(page.getByText(/Balance: \$/)).toBeInTheDocument()
    })
  })

  describe('Token Selection', () => {
    test('should allow selecting a selling token', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')

      await sellingDropdown.selectOptions('USDT')
      await expect.element(sellingDropdown).toHaveValue('USDT')
    })

    test('should allow selecting a buying token', async () => {
      renderSwapForm()
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')

      await buyingDropdown.selectOptions('ETH')
      await expect.element(buyingDropdown).toHaveValue('ETH')
    })

    test('should update balance when changing selling token', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')

      await sellingDropdown.selectOptions('USDT')
      // Balance should update to USDT balance
      await expect.element(page.getByText('Balance: $300')).toBeInTheDocument()
    })

    test('should display token icons when tokens are selected', async () => {
      renderSwapForm()
      // Wait for images to be visible
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      await expect.element(sellingDropdown).toBeVisible()
      await expect.element(page.getByTestId('sellingTokenImg')).toBeVisible()
      await expect.element(page.getByTestId('sellingTokenImg')).toHaveAttribute("src", "/images/BLUR.svg")
      await sellingDropdown.selectOptions('USDT')
      await expect.element(page.getByTestId('sellingTokenImg')).toHaveAttribute("src", "/images/USDT.svg")
    })
  })

  describe('Amount Input and Calculation', () => {
    test('should accept numeric input in selling amount', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('100')
      await expect.element(sellingInput).toHaveValue('100')
    })

    test('should calculate buying amount when selling amount is entered', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')
      await sellingInput.fill('100')

      // Should calculate buying amount based on conversion rate
      await expect.element(buyingInput).not.toHaveValue('')
    })

    test('should calculate selling amount when buying amount is entered', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')

      await buyingInput.fill('50')

      // Should calculate selling amount based on conversion rate
      await expect.element(sellingInput).not.toHaveValue('')
    })

    test('should accept decimal values', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('123.456')
      await expect.element(sellingInput).toHaveValue('123.456')
    })

    test('should limit decimal places to 6', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('123.4567890')
      // Should only accept up to 6 decimal places
      await expect.element(sellingInput).toHaveValue('123.456789')
    })

    test('should not accept non-numeric characters', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('abc')
      await expect.element(sellingInput).toHaveValue('')
    })

    test('should display conversion rate when amounts are entered', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('100')

      // Should display rate information
      await expect.element(page.getByText('Rate')).toBeInTheDocument()
    })

    test('should display USD value for selling amount', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingDropdown.selectOptions('USDT')
      await sellingInput.fill('100')

      // Should display USD value
      await expect.element(page.getByTestId("sellingUSD")).toBeInTheDocument()
      await expect.element(page.getByTestId("sellingUSD")).toHaveTextContent("$ 101.00")
    })
  })

  describe('Token Swapping Functionality', () => {
    test('should swap tokens and update balances', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const swapButton = page.getByRole('button', { name: 'Swap' })

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')

      // Get initial balance
      await expect.element(page.getByTestId("balance")).toHaveTextContent("Balance: $300")
      await sellingInput.fill('50')
      await swapButton.click()

      // Balance should change after swap
      await expect.element(page.getByTestId("balance")).toHaveTextContent('Balance: $250')
    })

    test('should clear input fields after successful swap', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')
      const swapButton = page.getByRole('button', { name: 'Swap' })

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')
      await sellingInput.fill('50')
      await swapButton.click()

      // Inputs should be cleared
      await expect.element(sellingInput).toHaveValue('')
      await expect.element(buyingInput).toHaveValue('')
    })

    test('should disable swap button when no amount is entered', async () => {
      renderSwapForm()
      const swapButton = page.getByRole('button', { name: 'Swap' })

      await expect.element(swapButton).toBeDisabled()
    })

    test('should disable swap button when selling amount is 0', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')
      const swapButton = page.getByRole('button', { name: 'Swap' })

      await sellingInput.fill('0')
      await expect.element(swapButton).toBeDisabled()
    })
  })

  describe('Switch Tokens Functionality', () => {
    test('should switch selling and buying tokens', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const switchButton = page.getByTestId('switchTokens')

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')

      await switchButton.click()

      // Tokens should be switched
      await expect.element(sellingDropdown).toHaveValue('USDC')
      await expect.element(buyingDropdown).toHaveValue('USDT')
    })

    test('should recalculate amounts when switching tokens', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')
      const switchButton = page.getByTestId('switchTokens')

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')
      await sellingInput.fill('100')
      await expect.element(buyingInput).toHaveValue('101.030511')


      await switchButton.click()

      // Buying amount should be recalculated
      await expect.element(buyingInput).toHaveValue('98.980000')
    })

    test('should update balance display when switching tokens', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const switchButton = page.getByTestId('switchTokens')

      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('ETH')

      await expect.element(page.getByTestId('balance')).toHaveTextContent('Balance: $300')

      await switchButton.click()
      await expect.element(page.getByTestId('balance')).toHaveTextContent('Balance: $3')
    })
  })

  describe('Balance Validation', () => {
    test('should show error when selling amount exceeds balance', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingDropdown.selectOptions('ETH')
      // ETH has balance of 3
      await sellingInput.fill('100')

      // Should show insufficient balance error
      await expect.element(page.getByText('Insufficient balance for selling amount')).toBeInTheDocument()
    })

    test('should disable swap button when balance is insufficient', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const swapButton = page.getByRole('button', { name: 'Swap' })

      await sellingDropdown.selectOptions('ETH')
      await sellingInput.fill('100')

      await expect.element(swapButton).toBeDisabled()
    })

    test('should not show error when selling amount is within balance', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingDropdown.selectOptions('USDT')
      await sellingInput.fill('100')

      // Should not show error
      const errorElement = page.getByText('Insufficient balance for selling amount')
      await expect.poll(() => errorElement.query()).toBe(null)
    })
  })

  describe('Edge Cases', () => {
    test('should handle empty string input', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')

      await sellingInput.fill('100')
      await sellingInput.clear()

      // Buying input should also be empty
      await expect.element(buyingInput).toHaveValue('')
    })

    test('should handle very small amounts', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('0.000001')
      await expect.element(sellingInput).toHaveValue('0.000001')
    })

    test('should handle very large amounts', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('999999999')
      await expect.element(sellingInput).toHaveValue('999999999')
    })

    test('should not accept leading zeros', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('00')
      // Should not accept "00"
      await expect.element(sellingInput).toHaveValue('')
    })

    test('should accept single zero', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('0')
      await expect.element(sellingInput).toHaveValue('0')
    })

    test('should accept zero followed by decimal', async () => {
      renderSwapForm()
      const sellingInput = page.getByTestId('sellingTokenInput')

      await sellingInput.fill('0.5')
      await expect.element(sellingInput).toHaveValue('0.5')
    })
  })

  describe('Integration Test - Complete Flow', () => {
    test('should complete a full swap flow', async () => {
      renderSwapForm()
      const sellingDropdown = page.getByTestId('sellingTokenDropdown')
      const buyingDropdown = page.getByTestId('buyingTokenDropdown')
      const sellingInput = page.getByTestId('sellingTokenInput')
      const buyingInput = page.getByTestId('buyingTokenInput')
      const swapButton = page.getByRole('button', { name: 'Swap' })

      // Step 1: Select tokens
      await expect.element(sellingDropdown).toBeVisible()
      await sellingDropdown.selectOptions('USDT')
      await buyingDropdown.selectOptions('USDC')

      // Step 2: Check initial balance
      await expect.element(page.getByText('Balance: $300')).toBeInTheDocument()

      // Step 3: Enter amount
      await sellingInput.fill('250')

      // Step 4: Verify calculation
      await expect.element(buyingInput).not.toHaveValue('')

      // Step 5: Verify rate display
      await expect.element(page.getByText('Rate')).toBeInTheDocument()

      // Step 6: Execute swap
      await swapButton.click()

      // Step 7: Verify balance updated
      await expect.element(page.getByText('Balance: $50')).toBeInTheDocument()

      // Step 8: Verify inputs cleared
      await expect.element(sellingInput).toHaveValue('')
      await expect.element(buyingInput).toHaveValue('')

      // Step 9: Switch tokens
      await page.getByTestId('switchTokens').click()

      // Step 10: Verify tokens switched and balance updated
      await expect.element(sellingDropdown).toHaveValue('USDC')
      await expect.element(page.getByText(/Balance: \$/)).toBeInTheDocument()
    })
  })
})
