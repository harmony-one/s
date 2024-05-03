import requests
import json
from datetime import datetime, timedelta

query = '''
{
  swaps(
    orderBy: timestamp,
    orderDirection: desc,
    where: { timestamp_gt: %s }
  ) {
    timestamp
    amountInUSD
    amountOutUSD
    amountIn
    amountOut
    hash
    pool {
      id
    }
    tokenIn {
      symbol
    }
    tokenOut {
      symbol
    }
    account {
      id
    }
  }
}
'''

timestamp_100_days_ago = int((datetime.now() - timedelta(days=100)).timestamp())

url = 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-arbitrum'

response = requests.post(url, json={'query': query % timestamp_100_days_ago})
data = response.json()

with open('input.json', 'w') as file:
    json.dump(data, file, indent=2)

print("Data written to input.json")
