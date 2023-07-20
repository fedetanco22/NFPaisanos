import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

import styles from './Button.module.css'

import { DM_SansFont } from '@/client/utils/fonts'

interface ButtonProps {
  children?: JSX.Element | string
  onClick?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'fullWidth'
  roundedButton?: boolean
  smallRoundedButton?: boolean
  variant: 'primary' | 'secondary' | 'outline' | 'link'
  icon?: ReactNode
  className?: string
  active?: boolean
  inlineStyles?: React.CSSProperties
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = 'md',
  roundedButton = false,
  smallRoundedButton = false,
  variant = 'primary',
  icon,
  className = '',
  active = false,
  inlineStyles,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={onClick}
      className={`
        ${styles.button} 
        ${styles[size]} 
        ${variant && styles[variant]}
        ${className && styles[className]} 
        ${DM_SansFont.className}
        ${roundedButton && styles.roundedButton}
        ${smallRoundedButton && styles.smallRoundedButton}
        ${active && styles.active}
      `}
      style={inlineStyles && inlineStyles}
    >
      {icon && icon}
      {children}
    </motion.button>
  )
}

export default Button
