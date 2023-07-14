import { Inter, Poppins, DM_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const PoppinsFont = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
})

export const DM_SansFont = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
})
