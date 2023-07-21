import { useEffect, useMemo, useState } from 'react'

import {
  useAppContextState,
  useData,
  useSetFilteredDataContext,
} from '@/client/utils/context/useAppContext'
import NFPaisanos from '@/types/NFPaisanos'

interface FilterAuctionsProps {
  memoizedFilteredAuctions: NFPaisanos[]
  handleResetFilters: () => void
  handleLoadMore: () => void
  isLoading: boolean
  showMore: number
}

export const useFilterAuctions = (): FilterAuctionsProps => {
  const [filteredAuctions, setFilteredAuctions] = useState<NFPaisanos[]>([])
  const [showMore, setShowMore] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const { auctionsData } = useData()
  const { priceRange, filterByOrder } = useAppContextState()
  const {
    setPriceRange,
    setFilterByOrder,
    setFilterByLikes,
    setFilterByColors,
  } = useSetFilteredDataContext()

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

    if (auctionsData.length > 0) {
      const filteredByPrice = auctionsData.filter(
        (auction: NFPaisanos) =>
          parseEthStringToNumber(auction.instantPrice) <= priceRange
      )

      const orderedAuctions = filteredByPrice.sort(orderBy[filterByOrder])

      const startIndex = 0
      const endIndex = Math.min(showMore, orderedAuctions.length)

      setFilteredAuctions(orderedAuctions.slice(startIndex, endIndex))
    }
  }, [auctionsData, priceRange, filterByOrder, showMore])

  const handleResetFilters = (): void => {
    setPriceRange && setPriceRange(10)
    setFilterByOrder && setFilterByOrder('')
    setFilterByLikes && setFilterByLikes('')
    setFilterByColors && setFilterByColors('')
  }

  const handleLoadMore = (): void => {
    setShowMore((prevShowMore: number) => prevShowMore + 6)
    setIsLoading(true)
  }

  const memoizedFilteredAuctions = useMemo(
    () => filteredAuctions,
    [filteredAuctions, priceRange, filterByOrder, showMore, isLoading]
  )

  return {
    memoizedFilteredAuctions,
    handleResetFilters,
    handleLoadMore,
    isLoading,
    showMore,
  }
}
