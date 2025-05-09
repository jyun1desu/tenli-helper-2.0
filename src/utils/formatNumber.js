const formatNumber = (value, withCurrency = true) => {
    return `${withCurrency ? '$' : ''}${value.toLocaleString()}`;
}

export default formatNumber;