import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'

import styles from './PriceRangeSlider.module.css'

interface PriceSliderProps {
  priceRange: number
  setPriceRange: React.Dispatch<React.SetStateAction<number>>
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  priceRange,
  setPriceRange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    if (typeof newValue === 'number') {
      setPriceRange(newValue)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.priceRangeFilter}>
        <div>
          <h4>Price Range</h4>
          <Box sx={{ width: '100%' }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Slider
                aria-label="Volume"
                value={priceRange}
                max={10}
                onChange={handleChange}
                valueLabelDisplay="on"
                className={styles.slider}
                valueLabelFormat={x => `${x} ETH`}
                slotProps={{
                  valueLabel: { className: styles.valueLabel },
                  thumb: { className: styles.thumb },
                }}
              />
            </Stack>
          </Box>

          <div className={styles.ranges}>
            <span>0.000 ETH</span>
            <span>10 ETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceSlider
