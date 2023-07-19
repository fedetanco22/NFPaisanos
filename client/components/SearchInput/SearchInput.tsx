import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'

import Button from '../Button/Button'

import styles from './SearchInput.module.css'

import SearchSVGIcon from '@/public/icons/search.svg'

const SearchInput = (): JSX.Element => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length >= 0) {
      setSearch(e.target.value)
    } else {
      console.log('no search')
    }
  }

  return (
    <div className={styles.search}>
      <input
        name='search'
        id='search'
        value={search}
        type="text"
        placeholder="Type to find something nice... "
        onChange={handleSearchChange}
      />
      <Button variant={'primary'} size={'sm'} roundedButton >
        <Image
          src={SearchSVGIcon}
          width={20}
          height={20}
          alt={'left arrow'}
        />
      </Button>
    </div>)
}

export default SearchInput
