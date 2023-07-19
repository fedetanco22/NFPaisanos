import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import debounce from 'lodash.debounce'

import AuctionList from '../AuctionList/AuctionList'
import PriceRangeSlider from '../Filters/PriceRangeSlider/PriceRangeSlider'
import SelectInput from '../Filters/SelectInput/SelectInput'
import Button from '../../Button/Button'
import HorizontalFilters from '../Filters/HorizontalFilters/HorizontalFilters'

import styles from './AuctionListContainer.module.css'

import NFPaisanos from '@/types/NFPaisanos'
import SearchInput from '@/client/components/SearchInput/SearchInput'
import { getAuctions } from '@/server/api/services'
import {
  useAppContextState,
  useSetFilteredDataContext,
} from '@/client/utils/context/useAppContext'
import XSVG from '@/public/icons/x.svg'

const orderByOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

const mostLikedOptions = [
  { value: 'mostLiked', label: 'Most liked' },
  { value: 'lessLiked', label: 'Less liked' },
]

const colorsOptions = [
  { value: 'all', label: 'All colors', color: 'transparent' },
  { value: 'black', label: 'Black', color: 'black' },
  { value: 'green', label: 'Green', color: 'green' },
  { value: 'pink', label: 'Pink', color: 'pink' },
  { value: 'purple', label: 'Purple', color: 'purple' },
]

const AuctionListContainer = (): JSX.Element => {
  const [auctions, setAuctions] = useState<NFPaisanos[]>([])
  const { priceRange, filterByOrder, filterByLikes, filterByColors } =
    useAppContextState()
  const {
    setPriceRange,
    setFilterByOrder,
    setFilterByLikes,
    setFilterByColors,
  } = useSetFilteredDataContext()
  const [filteredAuctions, setFilteredAuctions] = useState<NFPaisanos[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getAuctions()
      setAuctions(data)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  const debouncedFetchData = debounce(fetchData, 3000)

  useEffect(() => {
    debouncedFetchData()
  }, [
    priceRange,
    debouncedFetchData,
    filterByOrder,
    filterByLikes,
    filterByColors,
  ])

  const handleResetFilters = (): void => {
    setPriceRange && setPriceRange(10)
    setFilterByOrder && setFilterByOrder('')
    setFilterByLikes && setFilterByLikes('')
    setFilterByColors && setFilterByColors('')
  }

  useEffect(() => {
    const parseEthStringToNumber = (ethString: string): number => {
      const numericString = ethString.replace(/[^\d.]/g, '')
      const numberValue = parseFloat(numericString)

      return numberValue
    }

    const orderBy: Record<string, (a: NFPaisanos, b: NFPaisanos) => number> = {
      newest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      oldest: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    }

    if (auctions.length > 0) {
      const filteredByPrice = auctions.filter(
        (auction: NFPaisanos) =>
          parseEthStringToNumber(auction.instantPrice) <= priceRange
      )

      const orderedAuctions = filteredByPrice.sort(orderBy[filterByOrder])

      setFilteredAuctions(orderedAuctions)
    }
  }, [auctions, priceRange, filterByOrder])

  return (
    <div className={styles.container}>
      <SearchInput />
      <div className={styles.containerWrapper}>
        <HorizontalFilters />
        <div className={styles.filterContainer}>
          <div className={styles.filters}>
            <SelectInput
              options={orderByOptions}
              filterValue={filterByOrder}
              setFilter={setFilterByOrder}
              title={'Order by'}
            />
            <PriceRangeSlider
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />

            <div className={styles.divider}></div>

            <SelectInput
              options={mostLikedOptions}
              filterValue={filterByLikes || ''}
              setFilter={setFilterByLikes}
              title={'Likes'}
              nullOptionLabel={'Sort by likes'}
            />
            <SelectInput
              options={colorsOptions}
              filterValue={filterByColors || ''}
              setFilter={setFilterByColors}
              title={'Colors'}
              nullOptionLabel={'All Colors'}
            />

            <div className={styles.divider}></div>

            <div className={styles.resetButton}>
              <Button
                variant={'link'}
                size={'fullWidth'}
                icon={<Image src={XSVG} alt={'reset-x'} />}
                onClick={() => {
                  handleResetFilters()
                }}
              >
                <span>Reset filters</span>
              </Button>
            </div>
          </div>
          {filteredAuctions.length === 0 && (
            <div className={styles.cards}>
              <div className={styles.noResults}>
                <h3>No results found</h3>
              </div>
            </div>
          )}
          {filteredAuctions.length > 0 && (
            <div className={styles.cards}>
              <AuctionList auctions={filteredAuctions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuctionListContainer
