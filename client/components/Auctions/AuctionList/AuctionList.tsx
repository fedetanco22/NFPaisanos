import React from 'react'

import AuctionCard from '../AuctionCard/AuctionCard'

import styles from './AuctionList.module.css'

import NFPaisanos from '@/types/NFPaisanos'

interface AuctionListProps {
  auctions: NFPaisanos[]
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  const renderAuctions = (): JSX.Element[] => {
    return auctions.map(auction => {
      return <AuctionCard key={auction.id} auction={auction} />
    })
  }

  return <div className={styles.auctionList}>{renderAuctions()}</div>
}

export default AuctionList
