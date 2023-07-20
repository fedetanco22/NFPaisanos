import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import { useTime } from 'framer-motion'

import Spinner from './Spinner'

jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const motionDiv = ({
    style,
    children,
  }: {
    style: React.CSSProperties
    children: React.ReactNode
  }) => <div style={style}>{children}</div>

  return {
    motion: {
      div: motionDiv,
    },
    useTime: jest.fn(),
    useTransform: jest.fn(),
  }
})

jest.mock(
  '@/public/icons/letter-logo.svg',
  () => '/static/icons/letter-logo.svg'
)

describe('Spinner', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render the Spinner component with the correct styles', () => {
    ;(useTime as jest.Mock).mockReturnValue(1000)

    const { container } = render(<Spinner />)

    const spinnerElement = container.querySelector('.spinner')

    expect(spinnerElement).toBeInTheDocument()
  })
})
