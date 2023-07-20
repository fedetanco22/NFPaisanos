import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'

import SmallRoundedImage from './SmallRoundedImage'

describe('SmallRoundedImage', () => {
  it('should render with the correct props', () => {
    const testSrc = '/default.jpg'
    const testWidth = 48
    const testHeight = 48
    const testAlt = 'Test Image'
    const testClassNames = 'custom-class'
    const testBgColor = 'red'
    const testDivStyles = { padding: '8px' }

    const { container } = render(
      <SmallRoundedImage
        src={testSrc}
        width={testWidth}
        height={testHeight}
        alt={testAlt}
        classNames={testClassNames}
        bgColor={testBgColor}
        divStyles={testDivStyles}
      />
    )

    const imageDiv = container.firstChild
    expect(imageDiv).toBeInTheDocument()
    expect(imageDiv).toHaveClass('custom-class')
    expect(imageDiv).toHaveStyle('border-radius: 50%')
    expect(imageDiv).toHaveStyle('background-color: red')
    expect(imageDiv).toHaveStyle('padding: 8px')

    const imageElement = container.querySelector('img')
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining('/_next/image?url=')
    )
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining('default.jpg')
    )
    expect(imageElement).toHaveAttribute('width', '48')
    expect(imageElement).toHaveAttribute('height', '48')
    expect(imageElement).toHaveAttribute('alt', 'Test Image')
    expect(imageElement).toHaveStyle('border-radius: 50%')
  })

  it('should use default values if props are not provided', () => {
    const { container } = render(<SmallRoundedImage src="/default.jpg" />)

    const imageElement = container.querySelector('img')
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining('/_next/image?url=')
    )
    expect(imageElement).toHaveAttribute(
      'src',
      expect.stringContaining('default.jpg')
    )
    expect(imageElement).toHaveAttribute('width', '40')
    expect(imageElement).toHaveAttribute('height', '40')
    expect(imageElement).toHaveAttribute('alt', 'avatar')
    expect(imageElement).toHaveStyle('border-radius: 50%')
  })
})
