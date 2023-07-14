import React from 'react'
import { motion, useTime, useTransform } from "framer-motion";
import Image from 'next/image';

import styles from './Spinner.module.css'

import LogoSVG from '@/public/icons/letter-logo.svg';

const Spinner = (): JSX.Element => {
  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <div className={styles.spinner}>
      <motion.div style={{ rotate }} className={styles.logo}>
        <Image
          src={LogoSVG}
          alt="Picture of the author"
          width={50}
          height={50}
          loading="lazy"
        />
      </motion.div>
    </div >
  )
}

export default Spinner
