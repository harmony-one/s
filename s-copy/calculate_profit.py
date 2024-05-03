import requests
import json

# Test data
def load_transactions(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data['data']['swaps']

transactions = load_transactions('input.json')

def get_token_prices(tokens):
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        'ids': ','.join(tokens),
        'vs_currencies': 'usd'
    }
    response = requests.get(url, params=params)
    return response.json()

tokens = set(txn['tokenIn']['symbol'] for txn in transactions) | set(txn['tokenOut']['symbol'] for txn in transactions)

current_prices = get_token_prices(tokens)

wallet_profits = {}

for txn in transactions:
    token_in = txn['tokenIn']['symbol']
    token_out = txn['tokenOut']['symbol']
    amount_in_usd = float(txn['amountInUSD'])
    amount_out_usd = float(txn['amountOutUSD'])
    wallet_id = txn['account']['id']
    
    if wallet_id not in wallet_profits:
        wallet_profits[wallet_id] = 0.0

    wallet_profits[wallet_id] += (amount_out_usd - amount_in_usd)
    
    current_price_in = current_prices.get(token_in, {}).get('usd', 0)
    unrealized_in = current_price_in * float(txn['amountIn'])
    
    current_price_out = current_prices.get(token_out, {}).get('usd', 0)
    unrealized_out = current_price_out * float(txn['amountOut'])

    wallet_profits[wallet_id] += (unrealized_out - unrealized_in)

top_wallets = sorted(wallet_profits.items(), key=lambda x: x[1], reverse=True)[:10]


for wallet, profit in top_wallets:
    print(f"Wallet {wallet} has a profit of ${profit:.2f}")
