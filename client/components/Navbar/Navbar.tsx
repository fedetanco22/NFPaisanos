import React from 'react'
import Link from 'next/link'

import Button from '../Button/Button'
import Logo from '../Logo/Logo'

import styles from './Navbar.module.css'

import { useAppContextState } from '@/client/utils/context/useAppContext'

export default function Navbar(): JSX.Element {
  const { width } = useAppContextState()
  // console.log('🚀 ~ file: Navbar.tsx:13 ~ Navbar ~ width:', width)

  return (
    <nav className={`${styles.navbar}`}>
      <div className={styles.linkList}>
        <Link href={'/'} className={styles.logo} data-testid="logo-link">
          <Button variant={'link'} size={'md'}>
            <Logo />
          </Button>
        </Link>
        <Link href={'/'} className={styles.link}>
          <Button variant={'link'} size={'sm'}>
            Discover
          </Button>
        </Link>
        <Link href={'/'} className={styles.link}>
          <Button variant={'link'} size={'fullWidth'}>
            What we do
          </Button>
        </Link>
      </div>
      <div className={styles.button}>
        <Button variant={'outline'} size={'sm'}>
          Connect Wallet
        </Button>
      </div>
    </nav>
  )
}
