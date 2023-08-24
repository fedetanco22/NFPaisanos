import React, { memo, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

import styles from './ImagePanel.module.css'

function ImagePanel({ children }: { children: ReactNode }): JSX.Element {
  const [imageLoading, setImageLoading] = useState(true)
  const [pulsing, setPulsing] = useState(true)

  const imageLoaded = (): void => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 3000)
  }

  return (
    <div className={`${pulsing ? styles.pulse : ''} ${styles.loadable}`}>
      <motion.div
        initial={{ height: '16rem', opacity: 0 }}
        style={{ position: 'relative' }}
        animate={{
          height: imageLoading ? '1rem' : '800px',
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{
          height: { delay: 0, duration: 0.4 },
          opacity: { delay: 0.5, duration: 0.4 },
        }}
        onLoad={imageLoaded}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default memo(ImagePanel)
