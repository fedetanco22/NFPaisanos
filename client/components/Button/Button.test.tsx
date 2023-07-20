import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from './Button'

jest.mock('../../utils/fonts.ts', () => {
  return {
    DM_SansFont: { className: 'custom-font-class' },
  }
})

describe('Button', () => {
  it('should call the onClick function when clicked', () => {
    const onClickMock = jest.fn()
    const { getByText } = render(
      <Button variant="link" onClick={onClickMock}>
        Click Me
      </Button>
    )
    const button = getByText('Click Me')
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should apply the custom font class', () => {
    const { container } = render(
      <Button variant="primary" className="customButton">
        Custom Button
      </Button>
    )

    expect(container.firstChild).toHaveClass('custom-font-class')
  })

  it('should apply the specified size class', () => {
    const { container } = render(
      <Button variant="primary" size="lg">
        Large Button
      </Button>
    )
    expect(container.firstChild).toHaveClass('lg')
  })

  it('should apply the specified variant class', () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>
    )
    expect(container.firstChild).toHaveClass('secondary')
  })

  it('should apply the custom className', () => {
    const { container } = render(
      <Button variant="primary" className="customButton">
        Custom Button
      </Button>
    )
    expect(container.firstChild).toHaveClass('customButton')
  })
})
