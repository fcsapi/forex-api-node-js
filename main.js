
//#############################################
//###### NODE JS SAMPLE CODE, By Using fcs_forex.js 
//#############################################


const FCSForex = require('./fcs_forex.js');

async function main() {
    // Instantiate FCSForex with your API key
    const forexApi = new FCSForex('git_key');  

    try {
         const latestPrice = await forexApi.getLatestPrice('GBP/USD');
         console.log("Latest Price :", latestPrice);
    } catch (error) {
        console.error("Error fetching latest prices:", error);
    }   

    
/*

    //########################
    //### Examples of using other methods for forex and crypto API
    //########################


    //#####################
    //###########Get symbols list
    //#####################
    try {
        const symbolsList = await forexApi.getSymbolsList();
        console.log("Symbols List:", symbolsList);
    } catch (error) {
        console.error("Error fetching symbols list:", error);
    }

    //#####################
    //########### Get profile of a currency
    //#####################
    try {
        const symbolProfile = await forexApi.getProfile("GBP");
        console.log("Currency Profile :", symbolProfile);
        
        const symbolProfileMulti = await forexApi.getProfile("EUR,USD,JPY");
        console.log("Currency Profile:", symbolProfileMulti);

        const symbolProfileId = await forexApi.getProfile("1,2,3,4");
        console.log("Currency Profile:", symbolProfileId);
    } catch (error) {
        console.error("Error fetching currency profiles:", error);
    }

    //#####################
    //########### Convert currency
    //#####################
    try {
        const conversionResult = await forexApi.getConverter(200, 'EUR', 'USD');
        console.log("Conversion Result (200 EUR to USD):", conversionResult);

        const conversionResult1 = await forexApi.getConverter(200, 'EUR/USD');
        console.log("Conversion Result (200 EUR/USD):", conversionResult1);
    } catch (error) {
        console.error("Error converting currency:", error);
    }

    //#####################
    //########### Get Latest Price
    //#####################
    try {
        const latestPriceAllForex = await forexApi.getLatestPrice("all_forex");
        console.log("Latest Price for all_forex:", latestPriceAllForex);

        const latestPrice = await forexApi.getLatestPrice('GBP/USD');
        console.log("Latest Price :", latestPrice);

        const latestPriceMultiple = await forexApi.getLatestPrice(["EUR/USD", "JPY/USD"]);
        console.log("Latest Price for multiple currencies:", latestPriceMultiple);

        const latestPriceById = await forexApi.getLatestPrice("40");
        console.log("Latest Price by ID:", latestPriceById);
    } catch (error) {
        console.error("Error fetching latest prices:", error);
    }

    //#####################
    //########### Get Base Prices
    //#####################
    try {
        const basePricesEUR = await forexApi.getBasePrices("EUR");
        console.log("Base Prices for EUR:", basePricesEUR);

        const basePricesForex = await forexApi.getBasePrices('EUR', 'forex', true);
        console.log("Base Prices for EUR with forex:", basePricesForex);

        const basePricesCrypto = await forexApi.getBasePrices('EUR', 'crypto');
        console.log("Base Prices for EUR and crypto:", basePricesCrypto);
    } catch (error) {
        console.error("Error fetching base prices:", error);
    }

    //#####################
    //########### Get Last Candle
    //#####################
    try {
        const lastCandle5m = await forexApi.getLastCandle("all_forex", '5m');
        console.log("Last Candle for 5m:", lastCandle5m);

        const lastCandle1h = await forexApi.getLastCandle("1", '1h', 'both');
        console.log("Last Candle for 1h:", lastCandle1h);

        const lastCandle1d = await forexApi.getLastCandle("all_forex", '1d');
        console.log("Last Candle for 1d:", lastCandle1d);

        const candleData = await forexApi.getLastCandle("1,2,3", '1h');
        console.log("Candle Data for IDs:", candleData);
    } catch (error) {
        console.error("Error fetching candle data:", error);
    }

    //#####################
    //########### Get Currency History
    //#####################
    try {
        const historyData1 = await forexApi.getHistory({
             id: '98',
            period: '1d',
            level: '10',
            from: '2024-01-01',
            to: '2024-10-31'
        });
        console.log("History Data for different currencies:", historyData1);

        const historyData2 = await forexApi.getHistory({
            id: '1',
            period: '1h'
        });
        console.log("History Data for EURUSD:", historyData2);
    } catch (error) {
        console.error("Error fetching currency history:", error);
    }

    //#####################
    //########### Get Pivot Points
    //#####################

    async function getPivotPoints() {
        let pivotPoints = await forexApi.getPivotPoints('2', '1h');
         console.log('Pivot Points:', pivotPoints);
         console.log('Pivot Points1:', pivotPoints.response.pivot_point);
         console.log('Pivot Points2:', pivotPoints.response.pivot_point.classic);
    }
    getPivotPoints();

    try {
     
        const pivotPointsEURUSD = await forexApi.getPivotPoints("EUR/USD", '1d');
        console.log("Pivot Points for EUR/USD:", pivotPointsEURUSD);

        const pivotPointsUSD = await forexApi.getPivotPoints('9', '1d');
        console.log("Pivot Points for USD:", pivotPointsUSD.response.pivot_point);

    } catch (error) {
        console.error("Error fetching pivot points:", error);
    }

    //#####################
    //########### Get Moving Averages
    //#####################
    try {
        const movingAverages1 = await forexApi.getMovingAverages("1", '1d');
        console.log("Moving Averages for 1:", movingAverages1);

        const movingAveragesEURUSD = await forexApi.getMovingAverages('NZD/USD', '1h');
        console.log("Moving Averages for EUR/USD:", movingAveragesEURUSD);
    } catch (error) {
        console.error("Error fetching moving averages:", error);
    }

    //#####################
    //########### Get Technical Indicators
    //#####################
    try {
        const indicators1 = await forexApi.getTechnicalIndicator("1", '1d');
        console.log("Technical Indicators for 1:", indicators1);

        const indicatorsEURUSD = await forexApi.getTechnicalIndicator("EUR/USD", '1d');
        console.log("Technical Indicators for EUR/USD:", indicatorsEURUSD);
    } catch (error) {
        console.error("Error fetching technical indicators:", error);
    }

    //#####################
    //########### Get Economy Calendar
    //#####################
    try {
        const economyCalendarUSD = await forexApi.getEconomyCalendar("USD", '2024-01-01', '2024-10-31');
        console.log("Economy Calendar for USD:", economyCalendarUSD);

        const economyCalendarUSDJPY = await forexApi.getEconomyCalendar("USD,JPY");
        console.log("Economy Calendar for USD and JPY:", economyCalendarUSDJPY);
    } catch (error) {
        console.error("Error fetching economy calendar:", error);
    }

    //#####################
    //########### Search API
    //#####################
    try {
        const searchResultsStrict0 = await forexApi.getSearchQuery("BTC Dollar", 0);
        console.log("Search Results (strict=0):", searchResultsStrict0);

        const searchResultsStrict1 = await forexApi.getSearchQuery("BTC Dollar", 1);
        console.log("Search Results (strict=1):", searchResultsStrict1);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
*/

}

main().catch(error => console.error("Error in main function:", error));
