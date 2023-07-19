import React from 'react'
import Image from 'next/image'

import styles from './SmallRoundedImage.module.css'

export interface ImageProps {
  src: string
  width?: 20 | 24 | 32 | 40 | 48 | 56
  height?: 20 | 24 | 32 | 40 | 48 | 56
  alt?: string
  classNames?: string
  bgColor?: string
  divStyles?: React.CSSProperties
}

const SmallRoundedImage: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  classNames,
  bgColor,
  divStyles,
}) => {
  return (
    <div
      className={`${styles.image} ${classNames}`}
      style={{
        borderRadius: '50%',
        backgroundColor: bgColor || 'transparent',
        ...divStyles,
      }}
    >
      <Image
        src={src}
        width={width || 40}
        height={height || 40}
        alt={alt || 'avatar'}
        style={{ borderRadius: '50%' }}
      />
    </div>
  )
}

export default SmallRoundedImage
