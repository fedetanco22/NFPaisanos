import React, { createContext, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

import { getPopularAuctions, getAuctions } from '@/server/api/services'
import NFPaisanos from '@/types/NFPaisanos'

interface AppContextInterface {
  priceRange: number
  filterByOrder: string
  filterByLikes?: string
  filterByColors?: string
}

interface FilteredContextInterface {
  setPriceRange: React.Dispatch<React.SetStateAction<number>>
  setFilterByOrder: React.Dispatch<React.SetStateAction<string>>
  setFilterByLikes?: React.Dispatch<React.SetStateAction<string>>
  setFilterByColors?: React.Dispatch<React.SetStateAction<string>>
}

interface DataContextInterface {
  popularAuctionsData: NFPaisanos[]
  auctionsData: NFPaisanos[]
  loading: boolean
}

interface AppWrapperChildrenInterface {
  children: React.ReactNode
}

const AppContext = createContext<AppContextInterface | null>(null)
const FilteredDataContext = createContext<FilteredContextInterface | null>(null)
const DataContext = createContext<DataContextInterface | null>(null)

export const useAppContextState = (): AppContextInterface => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      'useAppContextState must be used within an AppWrapperProvider'
    )
  }

  return context
}

export const useSetFilteredDataContext = (): FilteredContextInterface => {
  const context = useContext(FilteredDataContext)

  if (!context) {
    throw new Error(
      'useSetFilteredDataContext must be used within an AppWrapperProvider'
    )
  }

  return context
}

export const useData = (): DataContextInterface => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within an AppWrapperProvider')
  }

  return context
}

export const AppWrapperProvider: React.FC<AppWrapperChildrenInterface> = ({
  children,
}) => {
  const [priceRange, setPriceRange] = useState<number>(10)
  const [filterByOrder, setFilterByOrder] = useState<string>('')
  const [filterByLikes, setFilterByLikes] = useState<string>('')
  const [filterByColors, setFilterByColors] = useState<string>('')
  const [auctionsData, setAuctionsData] = useState<NFPaisanos[]>([])
  const [popularAuctionsData, setPopularAuctionsData] = useState<NFPaisanos[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPopularAuctionsData = async (): Promise<void> => {
    try {
      const data = await getPopularAuctions()
      setPopularAuctionsData(data)
    } catch (error) {
      // Handle error
      throw new Error(error as string)
    }
  }

  const fetchAuctionsData = async (): Promise<void> => {
    try {
      const data = await getAuctions()
      setAuctionsData(data)
    } catch (error) {
      // Handle error
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    Promise.all([fetchPopularAuctionsData(), fetchAuctionsData()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  const debouncedFetchData = debounce(fetchAuctionsData, 300)

  useEffect(() => {
    debouncedFetchData()
  }, [priceRange, filterByOrder, filterByLikes, filterByColors])

  const filteredDataContextValue =
    React.useMemo<FilteredContextInterface>(() => {
      return {
        setPriceRange,
        setFilterByOrder,
        setFilterByLikes,
        setFilterByColors,
      }
    }, [setPriceRange, setFilterByOrder, setFilterByLikes, setFilterByColors])

  const dataContextValue = React.useMemo<DataContextInterface>(() => {
    return {
      popularAuctionsData,
      auctionsData,
      loading,
    }
  }, [popularAuctionsData, auctionsData, loading])

  return (
    <FilteredDataContext.Provider value={filteredDataContextValue}>
      <AppContext.Provider
        value={{
          priceRange,
          filterByOrder,
          filterByLikes,
          filterByColors,
        }}
      >
        <DataContext.Provider value={dataContextValue}>
          {children}
        </DataContext.Provider>
      </AppContext.Provider>
    </FilteredDataContext.Provider>
  )
}

export default AppWrapperProvider
