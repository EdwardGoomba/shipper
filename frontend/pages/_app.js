import App from 'next/app'
import Page from '../components/Page'

class Shipper extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Page>
        <Component {...pageProps} />
      </Page>
    )
  }
}

export default Shipper
