import React from 'react'
import Image from 'next/image'

import LogoSVG from '@/public/icons/logo.svg'

const Logo = (): JSX.Element => {
  return (
    <div><Image
      src={LogoSVG}
      alt='NFPaisanos'
      width={178}
      height={32}
      priority={true}
      style={{ width: '100%', height: 'auto' }}
    /></div>
  )
}

export default Logo
