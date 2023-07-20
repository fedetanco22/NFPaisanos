import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import Footer from './Footer'

jest.mock('../../utils/fonts.ts', () => {
  return {
    DM_SansFont: { className: 'custom-font-class' },
  }
})

describe('Footer', () => {
  it('should render Logo inside Link with the correct href', () => {
    render(<Footer />)

    const logoLink = screen.getByRole('link')
    const logoImage = screen.getByAltText('NFPaisanos')
    expect(logoLink).toHaveAttribute('href', '/')
    expect(logoImage).toBeInTheDocument()
  })

  it('should render the correct heading', () => {
    render(<Footer />)

    const headingElement = screen.getByText('The New Creative Economy.')
    expect(headingElement).toBeInTheDocument()
  })

  it('should render the correct copyright text', () => {
    render(<Footer />)

    const copyrightElement = screen.getByText(
      'Created with 💚 by Federico Tanco'
    )
    expect(copyrightElement).toBeInTheDocument()
  })

  it('should apply the custom font class to the Button', () => {
    const { container } = render(<Footer />)

    const button = container.getElementsByTagName('button')[0]
    expect(button).toHaveClass('custom-font-class')
  })
})
