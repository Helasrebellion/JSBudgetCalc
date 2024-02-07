// Function to format input value as financial amount with dollar sign and commas
function formatInputValue(input) {
  // Remove non-digit characters
  let value = input.value.replace(/[^\d.-]/g, "");
  // Add commas every three digits
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Add dollar sign
  input.value = "$" + value;
}

// Add event listeners to format input values as financial amounts
document.querySelectorAll('input[type="text"]').forEach((input) => {
  input.addEventListener("input", () => {
    formatInputValue(input);
  });
});

// Function to calculate expenses per paycheck and leftover spending per paycheck
function calculateExpenses() {
  const rent = parseFloat(
    document.getElementById("rent").value.replace(/[^\d.-]/g, "")
  );
  const utilities = parseFloat(
    document.getElementById("utilities").value.replace(/[^\d.-]/g, "")
  );
  const car = parseFloat(
    document.getElementById("car").value.replace(/[^\d.-]/g, "")
  );
  const food = parseFloat(
    document.getElementById("food").value.replace(/[^\d.-]/g, "")
  );
  const health = parseFloat(
    document.getElementById("health").value.replace(/[^\d.-]/g, "")
  );
  const income = parseFloat(
    document.getElementById("income").value.replace(/[^\d.-]/g, "")
  );
  const savings = parseFloat(
    document.getElementById("savings").value.replace(/[^\d.-]/g, "")
  );
  const paychecksPerMonth = parseInt(
    document.getElementById("paychecksPerMonth").value
  );

  const monthlyExpenses = rent + utilities + car + food + health;
  const totalIncome = income;

  const paycheckExpenses = monthlyExpenses / paychecksPerMonth;
  const savingsPerCheck = savings / paychecksPerMonth;
  const leftoverPerCheck = calculateLeftoverPerCheck(
    totalIncome,
    paycheckExpenses,
    savings,
    paychecksPerMonth
  );

  document.getElementById("result").innerHTML = `
    <p>Monthly Income: $${totalIncome.toFixed(2)}</p>
    <p>Monthly Expenses: $${monthlyExpenses.toFixed(2)}</p>
    <p>Paycheck Expenses: $${paycheckExpenses.toFixed(2)}</p>
    <p>Savings Per Paycheck: $${savingsPerCheck.toFixed(2)}</p>
    <p>Leftover Spending Per Paycheck: $${leftoverPerCheck.toFixed(2)}</p>
  `;
}

// Function to calculate leftover spending per paycheck
function calculateLeftoverPerCheck(
  totalIncome,
  paycheckExpenses,
  savings,
  paychecksPerMonth
) {
  return (
    totalIncome / paychecksPerMonth -
    paycheckExpenses -
    savings / paychecksPerMonth
  );
}

// Event listener to calculate expenses when form is submitted
document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    calculateExpenses();
  });

// Prevent form submission on pressing enter key
document
  .getElementById("expenseForm")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      return false;
    }
  });
