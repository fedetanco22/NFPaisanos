import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

import SmallRoundedImage from '../../Images/SmallRoundedImage/SmallRoundedImage'
import Button from '../../Button/Button'

import styles from './AuctionCard.module.css'

import NFPaisanos from '@/types/NFPaisanos'
import CandlesticksSVG from '@/public/icons/candlesticks.svg'
import ScatterSVG from '@/public/icons/scatter.svg'
import HeartSVG from '@/public/icons/heart.svg'

interface AuctionProps {
  auction: NFPaisanos
}

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transition: { duration: 1.5 },
  },
}

const hoverContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '8px 8px 16px',
}

const containerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}

const spanStyles: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '12px',
  padding: '8px 8px 6px 8px',
  borderRadius: '8px',
  backgroundColor: '#45b26b',
  color: '#fcfcfd',
  textTransform: 'uppercase',
}

const AuctionCard: React.FC<AuctionProps> = ({ auction }): JSX.Element => {
  return (
    <div className={styles.auctionCard}>
      <div className={styles.image}>
        <motion.div
          className={styles.overlay}
          initial="hidden"
          whileHover="visible"
          variants={overlayVariants}
        >
          <div style={hoverContainerStyles}>
            <div style={containerStyles}>
              <span style={spanStyles}>{auction.attributes.type}</span>
              <Button
                variant={'outline'}
                size="xs"
                smallRoundedButton
                inlineStyles={{ backgroundColor: '#23262F', border: 'none' }}
              >
                <Image src={HeartSVG} alt={'heart'} />
              </Button>
            </div>

            <Button
              variant={'primary'}
              size="md"
              inlineStyles={{ maxWidth: '70%' }}
              icon={<Image src={ScatterSVG} alt={'scatter'} />}
            >
              Place a bid
            </Button>
          </div>
        </motion.div>

        <Image
          src={auction.media.image}
          alt={`${auction.author}-${auction.media.id}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className={styles.auctionCardInfo}>
        <div className={styles.auctionCardInfoTitle}>
          <h3 className={styles.title}>Amazing digital art</h3>
          <span className={styles.instantPrice}>{auction.instantPrice}</span>
        </div>
        <div className={styles.auctionBid}>
          <div>
            {auction.bidUsers.length > 0 && (
              <div className={styles.auctionBidUsers}>
                {auction.bidUsers.map((user, index) => (
                  <div
                    key={index}
                    className={styles.auctionBidUser}
                    style={{
                      zIndex: index + 1,
                      left: index * 16,
                      border: '2px solid #23262f',
                    }}
                  >
                    <SmallRoundedImage
                      src={user.avatar}
                      alt={user.name}
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className={styles.auctionStock}>
              <span className={styles.stock}>
                {auction.bidUsers.length} in stock
              </span>
            </div>
          </div>
        </div>
        <div className={styles.highestBidContainer}>
          <div className={styles.highestBid}>
            <Image
              src={CandlesticksSVG}
              alt={'candlesticks'}
              width={20}
              height={20}
            />
            <div>
              <span className={styles.highestBidTitle}>Highest bid</span>
              <span className={styles.highestBidValue}>
                {auction.highestBid}
              </span>
            </div>
          </div>

          <p className={styles.newBidButton}>&#128293; New Bid</p>
        </div>
      </div>
    </div>
  )
}

export default AuctionCard
