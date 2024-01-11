import requests
from datetime import datetime
from dateutil.relativedelta import relativedelta

bridge_url = 'https://hmy-lz-api-token.fly.dev'
stake_api_url = 'https://api.stake.hmny.io'

def count_occurrences(strings):
    count_dict = {}

    for string in strings:
        if string in count_dict:
            count_dict[string] += 1
        else:
            count_dict[string] = 1

    sorted_count_dict = dict(sorted(count_dict.items(), key=lambda item: item[1], reverse=True))

    return sorted_count_dict

def count_pairs(array):
    pair_counts = {}

    for pair in array:
        if pair in pair_counts:
            pair_counts[pair] += 1
        else:
            pair_counts[pair] = 1

    return dict(sorted(pair_counts.items(), key=lambda item: item[1], reverse=True))

def get_operations(page=0, size=10000):
    response = requests.get(f'{bridge_url}/operations-full?size={size}&page={page}')
    return response.json()['content']

def get_tokens_list():
    response = requests.get(f'{bridge_url}/tokens?size=1000')
    return response.json()['content']

def get_staking_stats():
    response = requests.get(f'{stake_api_url}/networks/harmony/network_info_lite')
    return response.json()

def get_percent_diff(v1, v2):
    if v1 == 0:
        return 0
    return ((v2 - v1) / abs(v1)) * 100

def abbreviate_number(value):
    if abs(value) < 100:
        decimal_part = round(value)
        if decimal_part == value:
            return str(value)
        decimal_part_str = str(decimal_part)
        decimal_places = 3 - len(decimal_part_str)
        return f"{value:.{decimal_places}f}"
    else:
        value = round(value)

    suffixes = ['k', 'm', 'b', 't', 'q', 'q']
    length = len(str(abs(value)))
    index = (length - 3) // 3

    if abs(value) < 100 or length % 3 == 0:
        fractional_digits = 0
    elif length % 3 == 1:
        fractional_digits = 2
    elif length % 3 == 2:
        fractional_digits = 1

    if length < 4:
        return f"{value:.{fractional_digits}f}"

    value /= 10 ** (3 * index)
    return f"{value:.{fractional_digits}f}".rstrip('0').rstrip('.') + suffixes[index - 1]

def get_bridge_stats():
    days_count = 7
    week_timestamp = int((datetime.now() - relativedelta(days=days_count-1)).timestamp())
    tokens = get_tokens_list()
    days_amount_map = {}

    waiting_ctr = 0
    skip_ctr = 0
    in_progress_ctr = 0
    error_ctr = 0
    success_ctr = 0
    total_ctr = 0

    networks = []

    eth_to_one_pairs = [] # (erc20, hrc20)
    one_to_eth_pairs = [] # (hrc20, erc20)

    gas = 0
    

    for i in range(100):
        items = get_operations(i)
        for item in items:
            item_timestamp = int(item['timestamp'])
            item_amount = float(item['amount'])

            if item['status'] == 'success' and item_timestamp >= week_timestamp and item_amount > 0:
                if item['type'] == 'eth_to_one' and item['erc20Address'] and item['hrc20Address']:
                    eth_to_one_pairs.append((item['network'], item['erc20Address'],item['hrc20Address']))
                elif item['type'] == 'one_to_eth' and item['erc20Address'] and item['hrc20Address']:
                    one_to_eth_pairs.append((item['network'], item['hrc20Address'],item['erc20Address']))

            if item['status'] == 'success' and item['type'] == 'one_to_eth':
                for i in item['actions']:
                    try:
                        gas += int(i['payload']['gas'])
                    except:
                        continue


            if item_timestamp >= week_timestamp and item_amount > 0:
                total_ctr += 1

            if item_timestamp >= week_timestamp and item_amount > 0:
                networks.append(item['network'])

            if item['status'] == 'waiting' and item_timestamp >= week_timestamp and item_amount > 0:
                waiting_ctr += 1
            elif item['status'] == 'skip' and item_timestamp >= week_timestamp and item_amount > 0:
                skip_ctr += 1
            elif item['status'] == 'in_progress' and item_timestamp >= week_timestamp and item_amount > 0:
                in_progress_ctr += 1
            elif item['status'] == 'error' and item_timestamp >= week_timestamp and item_amount > 0:
                error_ctr += 1
            elif item['status'] == 'success' and item_timestamp >= week_timestamp and item_amount > 0:
                success_ctr += 1
                is_income = 'to_one' in item['type']
                token = next((t for t in tokens if t['erc20Address'].lower() == item['erc20Address'].lower() or t['hrc20Address'].lower() == item['hrc20Address'].lower()), None)

                if not token:
                    print(f"Cannot find bridged token: erc20Address: {item['erc20Address']}, hrc20Address: {item['hrc20Address']}, timestamp: {item_timestamp}")
                    continue

                usd_price = float(token['usdPrice'])
                amount_usd = (1 if is_income else -1) * round(item_amount * usd_price)
                date = datetime.fromtimestamp(item_timestamp).strftime('%Y%m%d')
                days_amount_map[date] = days_amount_map.get(date, 0) + amount_usd

        last_element = items[-1] if items else None
        if last_element and int(last_element['timestamp']) < week_timestamp:
            break

    print(count_occurrences(networks))
    print("waiting", waiting_ctr)
    print("in progress", in_progress_ctr)
    print("skip", skip_ctr)
    print("error", error_ctr)
    print("success", success_ctr)
    print('total', total_ctr)

    print("\nTop Pairs one_to_eth (org, dest)")
    for i, (key, value) in enumerate(count_pairs(one_to_eth_pairs).items()):
        if i < 3:
            print(f"{key}: {value}")
        else:
            break
    print("\nTop Pairs eth_to_one (org, dest)")
    for i, (key, value) in enumerate(count_pairs(eth_to_one_pairs).items()):
        if i < 3:
            print(f"{key}: {value}")
        else:
            break
    
    print(f"\nGas (one_to_eth in ONE): {gas}")

    days_amount_list = sorted(days_amount_map.values(), reverse=True)
    value = days_amount_list[0]
    value_total = sum(days_amount_list)
    average = value_total / days_count
    change = get_percent_diff(average, value)
    if change > 0:
        change = f"+{change:.1f}"
    else:
        change = f"{change:.1f}"

    return {
        'value': abbreviate_number(value),
        'change': f"{change}%"
    }

print(get_bridge_stats())