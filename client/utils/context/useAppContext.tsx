import React, { createContext, useContext, useState } from 'react'

interface AppContextInterface {
  priceRange: number
  filterByOrder: string
}

interface FilteredContextInterface {
  setPriceRange: React.Dispatch<React.SetStateAction<number>>
  setFilterByOrder: React.Dispatch<React.SetStateAction<string>>
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

  const memoizedData = React.useMemo<FilteredContextInterface>(() => {
    return {
      setPriceRange,
      setFilterByOrder,
    }
  }, [setPriceRange, setFilterByOrder])

  return (
    <FilteredDataContext.Provider value={memoizedData}>
      <AppContext.Provider value={{ priceRange, filterByOrder }}>
        {children}
      </AppContext.Provider>
    </FilteredDataContext.Provider>
  )
}

export default AppWrapperProvider
