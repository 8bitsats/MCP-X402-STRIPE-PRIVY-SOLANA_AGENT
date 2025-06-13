
General API Information:

Base URL: https://public-api.birdeye.so

Authentication: All requests require an API key passed in the X-API-KEY header.

Header: X-API-KEY: YOUR_BIRDEYE_API_KEY

Default Chain: For most endpoints, if targeting Solana, the header x-chain: solana is required. Some endpoints might allow specifying the chain via a query parameter.

Rate Limits: Be mindful of Birdeye's rate limits (not specified here, but always a consideration for public APIs).

Here's the refined list:

Birdeye API Endpoints for Solana

Important Note: Replace YOUR_BIRDEYE_API_KEY with your actual Birdeye API key in all cURL examples.

I. Price Endpoints
1. Get Multiple Token Prices (GET)

Retrieve the latest price information for multiple tokens. Maximum 100 tokens.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/multi_price

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

list_address (string, required): Comma-separated list of token addresses.

Example: So11111111111111111111111111111111111111112,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/multi_price?list_address=So11111111111111111111111111111111111111112,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'

2. Get Multiple Token Prices (POST)

Retrieve the latest price information for multiple tokens. Maximum 100 tokens.

Method: POST

Endpoint: https://public-api.birdeye.so/defi/multi_price

Headers:

accept: application/json

content-type: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Request Body (JSON):

{
  "list_address": "comma_separated_token_addresses"
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Json
IGNORE_WHEN_COPYING_END

list_address (string, required): Comma-separated list of token addresses.

cURL Example:

curl --request POST \
     --url https://public-api.birdeye.so/defi/multi_price \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY' \
     --data '{
  "list_address": "So11111111111111111111111111111111111111112,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
}'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Get Historical Token Price

Retrieve historical price line chart of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/history_price

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

address_type (string, required): Type of address, e.g., token.

type (string, required): Time interval (e.g., 1m, 5m, 15m, 1h, 1d).

time_from (integer, optional): Unix timestamp (seconds) for the start of the history.

time_to (integer, optional): Unix timestamp (seconds) for the end of the history.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/history_price?address={token_address}&address_type=token&type=1m' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
4. Get Historical Price by Unix Timestamp

Retrieve historical price by unix timestamp for a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/historical_price_unix

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

unix_timestamp (integer, required): The specific Unix timestamp (seconds) to get the price for.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/historical_price_unix?address={token_address}&unix_timestamp={timestamp_in_seconds}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
II. OHLCV (Candlestick) Data Endpoints
1. Get OHLCV Data for a Token

Retrieve candlestick data (Open, High, Low, Close, Volume) in OHLCV format for a specified token. Maximum 1000 records.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/ohlcv

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

type (string, required): Candlestick interval (e.g., 1m, 5m, 15m, 1h, 1d).

currency (string, required, defaults to usd): Currency to express price in (e.g., usd, quote).

time_from (integer, optional): Unix timestamp (seconds) for the start of the data.

time_to (integer, optional): Unix timestamp (seconds) for the end of the data.

limit (integer, optional, default: 100, max: 1000): Number of data points.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/ohlcv?address={token_address}&type=1m¤cy=usd&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get OHLCV Data for a Pair

Retrieve candlestick data in OHLCV format for a specified pair. Maximum 1000 records.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/ohlcv/pair

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

pair_address (string, required): The pair contract address.

type (string, required): Candlestick interval (e.g., 1m, 5m, 15m, 1h, 1d).

time_from (integer, optional): Unix timestamp (seconds) for the start of the data.

time_to (integer, optional): Unix timestamp (seconds) for the end of the data.

limit (integer, optional, default: 100, max: 1000): Number of data points.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/ohlcv/pair?pair_address={pair_address}&type=1m&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Get OHLCV Data for a Base/Quote Pair

Retrieve candlestick data in OHLCV format for a specified base-quote pair. Maximum 1000 records.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/ohlcv/base_quote

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

base_address (string, required): The base token contract address.

quote_address (string, required): The quote token contract address.

type (string, required): Candlestick interval (e.g., 1m, 5m, 15m, 1h, 1d).

time_from (integer, optional): Unix timestamp (seconds) for the start of the data.

time_to (integer, optional): Unix timestamp (seconds) for the end of the data.

limit (integer, optional, default: 100, max: 1000): Number of data points.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/ohlcv/base_quote?base_address={base_token_address}"e_address={quote_token_address}&type=1m&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
III. Trade Data Endpoints
Shared Query Parameters for V3 Trade Endpoints:

The following parameters are common to "Trades - All (V3)" and "Trades - Token (V3)":

offset (integer, 0 to 9999, defaults to 0): Pagination offset. Make sure offset + limit <= 10000.

limit (integer, 1 to 100, defaults to 100): Number of records to return.

sort_by (string, defaults to block_unix_time): Field to sort by. Valid values: block_unix_time, block_number.

sort_type (string, defaults to desc): Sort order. Valid values: asc, desc.

tx_type (string, defaults to swap): Transaction type. Valid values: swap, buy, sell, add, remove, all.

source (string, optional): Source of liquidity (AMMs). Only support Solana.

Valid values: raydium, raydium_clamm, raydium_cp, orca, lifinity, fluxbeam, saber, phoenix, bonkswap, pump_dot_fun.

owner (string, optional): The address of the wallet.

pool_id (string, optional): The address of the liquidity pool.

before_time (integer, 1 to 10000000000, optional): Unix timestamp (seconds) to seek trades before.

after_time (integer, 1 to 10000000000, optional): Unix timestamp (seconds) to seek trades after.

before_block_number (integer, 1 to 9007199254740991, optional): Upper bound of block_number (exclusive).

after_block_number (integer, 1 to 9007199254740991, optional): Lower bound of block_number (exclusive).

V3 Trade Endpoint Rules & Constraints:

If time range and block number range are not provided:

If sort_by = block_unix_time, defaults to fetching swaps within the last 7 days.

If sort_by = block_number, defaults to fetching swaps within the last 500,000 blocks.

Only one type of filter is accepted: either block time range OR block number range.

If filtering by block time (after_time, before_time), only sorting by block_unix_time is allowed.

If filtering by block number (after_block_number, before_block_number), only sorting by block_number is allowed.

Constraints:

Block time range: cannot exceed 30 days.

Block number range: cannot exceed 500,000 blocks.

If only after_time is provided, it must be within the last 30 days.

If only after_block_number is provided, it must be within the most recent 500,000 blocks.

1. Get Trades for a Token (Legacy)

Retrieve a list of trades of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/txs/token

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

tx_type (string, optional, default: swap): Transaction type (e.g., swap, buy, sell).

sort_type (string, optional, default: desc): Sort order (asc, desc).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/txs/token?address={token_address}&offset=0&limit=50&tx_type=swap&sort_type=desc' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Trades for a Pair (Legacy)

Retrieve a list of trades of a specified pair.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/txs/pair

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The pair contract address.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

tx_type (string, optional, default: swap): Transaction type (e.g., swap, buy, sell).

sort_type (string, optional, default: desc): Sort order (asc, desc).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/txs/pair?address={pair_address}&offset=0&limit=50&tx_type=swap&sort_type=desc' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Get Trades for a Token Seek By Time (Legacy)

Retrieve a list of trades of a specified token with time bound option.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/txs/token/seek_by_time

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

time_from (integer, required): Unix timestamp (seconds) for start time.

time_to (integer, required): Unix timestamp (seconds) for end time.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

tx_type (string, optional, default: swap): Transaction type.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/txs/token/seek_by_time?address={token_address}&time_from={timestamp_from}&time_to={timestamp_to}&offset=0&limit=50&tx_type=swap' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
4. Get Trades for a Pair Seek By Time (Legacy)

Retrieve a list of trades of a specified pair with time bound option.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/txs/pair/seek_by_time

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The pair contract address.

time_from (integer, required): Unix timestamp (seconds) for start time.

time_to (integer, required): Unix timestamp (seconds) for end time.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

tx_type (string, optional, default: swap): Transaction type.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/txs/pair/seek_by_time?address={pair_address}&time_from={timestamp_from}&time_to={timestamp_to}&offset=0&limit=50&tx_type=swap' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
5. Get All Trades (V3)

Retrieve a list of trades with various filters. See "Shared Query Parameters for V3 Trade Endpoints" and "V3 Trade Endpoint Rules & Constraints" above.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/txs

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters: (See shared list above. address is not applicable here as it's for "all" trades).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/txs?offset=0&limit=100&sort_by=block_unix_time&sort_type=desc&tx_type=swap' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
6. Get Trades for a Token (V3)

Retrieve a list of trades with various filters for a specified token. See "Shared Query Parameters for V3 Trade Endpoints" and "V3 Trade Endpoint Rules & Constraints" above.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/txs

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The address of the token contract.

(Plus all parameters from "Shared Query Parameters for V3 Trade Endpoints" above)

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/txs?address={token_address}&offset=0&limit=100&sort_by=block_unix_time&sort_type=desc&tx_type=swap' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
7. Get All Time Trades for a Single Token

Get all time trades or follow duration transactions for one token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/all-time/trades/single

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

time_frame (string, required): Duration (e.g., 24h, 7d, 30d, all).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/all-time/trades/single?address={token_address}&time_frame=24h' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
8. Get All Time Trades for Multiple Tokens

Get all time trades or follow duration transactions for multiple tokens. Max 20 tokens.

Method: POST

Endpoint: https://public-api.birdeye.so/defi/v3/all-time/trades/multiple

Headers:

accept: application/json

content-type: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

time_frame (string, required): Duration (e.g., 24h, 7d, 30d, all).

Request Body (JSON):

{
  "list_address": "comma_separated_token_addresses"
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Json
IGNORE_WHEN_COPYING_END

list_address (string, required): Comma-separated list of token addresses.

cURL Example:

curl --request POST \
     --url 'https://public-api.birdeye.so/defi/v3/all-time/trades/multiple?time_frame=24h' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY' \
     --data '{
       "list_address": "So11111111111111111111111111111111111111112,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
     }'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
9. Get Latest Block Number for Trades

Retrieve the latest block number of trades on a chain.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/txs/latest-block

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

cURL Example:

curl --request GET \
     --url https://public-api.birdeye.so/defi/v3/txs/latest-block \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
IV. Price & Volume Endpoints
1. Get Price & Volume for a Single Token

Retrieve price and volume updates of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/price_volume/single

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

type (string, required): Time frame for volume (e.g., 1h, 6h, 24h).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/price_volume/single?address={token_address}&type=24h' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Price & Volume for Multiple Tokens

Retrieve price and volume updates of multiple tokens. Maximum 50 tokens.

Method: POST

Endpoint: https://public-api.birdeye.so/defi/price_volume/multi

Headers:

accept: application/json

content-type: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Request Body (JSON):

{
  "list_address": "comma_separated_token_addresses",
  "type": "time_frame"
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Json
IGNORE_WHEN_COPYING_END

list_address (string, required): Comma-separated list of token addresses.

type (string, required): Time frame for volume (e.g., 1h, 6h, 24h).

cURL Example:

curl --request POST \
     --url https://public-api.birdeye.so/defi/price_volume/multi \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY' \
     --data '{
       "list_address": "So11111111111111111111111111111111111111112,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
       "type": "24h"
     }'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
V. Pair Information Endpoints
1. Get Pair Overview (Single)

Retrieve stats of a specified pair.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/pair/overview/single

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

pair_address (string, required): The pair contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/pair/overview/single?pair_address={pair_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Pair Overview (Multiple)

Retrieve stats of multiple pairs. Maximum number of addresses not specified (original text "Maximum " is incomplete). Assume a reasonable limit like 50-100.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/pair/overview/multiple

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

list_address (string, required): Comma-separated list of pair addresses.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/pair/overview/multiple?list_address={pair_address_1},{pair_address_2}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
VI. Token Information Endpoints
1. Get Token List (V1)

Retrieve a list of tokens on a specified chain.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/tokenlist

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

sort_by (string, optional, default: v24hUSD): Field to sort by (e.g., v24hUSD, mc).

sort_type (string, optional, default: desc): Sort order (asc, desc).

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

min_liquidity (integer, optional, default: 100): Minimum liquidity in USD.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=0&limit=50&min_liquidity=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Token List (V3)

Retrieve a list of tokens on a specified chain.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/list

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

sort_by (string, optional, default: liquidity): Field to sort by (e.g., liquidity, volume_24h_usd).

sort_type (string, optional, default: desc): Sort order (asc, desc).

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 100): Number of records.

min_liquidity_usd (integer, optional): Minimum liquidity in USD.

min_volume_24h_usd (integer, optional): Minimum 24h volume in USD.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/list?sort_by=liquidity&sort_type=desc&offset=0&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Get Token List (V3 Scroll)

Retrieve up to 5,000 tokens per batch. For the first request, apply any filter parameters except scroll_id. For subsequent requests, provide only the scroll_id parameter using the next_scroll_id value returned previously. Limited to 1 scroll_id per account per 30 seconds.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/list/scroll

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters (Initial Request):

limit (integer, optional, default: 5000, max: 5000): Number of records per batch.

sort_by (string, optional, default: liquidity): Field to sort by.

sort_type (string, optional, default: desc): Sort order.

(Other V3 list filters as needed, e.g., min_liquidity_usd)

Query Parameters (Subsequent Requests):

scroll_id (string, required): The next_scroll_id from the previous response.

cURL Example (Initial):

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/list/scroll?limit=5000&sort_by=liquidity&sort_type=desc' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

cURL Example (Subsequent):

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/list/scroll?scroll_id={next_scroll_id_value}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
4. Get Token Overview

Retrieve stats of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/token_overview

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/token_overview?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
5. Get Token Metadata (Single)

Retrieve metadata of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/meta-data/single

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/meta-data/single?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
6. Get Token Metadata (Multiple)

Retrieve metadata of multiple tokens. Maximum 50 addresses.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/meta-data/multiple

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

list_address (string, required): Comma-separated list of token addresses.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/meta-data/multiple?list_address={token_address_1},{token_address_2}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
7. Get Token Market Data (Single)

Retrieve market data of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/market-data

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/market-data?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
8. Get Token Market Data (Multiple)

Retrieve market data of multiple tokens. Maximum 20 addresses.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/market-data/multiple

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

list_address (string, required): Comma-separated list of token addresses.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/market-data/multiple?list_address={token_address_1},{token_address_2}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
9. Get Token Trade Data (Single)

Retrieve trade data of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/trade-data/single

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/trade-data/single?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
10. Get Token Trade Data (Multiple)

Retrieve trade data of multiple tokens. Maximum 20 addresses.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/trade-data/multiple

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

list_address (string, required): Comma-separated list of token addresses.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/trade-data/multiple?list_address={token_address_1},{token_address_2}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
11. Get Token Holders

Retrieve a list of top holders of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/holder

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 100): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/holder?address={token_address}&offset=0&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
12. Get New Token Listings

Retrieve a list of newly listed tokens.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v2/tokens/new_listing

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

limit (integer, optional, default: 10): Number of records.

meme_platform_enabled (boolean, optional, default: false): Filter by meme platform status.

sort_by (string, optional): e.g., list_time.

sort_type (string, optional): asc or desc.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v2/tokens/new_listing?limit=10&meme_platform_enabled=false&sort_by=list_time&sort_type=desc' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
13. Get Top Traders for a Token

Retrieve a list of top traders of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v2/tokens/top_traders

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

time_frame (string, optional, default: 24h): Time frame (e.g., 24h, 7d).

sort_type (string, optional, default: desc): Sort order.

sort_by (string, optional, default: volume): Field to sort by (e.g., volume, pnl).

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 10): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v2/tokens/top_traders?address={token_address}&time_frame=24h&sort_type=desc&sort_by=volume&offset=0&limit=10' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
14. Get All Markets for a Token

Retrieve a list of markets for a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v2/markets

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

time_frame (string, optional, default: 24h): Time frame.

sort_type (string, optional, default: desc): Sort order.

sort_by (string, optional, default: liquidity): Field to sort by (e.g., liquidity, volume).

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 10): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v2/markets?address={token_address}&time_frame=24h&sort_type=desc&sort_by=liquidity&offset=0&limit=10' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
15. Get Trending Token List

Retrieve a dynamic and up-to-date list of trending tokens based on specified sorting criteria.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/token_trending

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

sort_by (string, optional, default: rank): Field to sort by (e.g., rank, views).

sort_type (string, optional, default: asc): Sort order.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 20): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=20' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
16. Get Token Security Information

Retrieve security information of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/token_security

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/token_security?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
17. Get Token Creation Information

Retrieve the creation transaction information of a specified token.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/token_creation_info

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/token_creation_info?address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
18. Get Token Mint/Burn Transactions

Retrieve the mint/burn transaction list of a specified token. Only supports Solana.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/token/mint-burn-txs

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The token contract address.

sort_by (string, optional, default: block_time): Field to sort by (e.g., block_time).

sort_type (string, optional, default: desc): Sort order.

type (string, optional, default: all): Transaction type (mint, burn, all).

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 100): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/token/mint-burn-txs?address={token_address}&sort_by=block_time&sort_type=desc&type=all&offset=0&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
VII. Trader Specific Endpoints
1. Get Trader Gainers/Losers

Retrieve detailed information about top gainers/losers.

Method: GET

Endpoint: https://public-api.birdeye.so/trader/gainers-losers

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

type (string, required): Time frame (e.g., 1D, 1W, 1M).

sort_by (string, optional, default: PnL): Field to sort by (e.g., PnL, winRate).

sort_type (string, optional, default: desc): Sort order.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 10): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/trader/gainers-losers?type=1W&sort_by=PnL&sort_type=desc&offset=0&limit=10' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Trader Trades Seek By Time

Retrieve a list of trades of a trader with time bound option.

Method: GET

Endpoint: https://public-api.birdeye.so/trader/txs/seek_by_time

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

address (string, required): The trader's wallet address.

time_from (integer, required): Unix timestamp (seconds) for start time.

time_to (integer, required): Unix timestamp (seconds) for end time.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 100): Number of records.

token_address (string, optional): Filter trades by a specific token address.

tx_type (string, optional): Filter by transaction type (e.g., buy, sell, swap).

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/trader/txs/seek_by_time?address={wallet_address}&time_from={timestamp_from}&time_to={timestamp_to}&offset=0&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
VIII. Wallet Endpoints (Beta)
1. Get Wallet Token Portfolio (Beta)

Retrieve the portfolio of a wallet.

Method: GET

Endpoint: https://public-api.birdeye.so/v1/wallet/token_list

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

owner_address (string, required): The wallet owner's address.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 50): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/v1/wallet/token_list?owner_address={wallet_address}&limit=50' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Wallet Token Balance (Beta)

Retrieve the balance of a specific token in a wallet.

Method: GET

Endpoint: https://public-api.birdeye.so/v1/wallet/token_balance

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

owner_address (string, required): The wallet owner's address.

token_address (string, required): The token contract address.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/v1/wallet/token_balance?owner_address={wallet_address}&token_address={token_address}' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
3. Get Wallet Transaction History (Beta)

Retrieve the transaction history of a wallet.

Method: GET

Endpoint: https://public-api.birdeye.so/v1/wallet/tx_list

Headers:

accept: application/json

x-chain: solana

X-API-KEY: YOUR_BIRDEYE_API_KEY

Query Parameters:

owner_address (string, required): The wallet owner's address.

limit (integer, optional, default: 100): Number of records.

offset (integer, optional, default: 0): Pagination offset.

tx_type (string, optional): Transaction type (e.g., SWAP, TRANSFER).

start_time (integer, optional): Unix timestamp (seconds) for start time.

end_time (integer, optional): Unix timestamp (seconds) for end time.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/v1/wallet/tx_list?owner_address={wallet_address}&limit=100' \
     --header 'accept: application/json' \
     --header 'x-chain: solana' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
IX. Search Endpoints
1. Search Token and Market Data

Search for tokens and market data by providing a name, symbol, token address, or market address.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/v3/search

Headers:

accept: application/json

X-API-KEY: YOUR_BIRDEYE_API_KEY

(Note: x-chain header is not used here; chain is specified via query param)

Query Parameters:

q (string, required): The search query (name, symbol, token address, market address).

chain (string, optional, default: all): Chain to search on (e.g., solana, ethereum, all).

target (string, optional, default: all): Type of entity to search for (token, market, all).

search_mode (string, optional, default: exact): Search mode (exact, contains).

search_by (string, optional, default: symbol): Field to search by (symbol, name, address).

sort_by (string, optional, default: volume_24h_usd): Field to sort results by.

sort_type (string, optional, default: desc): Sort order.

offset (integer, optional, default: 0): Pagination offset.

limit (integer, optional, default: 20): Number of records.

cURL Example:

curl --request GET \
     --url 'https://public-api.birdeye.so/defi/v3/search?q=SOL&chain=solana&target=token&search_mode=exact&search_by=symbol&sort_by=volume_24h_usd&sort_type=desc&offset=0&limit=20' \
     --header 'accept: application/json' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
X. Network Information Endpoints
1. Get Supported DeFi Networks

Retrieve a list of all supported DeFi networks.

Method: GET

Endpoint: https://public-api.birdeye.so/defi/networks

Headers:

accept: application/json

X-API-KEY: YOUR_BIRDEYE_API_KEY

(Note: x-chain header is not applicable here)

cURL Example:

curl --request GET \
     --url https://public-api.birdeye.so/defi/networks \
     --header 'accept: application/json' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END
2. Get Wallet Supported Networks

Retrieve a list of all wallet supported networks.

Method: GET

Endpoint: https://public-api.birdeye.so/v1/wallet/list_supported_chain

Headers:

accept: application/json

X-API-KEY: YOUR_BIRDEYE_API_KEY

(Note: x-chain header is not applicable here)

cURL Example:

curl --request GET \
     --url https://public-api.birdeye.so/v1/wallet/list_supported_chain \
     --header 'accept: application/json' \
     --header 'X-API-KEY: YOUR_BIRDEYE_API_KEY'
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

This comprehensive list should be much easier for an LLM (and developers) to parse and use. Each endpoint has its method, URL, required headers (including the API key placeholder and x-chain where appropriate), clearly defined query parameters or request body, and a cURL example with placeholders for dynamic values like addresses or timestamps.