# FCSForex

**Last Updated**: 2024-11-13 (Version 3)

A modern JavaScript library for accessing real-time forex data, technical indicators, and economic events using the FCS API. Effortlessly fetch forex rates, pivot points, moving averages, and more.

## Table of Contents

- [Installation](#installation)
- [API Key](#api-key)
- [Usage](#usage)
- [Response](response)
- [Methods](#methods)
  - [getSymbolsList](#getsymbolslist)
  - [getProfile](#getprofile)
  - [getConverter](#getconverter)
  - [getLatestPrice](#getlatestprice)
  - [getBasePrices](#getbaseprices)
  - [getLastCandle](#getlastcandle)
  - [getHistory](#gethistory)
  - [getPivotPoints](#getpivotpoints)
  - [getMovingAverages](#getmovingaverages)
  - [getTechnicalIndicator](#gettechnicalindicator)
  - [getEconomyCalendar](#geteconomycalendar)
  - [getSearchQuery](#getsearchquery)

- [Resources](#resources)
- [Support](#support)
- [License](#license)

## Installation

Install the package using npm:

```bash
# Clone the repository
git clone https://github.com/fcsapi/forex-api-node-js.git
cd FCS_Forex_JS

# Install dependencies
npm install
```

## API Key

Make sure to set your FCS API key when initializing the class:

```javascript
const forexApi = new FCSForex('your_api_key_here');
```
If you don't have an API key, sign up on the [FCS API website](https://fcsapi.com) to get one.

## Usage

Here's a quick example of how to use the library:

```javascript
const FCSForex = require('fcs-forex');

const forex = new FCSForex('your_api_key_here');

async function fetchForexData() 
{
    const symbolsList = await forexApi.get_latest_price("JPY/USD")
    console.log(symbolsList);
}

fetchForexData();
```

## Response
The default response format is JSON.
```javascript
OUTPUT:
Latest Price : 
{      
  status: true,       
  code: 200,
  msg: 'Successfully',
  response: 
  [
    {
      id: '1075',     
      o: '0.6538000', 
      h: '0.6572007',
      l: '0.6520505',
      c: '0.6567002',
      a: '0.6567002',
      b: '0.6567002',
      sp: '0',
      ch: '+0.0029',
      cp: '+0.44%',
      t: '1731065088',
      s: 'JPY/USD',
      tm: '2024-11-08 11:24:48'
    }
  ],
  info: 
  {
     server_time: '2024-11-08 11:25:25 UTC', credit_count: 1 

  }
}
```


## Methods

### `getSymbolsList`
Fetch a list of available Forex or Crypto symbols.

```javascript
// Usage
symbolsList = await forexApi.getSymbolsList();
symbolsList = await forexApi.getSymbolsList('forex'); // Options: 'forex' or 'crypto'
```

### `getProfile`
Access details for specific currencies using either their symbols or IDs.

```javascript
// Usage
const symbolProfile = await forexApi.getProfile("EUR,USD,JPY");
const symbolProfile = await forexApi.getProfile("1,2,3,4");
const symbolProfile = await forexApi.getProfile('GBP');

  response: 
    {
      short_name: 'GBP',
      name: 'British Pound',
      country: 'United Kingdom',
      code_n: '826',
      subunit: 'Penny',
      website: 'bankofengland.co.uk',
      symbol: '£',
      bank: 'Bank of England',
      banknotes: '£5, £10, £20, £50',
      coins: 'Ten pence, Twenty pence, Two pence, Penny, £1, 50p, £2, 5p',
      icon: 'https://fcsapi.com/assets/images/flags/gbp.svg',
      type: 'forex',
      symbol_2: '&pound;',
    }, {and more}
  
```

### `getConverter`
Convert one currency into another. For instance, you can convert 200 EUR to USD, or use combined currency symbols separated by '/' for the conversion.

```javascript
// Usage
const conversionResult = await forexApi.getConverter(100, 'EUR', 'USD');
const conversionResult = await forexApi.getConverter(200, 'EUR/USD');

Response: 
  {
    price_1x_EUR: '0.92676',
    price_1x_USD: '1.07903',
    total: '215.806'
  }

```

### `getLatestPrice`
Get the latest prices for specific currency pairs by using their symbol or ID. To view the most recent prices for all forex currencies, use "all_forex" as the symbol.

```javascript
// Usage
const latestPrice = await forexApi.getLatestPrice("all_forex");
const latestPrice = await forexApi.getLatestPrice(["EUR/USD", "JPY/USD"]);
const latestPrice = await forexApi.getLatestPrice("40");
const latestPrice = await forexApi.getLatestPrice('GBP/USD');

Response:
  [
    {
      id: '39',
      o: '1.29863',
      h: '1.29907',
      l: '1.29367',
      c: '1.29672',
      a: '1.29672',
      b: '1.29661',
      sp: '1.1',
      ch: '-0.00191',
      cp: '-0.15%',
      t: '1731067135',
      s: 'GBP/USD',
      tm: '2024-11-08 11:58:55'
    }
  ],
```
### `getBasePrices`
Retrieve all quote prices for a given base currency. Optionally, specify the type as either "forex" or "crypto" (default is "forex").

```javascript
// Usage
const basePrices = await forexApi.getBasePrices("USD");
const basePrices = await forexApi.getBasePrices('EUR', 'forex', true);// Options: 'forex' or 'crypto', default 'forex'
const basePrices = await forexApi.getBasePrices('EUR/CHF', 'forex'); 
const basePrices = await forexApi.getBasePrices('EUR', 'crypto');
  response:
   {
    '300': '0.0003196',
    '611': '0.9150343',
    '808': '95058.1295576',      
    '888': '944.9121561',        
    '1337': '107738.8840406',    
    BTC: '1.41E-5',
    ETH: '0.000369',
    XRP: '1.9559902',
    LTC: '0.0150553',
    ETC: '0.0532877',
    IOTA: '8.9845645',
    XMR: '0.0065716',
    DASH: '0.0457206',
    NEO: '0.1051224',
  }, {and more}

```

### `getLastCandle`
To retrieve data, provide the id (any valid FX ID), symbol (any supported FX symbol), and period (any valid time period except 1m and 2h). Include access_key (e.g., XxNTqX6UlRgDaIo3N24M) for authentication and specify candle (with valid values active, close, or both, where the default is both).

```javascript
// Usage
const lastCandle = await forexApi.getLastCandle("all_forex", '5m');// Options: '1h', '4h', '1d', etc.
const lastCandle = await forexApi.getLastCandle('USD/JPY', '1h'); 
const lastCandle = await forexApi.getLastCandle("1,2,3", '1h');
const lastCandle = await forexApi.getLastCandle("EUR/USD", '1h','active');// options: ('active', 'close', 'both') ,default: 'both'

```

### `getHistory`
Fetch historical data using id (FX ID), symbol, and period (e.g., 1m, 1h, 1d). Optionally, include from and to dates for specific ranges, or skip for the latest data. Set level (1, 2, or 3) to get 300, 600, or 900 candles, respectively.

```javascript
// Usage
const historyData = await forexApi.getHistory(
  {
    id: '98',
    period: '1d',
    level: '10',
    from: '2024-01-01',
    to: '2024-10-31'
  });

const historyData = await forexApi.getHistory(
  {
    id: '1',
    period: '1h'
  });

```

### `getPivotPoints`
To retrieve data, use the following accepted parameters: id (any valid ID), symbol (any valid symbol), and period (any supported time frame such as 1m, 1h, 1d, etc.).

```javascript
// Usage
const pivotPoints = await forexApi.getPivotPoints('AUD/USD', '1h');
const pivotPoints = await forexApi.getPivotPoints("EUR/USD", '1d');
const pivotPoints = await forexApi.getPivotPoints('9', '1d');
```

### `getMovingAverages`
To get data, provide the id (valid ID), symbol (valid symbol), and period (supported time frame such as 1m, 1h, 1d, etc.).

```javascript
// Usage
const movingAverages = await forexApi.getMovingAverages('NZD/USD', '1h');
const movingAverages = await forexApi.getMovingAverages("1", '1d');
const movingAverages = await forexApi.getMovingAverages("EUR/USD", '1d');

```

### `getTechnicalIndicator`
Retrieve data by specifying the id (valid ID), symbol (valid symbol), and period (any available time frame like 1m, 1h, 1d, etc.).

```javascript
// Usage
const indicators = await forexApi.getTechnicalIndicator('EUR/GBP', '1h');
const indicators = await forexApi.getTechnicalIndicator("1", '1d');
const indicators = await forexApi.getTechnicalIndicator("EUR/USD", '1d');

```

### `getEconomyCalendar`
To retrieve historical data, use symbol (any valid currency like USD, EUR, JPY), country (e.g., US, JP, GB), from (start date like 2024-11-09), and to (end date like 2024-11-10). To get all event history, specify event (e.g., any valid event name).

```javascript
// Usage
const economyCalendar = await forex.getEconomyCalendar('USD', 'US', '2023-01-01', '2023-01-10');
const economyCalendar = await forexApi.getEconomyCalendar("USD", '2024-01-01', '2024-10-31');
const economyCalendar = await forexApi.getEconomyCalendar("USD,JPY");
```

### `getSearchQuery`
To search, use s (any words, e.g., "EURO Dollar") and set strict to 0 (search if any word exists) or 1 (search if all words exist).

#### Usage

```javascript
// Usage
const searchResult = await forex.getSearchQuery('EUR/USD', 1); // 1 for strict search, 0 for partial
const searchResult = await forexApi.getSearchQuery("BTC Dollar", 0);
```

### Resources
-  [FCS API Documentation](https://fcsapi.com/document/forex-api)
-  [FCS API Dashboard](https://fcsapi.com/dashboard)
-  **PHP Library:** [Available on GitHub](https://github.com/fcsapi/Forex-API-PHP/tree/master?)
- **Python Library:** [Available on GitHub](https://github.com/fcsapi/Forex-API-Python)

### Support
Need help? Feel free to reach out via:

- [FCS API Support](https://fcsapi.com/) 
- [support@fcsapi.com](mailto:support@fcsapi.com)

### License
This project is licensed under the MIT License. See the LICENSE file for more details.
