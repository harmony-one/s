import axios from 'axios'

interface CoinGeckoPriceResponse {
  [key: string]: {
    [key: string]: number
  }
}

export class PriceProvider {
  private readonly currency = 'usd'
  private readonly tokensList: string[]
  priceData: CoinGeckoPriceResponse = {}

  constructor(tokensList = ['harmony']) {
    this.tokensList = tokensList
    this.pollPrice()
  }

  async getTokenPrice(token: string) {
    if(this.priceData[token] && this.priceData[this.currency]) {
      return this.priceData[token][this.currency]
    }
    console.warn(`Unavailable price for token ${token}. Using default value = 0.`)
    return 0
  }

  private async pollPrice() {
    try {
      this.priceData = await this.fetchTokensPrice(this.tokensList)
    } catch (e) {
      console.error('Price polling error:', e)
    } finally {
      setTimeout(() => this.pollPrice(), 10 * 60_000)
    }
  }

  private async fetchTokensPrice(tokens: string[], currency = this.currency) {
    const ids = tokens.join(',')
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency}`
    const { data } = await axios.get<CoinGeckoPriceResponse>(url)
    return data
  }
}
