import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'

import Spinner from '../../Spinner/Spinner';

import styles from './PopularAuctions.module.css'
import ImagePanel from './ImagePanel/ImagePanel';

import { getPopularAuctions } from '@/server/api/hardcodedData'
import NFPaisanos from '@/types/NFPaisanos'


function PopularAuctions(): JSX.Element {
  const [popularAuctions, setPopularAuctions] = useState([] as NFPaisanos[]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (): Promise<void> => {
    const data = await getPopularAuctions();
    setPopularAuctions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const AuctionDisplayed = popularAuctions[page]


  if (loading) return (<Spinner />)

  return (
    <div className={styles.grid}>
      <div className={styles.panels}>
        <ImagePanel>
          <Image
            src={AuctionDisplayed.media.image}
            alt={`popular auction ${AuctionDisplayed.id}`}
            width={600}
            height={800}
            priority={true}
            layout="responsive"
            quality={100}
            style={{ width: '100%', height: 'auto' }}

          />
        </ImagePanel>
      </div>
      <div className={`${styles.panels} ${styles.rightPanel}`}>
        <div>
          <h1 className=""> the creator network® </h1>
        </div>
      </div>
    </div >
  )
}

export default memo(PopularAuctions)
