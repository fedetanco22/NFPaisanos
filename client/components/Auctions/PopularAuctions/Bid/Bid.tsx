import React, { useEffect, useState } from 'react'

import styles from './Bid.module.css'
import Countdown from './Countdown'

import { DM_SansFont } from '@/client/utils/fonts'
import { EthPrice, getEthPrice } from '@/server/api/services'

interface BidProps {
  highestBid: string
}

const Bid: React.FC<BidProps> = ({ highestBid }): JSX.Element => {
  const [data, setData] = useState({} as EthPrice)

  useEffect(() => {
    getEthPrice().then((res): void => {
      setData(res)
    })
  }, [])

  const targetTime = new Date(Date.now() + 1000 * 60 * 60 * 19).toString() // Formatted target time string representing 19 hours from now

  return (
    <>
      <div className={styles.bid}>
        <div>
          <h4 className={styles.bidTitle}>Current bid</h4>
          <p className={`${styles.bidPrice} ${DM_SansFont.className}`}>
            {highestBid}
          </p>
          <p className={styles.bidValue}>$ {data.usd}</p>
        </div>
        <div className={styles.countdown}>
          <h4>Auction ending in</h4>
          <Countdown targetTime={targetTime} />
        </div>
      </div>
    </>
  )
}

export default Bid
