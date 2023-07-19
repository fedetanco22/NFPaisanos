import React from 'react'
import Image from 'next/image'

import SmallRoundedImage from '../../Images/SmallRoundedImage/SmallRoundedImage'

import styles from './AuctionCard.module.css'

import NFPaisanos from '@/types/NFPaisanos'

interface AuctionProps {
  auction: NFPaisanos
}

const AuctionCard: React.FC<AuctionProps> = ({ auction }): JSX.Element => {
  return (
    <div className={styles.auctionCard}>
      <div className={styles.auctionCardImage}>
        <Image
          src={auction.media.image}
          alt={`${auction.author}-${auction.media.id}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className={styles.auctionCardInfo}>
        <div className={styles.auctionCardInfoTitle}>
          <h3>Amazing digital art</h3>
          <span>{auction.instantPrice}</span>
        </div>
        <div className={styles.auctionBid}>
          {auction.bidUsers.length > 0 && (
            <div className={styles.auctionBidUsers}>
              {auction.bidUsers.map((user, index) => (
                <div key={index} className={styles.auctionBidUser}>
                  <SmallRoundedImage
                    src={user.avatar}
                    alt={user.name}
                    width={20}
                    height={20}
                  />
                </div>
              ))}
              <div>
                <span>{auction.bidUsers.length}</span> in stock
              </div>
            </div>
          )}
        </div>
        <div className={styles.highestBid}>
          <div>
            <span>Highest bid</span>
            <span>{auction.highestBid}</span>
          </div>
          <p>New Bid</p>
        </div>
      </div>
    </div>
  )
}

export default AuctionCard
