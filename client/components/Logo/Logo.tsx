import React from 'react'
import Image from 'next/image'

import LogoSVG from '@/public/icons/logo.svg'

const Logo = (): JSX.Element => {
  return (
    <div><Image
      src={LogoSVG}
      placeholder="blur"
      blurDataURL={'/icons/logo.svg'}
      alt='NFPaisanos'
      width={178}
      height={32}
    />
    </div>
  )
}

export default Logo
