import React, { Suspense } from 'react'

import AuctionListContainer from '@/client/components/Auctions/AuctionListContainer/AuctionListContainer'
import Layout from '@/client/components/Layout/Layout'
import Spinner from '@/client/components/Spinner/Spinner'
import { PoppinsFont } from '@/client/utils/fonts'

const LazyPopularAuctions = React.lazy(
  () => import('@/client/components/Auctions/PopularAuctions/PopularAuctions')
)

export default function Home(): JSX.Element {
  return (
    <>
      <div className={`${PoppinsFont.className}`}>
        <Layout
          title="NFPaisanos"
          description="Generated magic by Federico Tanco"
          keywords="NFTs, Challenge, Federico Tanco, paisanos, eth, usd, etherium, dolar, nfpaisanos, crypto, crypto marketplace "
        >
          {/* The Suspense fallback should show the Spinner when fetching 
          data but for now I'm displaying it in each component
           I need a Spinner to simulate a delay */}
          <Suspense fallback={<Spinner />}>
            <LazyPopularAuctions />
          </Suspense>

          <AuctionListContainer />
        </Layout>
      </div>
    </>
  )
}
