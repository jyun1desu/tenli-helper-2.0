const formatNumber = (value, withCurrency = true, currency = 'twd') => {
    const currencySymbols = {
        twd: 'NT$',
        myr: 'RM'
    };
    
    const symbol = withCurrency ? (currencySymbols[currency] || '$') : '';
    return `${symbol}${value.toLocaleString()}`;
}

export default formatNumber;