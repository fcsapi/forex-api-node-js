class FCSForex {
    constructor(api_key = '') {
        this.api_key = api_key ? api_key : "api_key";
        this.output = '';  // default is json
        this.output_type = 'JSON';  // Default output type JSON
        this.basic_url = "https://fcsapi.com/api-v3/forex";
        this.api_message = "API Key is empty, please set your API Key.";
    }

    returnError(msg) {
        return { status: false, msg: msg, Error: "Code or input data error" };
    }

    checkApiKey() {
        return this.api_key !== null && this.api_key !== 'api_key';
    }

    checkSymbolId(txt) {
        const cleanedTxt = txt.replace(/,/g, "");
        return /^\d+$/.test(cleanedTxt) ? 'id' : 'symbol';
    }

    async response(url, params) {
        if (!this.checkApiKey()) {
            return this.returnError(this.api_message);
        }

        if (this.api_key) {
            params['access_key'] = this.api_key;
        }
        if (this.output) {
            params['output'] = this.output;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(params)
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            return this.returnError(error.message);
        }
    }

    /**
     * use to get all supporting symbols
     * @param {*} type set to forex or crypto
     * @returns 
     */
    async getSymbolsList(type = 'forex') {
        if (type !== 'forex' && type !== 'crypto') {
            type = 'forex';
        }
        const params = { type: type };
        const link = `${this.basic_url}/list`;
        return await this.response(link, params);
    }

    /**
     * get symbol profile details
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @returns 
     */
    async getProfile(symbol) {
        symbol = Array.isArray(symbol) ? symbol.join(',') : symbol;
        if (!symbol) {
            return this.returnError("Symbol or Id not defined");
        }
        const symbolId = this.checkSymbolId(symbol);
        const params = { [symbolId]: symbol };
        const link = `${this.basic_url}/profile`;
        return await this.response(link, params);
    }

    /** 
     * get convertion of currency
     * @param {*} amount set amunt of currency
     * @param {*} pairOne set currency symbol name e.g: EUR
     * @param {*} pairTwo set currency symbol name e.g: USD
     * @returns 
     */
    async getConverter(amount = '200', pairOne = '', pairTwo = '') {
        if (!pairOne) {
            return this.returnError("Symbol not defined");
        }
        const params = { amount: amount };
        if (pairTwo) {
            params['pair1'] = pairOne;
            params['pair2'] = pairTwo;
        } else {
            params["symbol"] = pairOne;
        }
        const link = `${this.basic_url}/converter`;
        return await this.response(link, params);
    }

    /**
     * Use to get latest price of currency
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @returns 
     */
    async getLatestPrice(symbol) {
        symbol = Array.isArray(symbol) ? symbol.join(',') : symbol;
        if (!symbol) {
            return this.returnError("Symbol or Id not defined");
        }
        const symbolId = this.checkSymbolId(symbol);
        const params = { [symbolId]: symbol };
        const link = `${this.basic_url}/latest`;
        return await this.response(link, params);
    }

    /**
     * get Base Price
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @param {*} type   set to forex or crypto
     * @param {*} time   set to true or false
     * @returns 
     */
    async getBasePrices(symbol, type = "forex", time = false) {
        symbol = Array.isArray(symbol) ? symbol.join(',') : symbol;
        if (!symbol) {
            return this.returnError("Symbol or Id not defined");
        }
        const params = { symbol: symbol, type: type };
        if (time) {
            params['time'] = 1;
        }
        const link = `${this.basic_url}/base_latest`;
        return await this.response(link, params);
    }

    /**
     * get last candle
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @param {*} period 1m, 5m, 15m, 30m,1h, 2h, 4h, 5h, 1d, 1w, month (all except 1m and 2h)
     * @param {*} candle set to active, close and both, default: both
     * @returns 
     */
    async getLastCandle(symbol, period = '1h', candle = 'both') {
        symbol = Array.isArray(symbol) ? symbol.join(',') : symbol;
        // Check if symbol is defined
        if (!symbol) {
            return this.returnError("Symbol or Id not defined");
        }
        const symbolId = this.checkSymbolId(symbol);
        // Set up the parameters for the API call
        const params = { [symbolId]: symbol, period: period, candle: candle };
        const link = `${this.basic_url}/candle`;
        return await this.response(link, params);
    }
    

    /**
     * use to get history of currency
     * @param {*} data set all params data 
     * @returns 
     */
    async getHistory(data) {
        const id = data.id || '';
        const symbol = data.symbol || '';
        const period = data.period || '1h';
        const level = (data.level > 3) ? 1 : Math.min(Math.max(data.level || 1, 1), 3);
        const fromDate = data.from || '';
        const toDate = data.to || '';

        if (!symbol && !id) {
            return this.returnError("Symbol or Id not defined");
        }

        const params = {
            period: period,
            limit: level
        };
        if (id) {
            params['id'] = id;
        }
        if (symbol) {
            params['symbol'] = symbol;
        }
        if (fromDate && toDate) {
            params['from'] = fromDate;
            params['to'] = toDate;
        }

        const link = `${this.basic_url}/history`;
        return await this.response(link, params);
    }

    /**
     * use to get signal 
     * @param {*} symbol pass currency name or id
     * @param {*} period pass period 
     * @param {*} url    pass to retrieve the signal
     * @returns 
     */
    async getSignal(symbol, period, url) {
        if (!symbol) {
            return this.returnError("Symbol or Id not defined");
        }
        const result = !Array.isArray(symbol) && !symbol.includes(',');
        if (!result) {
            return this.returnError("Symbol only accept single id");
        }

        const symbolId = this.checkSymbolId(symbol);
        const params = { [symbolId]: symbol, period: period };
        const link = `${this.basic_url}/${url}`;
        return await this.response(link, params);
    }

    /**
     * get pivot points 
     * @param {*} symbol set currency symbol name e.g: EUR/USD 
     * @param {*} period set period (1m, 5m, 15m, 30m,1h, 2h, 4h, 5h, 1d, 1w, month)
     * @returns
     */
    async getPivotPoints(symbol, period = '1h') {
        return await this.getSignal(symbol, period, "pivot_points");
    }

    /**
     * get moving averages
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @param {*} period set period (1m, 5m, 15m, 30m,1h, 2h, 4h, 5h, 1d, 1w, month)
     * @returns
     * */
    async getMovingAverages(symbol, period = '1h') {
        return await this.getSignal(symbol, period, "ma_avg");
    }

    /**
     * get technical indicators
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @param {*} period set period (1m, 5m, 15m, 30m,1h, 2h, 4h, 5h, 1d, 1w, month)
     * @returns 
     */
    async getTechnicalIndicator(symbol, period = '1h') {
        return await this.getSignal(symbol, period, "indicators");
    }

    /**
     * get economic calendar
     * @param {*} symbol set currency symbol name e.g: EUR/USD
     * @param {*} country set country name e.g: US,JP,GB
     * @param {*} fromDate set from date e.g: 2024-11-13
     * @param {*} toDate set to date e.g: 2024-11-14
     * @param {*} event set event name To get all history of event
     * @returns 
     */
    async getEconomyCalendar(symbol = '', country = '', fromDate = '', toDate = '', event = '') {
        if (!this.checkApiKey()) {
            return this.returnError(this.api_message);
        }

        const params = { access_key: this.api_key };
        if (fromDate) {
            params['from'] = fromDate;
        }
        if (toDate) {
            params['to'] = toDate;
        }
        if (symbol) {
            params['symbol'] = symbol;
        }
        if (country) {
            params['country'] = country;
        }
        if (event) {
            params['event'] = event;
        }

        if (!symbol && !country && !event) {
            return this.returnError("At least a symbol, country, or event must be defined");
        }

        const link = `${this.basic_url}/economy_cal`;
        return await this.response(link, params);
    }

    /**
     * get search query
     * @param {*} search set search value e.g: EURO Dollar
     * @param {*} strict set strict value to 0 AND 1 {0: search if any word exist, 1: search if all words exist}
     * @returns
     * */
    async getSearchQuery(search, strict = 0) {
        if (!search) {
            return this.returnError("Search value is empty");
        }

        const params = { s: search, strict: strict };
        const link = `${this.basic_url}/search`;
        return await this.response(link, params);
    }
}

module.exports = FCSForex;