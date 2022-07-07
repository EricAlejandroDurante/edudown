import Head from 'next/head'
import Navbar from 'components/navbar'

export default function MainLayout({ children }) {
  return (
    <div>
      <Head>
        <title>Edudown</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}
