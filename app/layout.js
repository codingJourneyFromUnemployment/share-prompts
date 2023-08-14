import '@styles/global.css'
import Nav from '@components/Nav'
import provider from '@components/Provider'

export const metadata = {
  title: 'Share Prompts',
  description: 'Discover and share AI prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}
