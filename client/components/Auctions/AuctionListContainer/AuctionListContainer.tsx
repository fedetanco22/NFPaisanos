import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

import AuctionList from '../AuctionList/AuctionList'
import PriceRangeSlider from '../Filters/PriceRangeSlider/PriceRangeSlider'
import SelectInput from '../Filters/SelectInput/SelectInput'

import styles from './AuctionListContainer.module.css'

import SearchInput from '@/client/components/SearchInput/SearchInput'
import { getAuctions } from '@/server/api/services'
import {
  useAppContextState,
  useSetFilteredDataContext,
} from '@/client/utils/context/useAppContext'
import NFPaisanos from '@/types/NFPaisanos'

const orderByOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

const AuctionListContainer = (): JSX.Element => {
  const [auctions, setAuctions] = useState<NFPaisanos[]>([])
  const { priceRange, filterByOrder } = useAppContextState()
  const { setPriceRange, setFilterByOrder } = useSetFilteredDataContext()
  const [filteredAuctions, setFilteredAuctions] = useState<NFPaisanos[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getAuctions()
      setAuctions(data)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  const debouncedFetchData = debounce(fetchData, 300)

  useEffect(() => {
    debouncedFetchData()
  }, [priceRange, debouncedFetchData, filterByOrder])

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
      <>
        <SearchInput />
        <div className={styles.filterContainer}>
          <div className={styles.filters}>
            <SelectInput
              options={orderByOptions}
              filterByOrder={filterByOrder}
              setFilterByOrder={setFilterByOrder}
            />
            <PriceRangeSlider
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
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
      </>
    </div>
  )
}

export default AuctionListContainer
