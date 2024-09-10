document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionTableBody = document.querySelector('#transaction-table tbody');
    const noTransactions = document.getElementById('no-transactions');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpensesElement = document.getElementById('total-expenses');
    const netBalanceElement = document.getElementById('net-balance');

    let transactions = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            addTransaction(description, amount);
            updateSummary();
            descriptionInput.value = '';
            amountInput.value = '';
        }
    });

    function addTransaction(description, amount) {
        transactions.push({ description, amount });
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${description}</td>
            <td>${amount.toFixed(2)}</td>
        `;
        transactionTableBody.appendChild(row);

        noTransactions.classList.add('hidden');
    }

    function updateSummary() {
        totalIncome = transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        
        totalExpenses = transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        
        const netBalance = totalIncome + totalExpenses;

        totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
        totalExpensesElement.textContent = `$${(-totalExpenses).toFixed(2)}`;
        netBalanceElement.textContent = `$${netBalance.toFixed(2)}`;

        if (transactions.length === 0) {
            noTransactions.classList.remove('hidden');
        }
    }
});
