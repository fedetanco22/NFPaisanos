import axios from 'axios'

export interface EthPrice {
  eth: string
  usd: string
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const headers = {
  headers: {
    apiKey: API_KEY,
  },
}

export const getEthPrice = async (): Promise<EthPrice> => {
  const response = await axios.get(`${API_URL}/nfpaisanos/eth-price`, headers)
  return response.data
}
