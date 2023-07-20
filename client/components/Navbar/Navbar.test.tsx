import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '@testing-library/react'

import Navbar from './Navbar'

jest.mock('../../utils/fonts.ts', () => {
  return {
    DM_SansFont: { className: 'custom-font-class' },
  }
})

describe('Navbar', () => {
  it('should render the correct links and buttons', () => {
    render(<Navbar />)

    const logoLink = screen.getByTestId('logo-link')
    const logoImage = screen.getByAltText('NFPaisanos')
    expect(logoLink).toHaveAttribute('href', '/')
    expect(logoImage).toBeInTheDocument()

    const connectWalletButton = screen.getByRole('button', {
      name: /Connect Wallet/,
    })
    expect(connectWalletButton).toBeInTheDocument()
    expect(connectWalletButton).toHaveClass('outline')
    expect(connectWalletButton).toHaveClass('sm')
  })

  it('should apply the custom font class to the Button', () => {
    const { container } = render(<Navbar />)

    const button = container.getElementsByTagName('button')[0]
    expect(button).toHaveClass('custom-font-class')
  })
})
