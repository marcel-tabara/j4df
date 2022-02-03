import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { MdxComponentsProvider } from '../context/MdxComponents'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <MdxComponentsProvider>
        <Component {...pageProps} />
      </MdxComponentsProvider>
    </ThemeProvider>
  )
}

export default MyApp
