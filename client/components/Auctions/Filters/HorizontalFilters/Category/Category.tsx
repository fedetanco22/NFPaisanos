import React from 'react'

import Button from '@/client/components/Button/Button'

const Category: React.FC<{
  active: boolean
  name: string
  onClick: () => void
}> = ({ active, name, onClick }) => {
  const className = active ? 'active' : ''

  return (
    <div>
      <Button
        variant="link"
        onClick={onClick}
        className={className && className}
        size="md"
        inlineStyles={{ minWidth: '60px', padding: '0px 12px' }}
      >
        {name}
      </Button>
    </div>
  )
}

export default Category
