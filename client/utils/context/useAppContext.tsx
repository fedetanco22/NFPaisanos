import React, { createContext, useContext, useState } from 'react'

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

interface AppWrapperChildrenInterface {
  children: React.ReactNode
}

const AppContext = createContext<AppContextInterface | null>(null)
export const useAppContextState = (): AppContextInterface => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      'useAppContextState must be used within an AppWrapperProvider'
    )
  }

  return context
}

const FilteredDataContext = createContext<FilteredContextInterface | null>(null)
export const useSetFilteredDataContext = (): FilteredContextInterface => {
  const context = useContext(FilteredDataContext)

  if (!context) {
    throw new Error(
      'useSetFilteredDataContext must be used within an AppWrapperProvider'
    )
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

  const memoizedData = React.useMemo<FilteredContextInterface>(() => {
    return {
      setPriceRange,
      setFilterByOrder,
      setFilterByLikes,
      setFilterByColors,
    }
  }, [setPriceRange, setFilterByOrder, setFilterByLikes, setFilterByColors])

  return (
    <FilteredDataContext.Provider value={memoizedData}>
      <AppContext.Provider
        value={{ priceRange, filterByOrder, filterByLikes, filterByColors }}
      >
        {children}
      </AppContext.Provider>
    </FilteredDataContext.Provider>
  )
}

export default AppWrapperProvider
