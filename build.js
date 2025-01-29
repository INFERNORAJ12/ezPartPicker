let currentCurrency = 'Rs';
let selectedBudget = 25000;

const exchangeRates = {
    Rs: 1,
    $: 0.012,
    eu: 0.011,
};

function updateValue(value) {
    if (!value) return;
    const convertedValue = (value * exchangeRates[currentCurrency]).toFixed(2);
    document.getElementById('selectedValue').innerText = `Selected Amount: ${currentCurrency} ${convertedValue}`;
    selectedBudget = parseInt(value, 10);
}

function applyCustomAmount() {
    const customAmount = parseInt(document.getElementById('customAmount').value, 10);
    const messageElement = document.getElementById('customAmountMessage');

    if (!isNaN(customAmount) && customAmount > 0 && customAmount <= 500000) {
        const convertedValue = (customAmount * exchangeRates[currentCurrency]).toFixed(2);
        document.getElementById('selectedValue').innerText = `Selected Amount: ${currentCurrency} ${convertedValue}`;
        selectedBudget = customAmount;
        messageElement.innerText = '';
        const queryString = `?budget=${selectedBudget}&currency=${currentCurrency}`;
        window.location.href = 'build2.html';
    } else {
        messageElement.innerText = 'Invalid or exceeding maximum limit';
    }
}


function changeCurrency(currency) {
    currentCurrency = currency;
    const sliderValue = document.getElementById('budgetSlider').value;
    updateValue(sliderValue);
}
function getSelectedBudget() {
    return selectedBudget;
}

function getCurrentCurrency() {
    return currentCurrency;
}

module.exports = {
    getSelectedBudget,
    getCurrentCurrency,
    exchangeRates
};
