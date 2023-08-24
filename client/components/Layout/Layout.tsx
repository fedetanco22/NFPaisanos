import React, { ReactNode } from 'react'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import SEO from '../SEO/SEO'

interface LayoutProps {
  children: ReactNode
  title: string
  description: string
  keywords: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <div>
      <SEO title={title} description={description} keywords={keywords} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
