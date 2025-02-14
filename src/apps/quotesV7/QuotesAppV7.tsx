import React, { useEffect, useRef, useState } from "react";

export default function PriceTableCanvas() {
  const canvasRef = useRef(null);
  const numCols = 30;
  const numRows = 24;
  const cellWidth = 40;
  const cellHeight = 30;
  const updateInterval = 200; // 5 updates per second

  // Initialize prices
  const [prices, setPrices] = useState(
      Array.from({ length: numRows }, () =>
          Array.from({ length: numCols }, () => (Math.random() * 100).toFixed(2))
      )
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawTable(prices) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * cellWidth;
          const y = row * cellHeight;
          const price = prices[row][col];

          ctx.strokeStyle = "#ccc";
          ctx.strokeRect(x, y, cellWidth, cellHeight); // Draw cell border
          ctx.fillText(price, x + cellWidth / 2, y + cellHeight / 2); // Draw price
        }
      }
    }

    // Mock WebSocket update function
    function updatePrices() {
      setPrices((prevPrices) =>
          prevPrices.map((row) =>
              row.map((price) => (parseFloat(price) + 0.01).toFixed(2))
          )
      );
    }

    // Update prices 5 times per second
    const interval = setInterval(updatePrices, updateInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawTable(prices);

    function drawTable(prices) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * cellWidth;
          const y = row * cellHeight;
          const price = prices[row][col];

          ctx.strokeStyle = "#ccc";
          ctx.strokeRect(x, y, cellWidth, cellHeight); // Draw cell border
          ctx.fillText(price, x + cellWidth / 2, y + cellHeight / 2); // Draw price
        }
      }
    }

    drawTable(prices);
  }, [prices]);

  return (
      <div>
        <h1>
          one canvas for the table
        </h1>
        <div>
          <canvas
              ref={canvasRef}
              width={numCols * cellWidth}
              height={numRows * cellHeight}
              style={{ border: "1px solid black" }}
          />
        </div>
      </div>

  );
}
