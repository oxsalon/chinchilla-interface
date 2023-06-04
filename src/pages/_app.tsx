import type { AppProps /*, AppContext */ } from 'next/app'
import Web3Provider from '@/components/common/Web3Provider'
import Layout from '@/components/common/Layout'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { Provider } from 'react-redux'
import store from '@/store'
import '@/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  console.log(process.env.NEXT_PUBLIC_MODE, 3333)

  return (
    <Provider store={store}>
      <Web3Provider>
        {
          getLayout(<Component {...pageProps} />)
        }
      </Web3Provider>
    </Provider>
  )
}
