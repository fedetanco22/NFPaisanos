import React, { Suspense } from 'react'

import AuctionListContainer from '@/client/components/Auctions/AuctionListContainer/AuctionListContainer'
import Layout from '@/client/components/Layout/Layout'
import Spinner from '@/client/components/Spinner/Spinner'
import { PoppinsFont } from '@/client/utils/fonts'
import { useData } from '@/client/utils/context/useAppContext'

const LazyPopularAuctions = React.lazy(
  () => import('@/client/components/Auctions/PopularAuctions/PopularAuctions')
)

export default function Home(): JSX.Element {
  const { loading } = useData()

  return (
    <>
      <div className={`${PoppinsFont.className}`}>
        <Layout
          title="NFPaisanos"
          description="Generated magic by Federico Tanco"
          keywords="NFTs, Challenge, Federico Tanco, paisanos, eth, usd, etherium, dolar, nfpaisanos, crypto, crypto marketplace "
        >
          {loading ? (
            <Spinner />
          ) : (
            <Suspense fallback={<Spinner />}>
              <LazyPopularAuctions />
              <AuctionListContainer />
            </Suspense>
          )}
        </Layout>
      </div>
    </>
  )
}
