import type { AppProps /*, AppContext */ } from 'next/app'
import Web3Provider from '@/components/common/Web3Provider'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
// import { Provider } from 'react-redux'
// import store from '@/store'
import '@/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    // <Provider store={store}>
      <Web3Provider>
        {
          getLayout(<Component {...pageProps} />)
        }
      </Web3Provider>
    // </Provider>
  )
}
