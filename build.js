
        let currentCurrency = 'Rs';
        const exchangeRates = {
            Rs: 1,
            $: 0.012,
            eu: 0.011
        };
        i_max = 500000 ;
        e_max = 5500.00 ;
        d_max = 6000.00 ;
        function updateValue(value) {
            const convertedValue = (value * exchangeRates[currentCurrency]).toFixed(2);
            document.getElementById('selectedValue').innerText = `Selected Amount: ${currentCurrency} ${convertedValue}`;
        }

        function applyCustomAmount() {
            const customAmount = document.getElementById('customAmount').value;
            const messageElement = document.getElementById('customAmountMessage');
            
            if (customAmount && customAmount <= i_max||customAmount && customAmount <= d_max||customAmount && customAmount <= e_max) {
                const convertedValue = (customAmount * exchangeRates[currentCurrency]).toFixed(2);
                document.getElementById('selectedValue').innerText = `Selected Amount: ${currentCurrency} ${convertedValue}`;
                messageElement.innerText = '';
            } else if (customAmount > i_max||customAmount > d_max||customAmount > e_max) {
                messageElement.innerText = 'Amount exceeds the maximum limit';
            }
        }

        function changeCurrency(currency) {
            currentCurrency = currency;
            const sliderValue = document.getElementById('budgetSlider').value;
            updateValue(sliderValue);
        }
        function changeCurrency(currency) {
            currentCurrency = currency;
            const sliderValue = document.getElementById('budgetSlider').value;
            const customAmountInput = document.getElementById('customAmount');

            if (currentCurrency === 'Rs') {
                customAmountInput.placeholder = 'Enter amount in Rs';
                customAmountInput.min = 25000;
                customAmountInput.max = 500000;
            } else if (currentCurrency === '$') {
                customAmountInput.placeholder = 'Enter amount in $';
                customAmountInput.min = (25000 * exchangeRates['$']).toFixed(2);
                customAmountInput.max = 6000.00;
            } else if (currentCurrency === 'eu') {
                customAmountInput.placeholder = 'Enter amount in €';
                customAmountInput.min = (25000 * exchangeRates['€']).toFixed(2);
                customAmountInput.max = 5500.00;
            }

            updateValue(sliderValue);
        }