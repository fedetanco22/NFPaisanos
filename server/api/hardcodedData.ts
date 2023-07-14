import axios from 'axios'

import NFPaisanos from '@/types/NFPaisanos'

export interface EthPrice {
  eth: string
  usd: string
}

// export const getEthPrice: EthPrice =
// {
//   eth: '0.098',
//   usd: '1.67',
// }

export const getEthPrice = async (): Promise<EthPrice> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        eth: '0.098',
        usd: '1.67',
      })
    }, 3000) // Simulating a delay of 3 second before resolving the promise
  })
}

export const getPopularAuctions = async (): Promise<NFPaisanos[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 10,
          instantPrice: '4.45 ETH',
          highestBid: '0.010 ETH',
          author: 'Fernando Medina',
          authorAvatar:
            'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/07_xrihyb.png',
          type: 'Art',
          stock: 1,
          likes: 2,
          createdAt: '2022-06-05T11:42:33.000Z',
          endsAt: '2022-08-06T11:42:33.000Z',
          media: {
            id: 4,
            image:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1000/v1657121559/NFPAISANOS/img_125_mrxfbh.png',
            image2x:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1500/v1657121559/NFPAISANOS/img_125_mrxfbh.png',
          },
          attributes: {
            id: 4,
            color: 'black',
            type: 'epic',
          },
          bidUsers: [
            {
              id: 6,
              name: 'Sofia Coolen',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/05_rdi4su.png',
            },
            {
              id: 7,
              name: 'Martin Acosta',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/04_uunxgl.png',
            },
          ],
        },
        {
          id: 11,
          instantPrice: '2.45 ETH',
          highestBid: '0.100 ETH',
          author: 'Martin Acosta',
          authorAvatar:
            'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/06_mjddoi.png',
          type: 'Art',
          stock: 3,
          likes: 10,
          createdAt: '2022-06-06T11:42:33.000Z',
          endsAt: '2022-08-06T11:42:33.000Z',
          media: {
            id: 5,
            image:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1000/v1657121554/NFPAISANOS/img_131_d7wmyk.png',
            image2x:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1500/v1657121559/NFPAISANOS/img_125_mrxfbh.png',
          },
          attributes: {
            id: 5,
            color: 'pink',
            type: 'rare',
          },
          bidUsers: [
            {
              id: 8,
              name: 'Nicolas Sieiro',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/02_nqwu5e.png',
            },
            {
              id: 9,
              name: 'Carla Luna',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/03_ifygi0.png',
            },
          ],
        },
        {
          id: 12,
          instantPrice: '2.15 ETH',
          highestBid: '0.500 ETH',
          author: 'Santiago Lopez',
          authorAvatar:
            'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/04_uunxgl.png',
          type: 'Photography',
          stock: 5,
          likes: 10,
          createdAt: '2022-06-07T11:42:33.000Z',
          endsAt: '2022-08-06T11:42:33.000Z',
          media: {
            id: 6,
            image:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1000/v1657121551/NFPAISANOS/img_126_ae6zew.png',
            image2x:
              'https://res.cloudinary.com/dvmll0ruo/image/upload/c_scale,w_1000/v1657121551/NFPAISANOS/img_126_ae6zew.png',
          },
          attributes: {
            id: 6,
            color: 'orange',
            type: 'uncommon',
          },
          bidUsers: [
            {
              id: 10,
              name: 'Martin Acosta',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/07_xrihyb.png',
            },
            {
              id: 11,
              name: 'Antonella Richieri',
              avatar:
                'https://res.cloudinary.com/dvmll0ruo/image/upload/v1657153929/NFPAISANOS/08_fsbhry.png',
            },
          ],
        },
      ])
    }, 2000) // Simulating a delay of 3 second before resolving the promise
  })
}