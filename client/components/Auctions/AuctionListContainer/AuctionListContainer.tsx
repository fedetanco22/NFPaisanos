import React from 'react'
import Image from 'next/image'

import AuctionList from '../AuctionList/AuctionList'
import PriceRangeSlider from '../Filters/PriceRangeSlider/PriceRangeSlider'
import SelectInput from '../Filters/SelectInput/SelectInput'
import Button from '../../Button/Button'
import HorizontalFilters from '../Filters/HorizontalFilters/HorizontalFilters'

import styles from './AuctionListContainer.module.css'

import SearchInput from '@/client/components/SearchInput/SearchInput'
import {
  useAppContextState,
  useSetFilteredDataContext,
} from '@/client/utils/context/useAppContext'
import XSVG from '@/public/icons/X.svg'
import LoadingSVG from '@/public/icons/loading.svg'
import { useFilterAuctions } from '@/client/utils/hooks/useFilteredAuctions'

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
  const { filterByOrder, filterByLikes, filterByColors, priceRange } =
    useAppContextState()

  const {
    setFilterByOrder,
    setPriceRange,
    setFilterByColors,
    setFilterByLikes,
  } = useSetFilteredDataContext()
  
  const {
    memoizedFilteredAuctions,
    handleResetFilters,
    handleLoadMore,
    isLoading,
    showMore,
  } = useFilterAuctions()

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
          {memoizedFilteredAuctions.length === 0 && (
            <div className={styles.cards}>
              <div className={styles.noResults}>
                <h3>No results found</h3>
              </div>
            </div>
          )}
          {memoizedFilteredAuctions.length > 0 && (
            <>
              <div className={styles.cards}>
                <AuctionList auctions={memoizedFilteredAuctions} />
                {!isLoading && memoizedFilteredAuctions.length > 0 && (
                  <div className={styles.loadMore}>
                    {memoizedFilteredAuctions.length >= showMore && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLoadMore}
                        icon={
                          (!isLoading && (
                            <Image src={LoadingSVG} alt={'loading'} />
                          )) ||
                          null
                        }
                      >
                        Load More
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuctionListContainer
