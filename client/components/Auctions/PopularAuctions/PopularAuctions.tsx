import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'

import Spinner from '../../Spinner/Spinner'
import SmallRoundedImage from '../../Images/SmallRoundedImage/SmallRoundedImage'
import Button from '../../Button/Button'

import styles from './PopularAuctions.module.css'
import ImagePanel from './ImagePanel/ImagePanel'
import Bid from './Bid/Bid'

import { getPopularAuctions } from '@/server/api/services'
import NFPaisanos from '@/types/NFPaisanos'
import { DM_SansFont, PoppinsFont } from '@/client/utils/fonts'
import StopSVGIcon from '@/public/icons/stop.svg'
import LeftArrowSVGIcon from '@/public/icons/arrow-left.svg'
import RightArrowSVGIcon from '@/public/icons/arrow-right.svg'

function PopularAuctions(): JSX.Element {
  const [popularAuctions, setPopularAuctions] = useState([] as NFPaisanos[])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchData = async (): Promise<void> => {
    const data = await getPopularAuctions()
    setPopularAuctions(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const AuctionDisplayed = popularAuctions[currentPage]

  const handlePreviousAuction = (currentPage: number): void => {
    if (currentPage === 0) {
      setCurrentPage(popularAuctions.length - 1)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextAuction = (currentPage: number): void => {
    if (currentPage === popularAuctions.length - 1) {
      setCurrentPage(0)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className={styles.grid}>
      <div className={styles.panels}>
        <ImagePanel>
          <Image
            src={AuctionDisplayed.media.image}
            alt={`popular auction ${AuctionDisplayed.id}`}
            priority={true}
            quality={100}
            width="0"
            height="0"
            sizes={`(max-width: 768px) 100vw, 768px`}
            style={{ width: '100%', height: 'auto' }}
          />
        </ImagePanel>
      </div>
      <div className={`${styles.panels} ${styles.rightPanel}`}>
        <div className={styles.panelContent}>
          <div>
            <h1 className={DM_SansFont.className}>the creator network®</h1>
            <div className={`${styles.avatarContent} ${PoppinsFont.className}`}>
              <div className={styles.content}>
                <SmallRoundedImage
                  src={AuctionDisplayed.authorAvatar}
                  alt={AuctionDisplayed.author}
                  width={40}
                  height={40}
                />
                <div>
                  <p className={styles.captionTitle}>Creator</p>
                  <p className={styles.caption}>{AuctionDisplayed.author}</p>
                </div>
              </div>
              <div className={styles.content}>
                <SmallRoundedImage
                  src={StopSVGIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  bgColor="#45b26b"
                  divStyles={{ width: '40px', height: '40px' }}
                />
                <div>
                  <p className={styles.captionTitle}>Instant price</p>
                  <p className={styles.caption}>
                    {AuctionDisplayed.instantPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.countContainer}>
            <Bid highestBid={AuctionDisplayed.highestBid} />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant={'primary'} size={'fullWidth'}>
              Place a bid
            </Button>
            <Button variant={'outline'} size={'fullWidth'}>
              View Item
            </Button>
          </div>
          <div className={styles.pageButtons}>
            <Button
              variant={'outline'}
              size={'sm'}
              roundedButton
              onClick={() => handlePreviousAuction(currentPage)}
            >
              <Image
                src={LeftArrowSVGIcon}
                width={20}
                height={20}
                alt={'left arrow'}
              />
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              roundedButton
              onClick={() => handleNextAuction(currentPage)}
            >
              <Image
                src={RightArrowSVGIcon}
                width={20}
                height={20}
                alt={'left arrow'}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PopularAuctions)
