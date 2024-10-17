// Troy Brunette
// SD230 - Web Programming - Project 1 - Currency Converter
// 10/15/2024
// Currency Converter Program - Converts from one currency to another using the exchange rates.

// Constants for the exchange rates and currency symbols
const exchangeRates = {
    base: "USD",
    date: "2022-09-24",
    rates: {
        USD: 1,
        AUD: 1.531863,
        CAD: 1.36029,
        CLP: 950.662057,
        CNY: 7.128404,
        EUR: 1.03203,
        GBP: 0.920938,
        INR: 81.255504,
        JPY: 143.376504,
        RUB: 57.875038,
        ZAR: 17.92624,
    },
};

// Currency symbols for display
const currencySymbols = {
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CLP: "Chilean Peso",
    CNY: "Chinese Yuan",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    RUB: "Russian Ruble",
    USD: "United States Dollar",
    ZAR: "South African Rand",
};

/**
 * Convert a currency code and amount to a formatted string for display
 * Future enhancement: return a formatted object with currency code and amount
 *
 * @param {string} currencyCode
 *
 * @param {number} amount
 *
 * @returns {string}
 */
function currencyToString(currencyCode, amount) {
    // let result = {
    //     currencyCode: currencyCode,
    //     amount: amount.toFixed(2),
    // };
    return amount.toFixed(2) + " " + currencyCode;
}

/**
 * Converts an amount from one currency to another using exchange rates
 *
 * @param {string} initialCurrency  - The currency code to convert from
 *
 * @param {string} targetCurrency - The currency code to convert to
 *
 * @param {number} inputAmount - The amount to convert
 *
 * @returns {object} - The converted amount and currency code
 */
function currencyConverter(initialCurrency, targetCurrency, inputAmount) {
    // Checks for invalid currency codes and invalid input amount.
    let baseAmount, convertedAmount;
    if (!exchangeRates.rates[initialCurrency] || !exchangeRates.rates[targetCurrency]) {
        return "Invalid currency code";
    } else if (isNaN(inputAmount) || inputAmount <= 0) {
        return "Invalid input amount";
    }
    baseAmount = convertToDollars(initialCurrency, inputAmount);
    convertedAmount = convertFromDollars(targetCurrency, baseAmount);
    return currencyToString(targetCurrency, convertedAmount);
}


/**
 *
 * @param {string} currency
 *
 * @param {number} amount
 *
 * @returns {number}
 */
function convertToDollars(currency, amount) {
    // Check if the currency code is valid
    if (!exchangeRates.rates[currency]) {
        return "Invalid currency code";
    }
    // Example: 1000 EUR converted to USD; 1000 / 1.03203 = $968.15
    return amount / exchangeRates.rates[currency];
}

/**
 * Converts an amount from USD to another currency using the exchage rates
 *
 * Example: 100 USD converted to AUD; 100 * 1.531863 = $153.18
 *
 * @param {string} currency The currency to convert to
 *
 * @param {number} amount The amount to convert
 *
 * @returns {number} the converted amount
 */
function convertFromDollars(currency, amount) {
    if (!exchangeRates.rates[currency]) {
        return "Invalid currency code";
    }

    const convertedAmount = amount * exchangeRates.rates[currency];
    return convertedAmount;
}

/**
 * Check if searchString matches any currency codes or currency names
 * 
 * @param {string} searchString 
 * 
 * @returns {object} searchResults - Any matching currency codes or names
 */
function searchForCurrency(searchString) {

    let results = [];

    for (const code in currencySymbols) {
        if (code.toLowerCase().includes(searchString.toLowerCase())) {

            results.push(code);
            
        } else if (currencySymbols[code].toLowerCase().includes(searchString.toLowerCase())) {

            results.push(code);
        }
    }
    return results;
}


/**
 * Get a valid number from the user
 * 
 * The function isNaN() is used to check if the input is a number.
 * Use recursion until a valid number is entered.
 * 
 * @returns {number} num
 */
function getAmount() {
    let num = prompt("Enter a number: ");
    if (isNaN(num) ) {
        alert("Invalid number");
        return getNumber();
    }
    return num;
}

/**
 * Ask user for a currency symbol and check if it is valid
 * Use recursion until a valid symbol is entered
 * @return {string} operator
 */
function getCurrencyCodeFromUser() {
    let selectedCurrency = prompt("Enter a currency symbol: ");
    if (!exchangeRates.rates[selectedCurrency]) {
            alert("Invalid currency code");
            return getCurrencyCodeFromUser();
    }
    return selectedCurrency;
}


/**
 * Main function for the currency converter
 */
function main() {
    let message = "Welcome to the Currency Converter! \
    \nEnter the starting currency, the target currency, and the amount to convert.";
    alert(message);
    while (true) {
        let initialCurrency = getCurrencyCodeFromUser();
        let targetCurrency = getCurrencyCodeFromUser();
        let amount = getAmount();
        let result = currencyConverter(initialCurrency, targetCurrency, amount);
        alert(amount + " " + initialCurrency + " converts to " + result);
    }
}

// Call the main function to start the currency converter
main();

// Test the currency conversion
// console.log(currencyConverter("USD", "EUR", 1000)); // 1032.03 EUR
// console.log(currencyConverter("EUR", "USD", 1032.03)); // 1032.03 EUR
// console.log(currencyConverter("USD", "CAD", 735.14)); // 1000.00 USD
// console.log(currencyConverter("CAD", "USD", 1000)); // 735.14 USD
// console.log(currencyConverter("USD", "USD", 1000)); // 1000.00 USD
// console.log(currencyConverter("USD", "USD", 0)); // Invalid input amount

// Test the currency search function
// console.log(searchForCurrency("Dollar"));
// console.log(searchForCurrency("British"));
// console.log(searchForCurrency("pound"));
// console.log(searchForCurrency("AUD"));
// console.log(searchForCurrency("USD"));
// console.log(searchForCurrency("INR"));
