import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles'

import { AppWrapperProvider } from '../client/utils/context/useAppContext'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <AppWrapperProvider>
        <Component {...pageProps} />
      </AppWrapperProvider>
    </StyledEngineProvider>
  )
}
