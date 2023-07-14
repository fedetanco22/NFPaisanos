import React from 'react'
import Link from 'next/link'

import Button from '../Button/Button'

import styles from './Footer.module.css'

import Logo from '@/client/components/Logo/Logo'

const Footer = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Link href={'/'} className={styles.logo}>
          <Button variant={'link'} size={'md'}><Logo /></Button>
        </Link>
        <h3 className={styles.heading_3}> The New Creative Economy. </h3>
      </div>
      <p className={styles.copywrite}> Created with &#128154; by Federico Tanco  </p>
    </div>
  )
}

export default Footer
