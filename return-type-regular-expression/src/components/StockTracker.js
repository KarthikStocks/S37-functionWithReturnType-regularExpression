import React, { useRef } from "react";

function StockTracker() {
  const stockNameRef = useRef();
  const purchasePriceRef = useRef();
  const currentPriceRef = useRef();
  const quantityRef = useRef();
  const resultRef = useRef();

  const stockNameRegex = /^[a-zA-Z\s]{2,20}$/;

  const validateInput = (input, regex, resultRef) => {
    if (regex.test(input)) {
      resultRef.current.textContent = "Valid";
      resultRef.current.style.color = "green";
    } else {
      resultRef.current.textContent = "Invalid";
      resultRef.current.style.color = "red";
    }
  };

  const calculateStockPerformance = (purchasePrice, currentPrice, quantity) => {
    const totalInvestment = purchasePrice * quantity;
    const currentValue = currentPrice * quantity;
    const profitOrLoss = currentValue - totalInvestment;
    const profitOrLossPercentage = (
      (profitOrLoss / totalInvestment) *
      100
    ).toFixed(2);

    return {
      totalInvestment,
      currentValue,
      profitOrLoss,
      profitOrLossPercentage,
      status: profitOrLoss >= 0 ? "Gain" : "Loss",
    };
  };

  const handleCalculate = () => {
    const stockName = stockNameRef.current.value;
    const purchasePrice = parseFloat(purchasePriceRef.current.value);
    const currentPrice = parseFloat(currentPriceRef.current.value);
    const quantity = parseInt(quantityRef.current.value);

    if (
      !stockName ||
      isNaN(purchasePrice) ||
      isNaN(currentPrice) ||
      isNaN(quantity)
    ) {
      resultRef.current.textContent = "Please fill out all fields correctly!";
      resultRef.current.style.color = "red";
      return;
    }

    const {
      totalInvestment,
      currentValue,
      profitOrLoss,
      profitOrLossPercentage,
      status,
    } = calculateStockPerformance(purchasePrice, currentPrice, quantity);

    resultRef.current.textContent = `Investment: ₹${totalInvestment}, Current Value: ₹${currentValue}, ${status}: ₹${profitOrLoss} (${profitOrLossPercentage}%)`;
    resultRef.current.style.color = status === "Gain" ? "green" : "red";
  };

  return (
    <div className="tracker-form">
      <div>
        <label>Stock Name:</label>
        <input
          type="text"
          ref={stockNameRef}
          placeholder="Enter company name"
          onChange={() =>
            validateInput(stockNameRef.current.value, stockNameRegex, resultRef)
          }
        />
      </div>
      <div>
        <label>Purchase Price:</label>
        <input
          type="number"
          ref={purchasePriceRef}
          placeholder="Enter purchase price"
        />
      </div>
      <div>
        <label>Current Price:</label>
        <input
          type="number"
          ref={currentPriceRef}
          placeholder="Enter current price"
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" ref={quantityRef} placeholder="Enter quantity" />
      </div>
      <button id="btn" type="button" onClick={handleCalculate}>
        Calculate
      </button>
      <p ref={resultRef}></p>
      <footer id="footer">
        © 2024 Stock Market Investor. All rights reserved.
      </footer>
    </div>
  );
}

export default StockTracker;
