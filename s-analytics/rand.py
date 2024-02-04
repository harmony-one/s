import requests
import datetime

def get_average_gas_price(network, days_back=7):
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=days_back)

    if network == "near":
        url = f"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4&address=0x0000000000000000000000000000000000000000&tag=latest&apikey={api_keys['near']}"
    elif network == "polygon":
        url = f"https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey={api_keys['polygon']}"
    elif network == "harmony":
        url = f"https://explorer.harmony.one/api/v1/transactions?start={start_date}&end={today}&order=desc"
    else:
        raise ValueError(f"Invalid network: {network}")

    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for non-200 status codes

    # Extract gas price data based on the network's API response structure
    if network == "near":
        gas_price = response.json()["result"]  # Assuming Etherscan provides the average gas price directly
    elif network == "polygon":
        gas_price = response.json()["result"]["SafeGasPrice"]  # Assuming PolygonScan provides SafeGasPrice
    elif network == "harmony":
        gas_prices = [tx["gasPrice"] for tx in response.json()["result"]]  # Assuming Harmony Explorer provides gasPrice in each transaction
        gas_price = sum(gas_prices) / len(gas_prices)  # Calculate average

    return gas_price

# Get average gas prices for each network
near_average_gas_price = get_average_gas_price("near")
polygon_average_gas_price = get_average_gas_price("polygon")
harmony_average_gas_price = get_average_gas_price("harmony")

print("Near Average Gas Price:", near_average_gas_price, "gNEAR")
print("Polygon Average Gas Price:", polygon_average_gas_price, "gwei")
print("Harmony Average Gas Price:", harmony_average_gas_price, "gONE")
