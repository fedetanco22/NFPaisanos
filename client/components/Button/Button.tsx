
import React, { ReactNode } from 'react'
import { motion } from "framer-motion"

import styles from './Button.module.css'

import { DM_SansFont } from '@/client/utils/fonts';

interface Props {
  children?: JSX.Element | string;
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'fullWidth'
  variant: 'primary' | 'secondary' | 'outline' | 'link'
  icon?: ReactNode
  className?: string
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  size = 'md',
  variant = 'primary',
  icon,
  className = ''

}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
      className={`
        ${styles.button} 
        ${styles[size]} 
        ${variant && styles[variant]}
        ${className && className} 
        ${DM_SansFont.className}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </motion.button >
  )
}

export default Button
